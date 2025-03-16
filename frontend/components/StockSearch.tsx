// @ts-nocheck
"use client";

import FetchButton from "./FetchButton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import SuggestionBar from "./SuggestionBar";

export default function StockSearch() {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [data, setData] = useState<Array<any>>([]);
  const flag = useRef<boolean>(false);

  useEffect(() => {
    if (flag.current) {
      flag.current = false;
      return;
    }
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length < 3) {
      if (data.length > 0) setData([]);
      return;
    }

    async function handleSearch() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/stock/search/${debouncedQuery}`,
      );
      if (!response.ok) {
        return;
      }
      const stockData = await response.json();
      setData(stockData);
    }
    handleSearch();
  }, [debouncedQuery]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const ticker = formData.get("search") as string;
    const pattern = /^[A-Za-z0-9\.]+$/;
    if (!pattern.test(ticker)) {
      toast("Uh oh! Something went wrong", {
        description:
          "Please enter a valid alphanumeric characters as ticker symbol",
      });
      return;
    }
    router.push(`/result/${ticker}`);
  }

  function onSelection(symbol: string) {
    flag.current = true;
    setData([]);
    setQuery(symbol);
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <form
        className="mx-2 flex items-center space-x-2 bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg"
        onSubmit={handleSubmit}
      >
        <Command className="w-[60%] rounded-full border-2 border-black dark:border-white focus-within:border-dotted">
          <CommandInput
            placeholder="Search stock ticker..."
            name="search"
            className="w-full bg-transparent border-none focus:outline-none"
            onValueChange={setQuery}
            value={query}
          />
          <CommandList className="mx-2 rounded-lg bg-white dark:bg-gray-900 absolute mt-16">
            {data.length > 0 && (
              <CommandGroup heading="Suggestions">
                {data.map((stock: any) => (
                  <CommandItem
                    key={stock.symbol}
                    value={stock.symbol}
                    onSelect={() => onSelection(stock.symbol)}
                  >
                    <SuggestionBar
                      symbol={stock.symbol}
                      shortname={stock.shortname}
                      exchange={stock.exchange}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
        <FetchButton />
      </form>
    </div>
  );
}

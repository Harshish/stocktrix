// @ts-nocheck
"use client";

import FetchButton from "./FetchButton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

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
  const [data, setData] = useState<Array<unknown>>([]);
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
        className="mx-2 flex items-center relative space-x-2 bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="w-[60%] rounded-full">
          <span className="flex items-center pl-2 rounded-full border-2 border-black dark:border-white focus-within:border-dotted">
            <Search />
            <input
              type="text"
              autoComplete="off"
              placeholder="Search Stock Ticker"
              name="search"
              className="border-0 focus:outline-none focus:border-0 focus:ring-0 flex h-9 w-full bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </span>
          {data.length > 0 && (
            <div className="p-2 max-h-56 max-w-[80%] rounded-lg bg-white dark:bg-gray-800 absolute mt-6 overflow-auto">
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                Suggestions
              </p>
              <hr />
              {data.map((stock: unknown, index) => (
                <SuggestionBar
                  key={`${stock.symbol}-${index}`}
                  symbol={stock.symbol}
                  shortname={stock.shortname}
                  exchange={stock.exchange}
                  onSelect={() => onSelection(stock.symbol)}
                />
              ))}
            </div>
          )}
        </div>
        <FetchButton />
      </form>
    </div>
  );
}

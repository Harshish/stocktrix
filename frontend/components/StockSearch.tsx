"use client";

import { Search } from "lucide-react";
import FetchButton from "./FetchButton";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/store/AppContext";
import Loading from "./Loading";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function StockSearch() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorState, setError] = useState<{ error: boolean; message: string }>({
    error: false,
    message: "",
  });
  const { setSentimentResponse } = useAppContext();

  const onSubmit = useCallback(
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const stockTicker = formData.get("search") as string;
      if (!stockTicker) {
        setError({ error: true, message: "Please enter a stock ticker" });
        return;
      }
      if (errorState.error) setError({ error: false, message: "" });
      setIsLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/stock/sentiment/${stockTicker}`,
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.detail || "Error in fetching data from server");
        }
        setSentimentResponse(data);
        router.push(`/result`);
      } catch (error) {
        setError({ error: true, message: (error as Error).message });
        setIsLoading(false);
      }
    },
    [errorState, isLoading, setSentimentResponse, router],
  );

  if (errorState.error) {
    toast("Uh oh! Something went wrong", {
      description: errorState.message,
    });
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      {!isLoading && (
        <form
          className="mx-2 flex items-center space-x-2 bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg"
          onSubmit={onSubmit}
        >
          <span className="flex items-center pl-2 rounded-full border-2 border-black dark:border-white focus-within:border-dotted">
            <Search />
            <input
              type="text"
              placeholder="Search Stock Ticker"
              name="search"
              className="border-0 focus:outline-none focus:border-0 focus:ring-0 flex h-9 w-full bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </span>
          <FetchButton />
        </form>
      )}
      {isLoading && <Loading />}
    </div>
  );
}

"use client";

import { Search } from "lucide-react";
import FetchButton from "./FetchButton";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/store/AppContext";
import Loading from "./Loading";
import { useState } from "react";

export default function StockSearch() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setSentimentResponse } = useAppContext();
  let isError = false;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const stockTicker = formData.get("search") as string;
    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/stock/sentiment/${stockTicker}`,
      );
      if (!res.ok) {
        throw new Error("Error in fetching data from server");
      }
      const data = await res.json();
      setSentimentResponse(data);
      router.push("/result");
    } catch (error) {
      isError = true;
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isError) {
    console.error("Error in fetching data from server --- TOAST");
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      {!isLoading && (
        <form
          className="mx-2 flex items-center space-x-2 bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg"
          onSubmit={handleSubmit}
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

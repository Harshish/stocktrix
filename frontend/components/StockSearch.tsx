"use client";

import { Search } from "lucide-react";
import FetchButton from "./FetchButton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function StockSearch() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const ticker = formData.get("search") as string;
    if (ticker) {
      router.push(`/result/${ticker}`);
    } else {
      toast("Uh oh! Something went wrong", {
        description: "Please enter a valid ticker symbol",
      });
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center">
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
    </div>
  );
}

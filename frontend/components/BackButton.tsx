"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="cursor-pointer border rounded-full p-2 dark:border-white border-black"
      onClick={() => router.replace("/")}
    >
      <ArrowLeft className="h-4 w-4" />
    </button>
  );
}

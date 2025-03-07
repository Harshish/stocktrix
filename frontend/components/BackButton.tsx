"use client";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <Link
      href="/"
      className="cursor-pointer border rounded-full p-2 dark:border-white border-black"
    >
      <ArrowLeft className="h-4 w-4" />
    </Link>
  );
}

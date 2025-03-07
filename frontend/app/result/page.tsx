"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Info } from "lucide-react";
import { useAppContext } from "@/store/AppContext";

import NewsBar from "@/components/NewsBar";
import AverageSentimentChart from "@/components/AverageSentimentChart";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import Loading from "@/components/Loading";

export default function Result() {
  const { sentimentResponse: data } = useAppContext();
  if (!data) {
    return <Loading />;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BackButton />
          <h1 className="text-2xl font-bold">{data.ticker} Stock Sentiment</h1>
        </CardTitle>
        <CardDescription className="flex items-center space-x-1">
          <Info className="h-4 w-4" />
          <p>
            {process.env.NEXT_PUBLIC_APP_NAME} can make mistakes. Check
            important info.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="text-2xl font-bold">Average Sentiment</h2>
        <AverageSentimentChart
          positive={data.average_sentiment.positive}
          neutral={data.average_sentiment.neutral}
          negative={data.average_sentiment.negative}
        />
        <h2 className="text-2xl font-bold">Latest News</h2>
        <ScrollArea className="mt-2 h-[430px] w-full rounded-md border p-4">
          <NewsBar news={data?.news ?? []} />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

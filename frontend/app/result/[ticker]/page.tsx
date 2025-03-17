import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Info } from "lucide-react";

import NewsBar from "@/components/NewsBar";
import AverageSentimentChart from "@/components/AverageSentimentChart";
import BackButton from "@/components/BackButton";
import { notFound } from "next/navigation";
import ErrorPage from "@/components/ErrorPage";

export default async function Result({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/stock/sentiment/${ticker}`,
      {
        method: "GET",
        headers: {
          "x-api-key": `${process.env.API_KEY}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    if (res.status === 404) {
      return notFound();
    }

    if (res.status === 204) {
      return (
        <ErrorPage
          error="No data! 😕"
          message="Cannot find any news or sentiment data for this stock"
        />
      );
    }

    const data = await res.json();
    return (
      <Card className="mx-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BackButton />
            <h1 className="text-2xl font-bold">
              {data?.ticker.toUpperCase()} Stock Sentiment
            </h1>
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
            positive={data?.average_sentiment.positive || 0}
            neutral={data?.average_sentiment.neutral || 0}
            negative={data?.average_sentiment.negative || 0}
          />
          <h2 className="text-2xl font-bold">Latest News</h2>
          <ScrollArea className="mt-2 h-[430px] w-full rounded-md border p-4">
            <NewsBar news={data?.news ?? []} />
          </ScrollArea>
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <ErrorPage
        error="Oops! 😵‍💫"
        message="Something went wrong. Please try again later"
      />
    );
  }
}

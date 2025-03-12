import { News } from "@/utils/types";
import Link from "next/link";
import NewsSentimentChart from "./NewsSentimentChart";
import { convertToUserTimezone } from "@/utils/helpers";

export default function NewsBar({ news }: { news: Array<News> }) {
  return (
    <>
      {news.map((page: News, index: number) => (
        <article
          key={`news-${index}`}
          className="flex justify-between w-full p-2 my-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Link href={page.link} target="_blank" className="w-full">
            <div className="flex flex-col justify-between w-full p-2">
              {page.title}
              <p className="text-sm text-muted-foreground">
                {convertToUserTimezone(page.published)}
              </p>
            </div>
          </Link>
          <NewsSentimentChart
            key={`sentiment-chart-${index}`}
            positive={page.sentiment.positive}
            neutral={page.sentiment.neutral}
            negative={page.sentiment.negative}
          />
        </article>
      ))}
    </>
  );
}

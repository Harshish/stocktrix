import { News } from "@/utils/types";
import Link from "next/link";
import NewsSentimentChart from "./NewsSentimentChart";

export default function NewsBar({ news }: { news: Array<News> }) {
  return (
    <>
      {news.map((page: News, index: number) => (
        <article
          key={`news-${index}`}
          className="flex justify-between w-full p-2 my-2 border hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Link href={page.link} target="_blank" className="w-[90%]">
            {page.title}
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

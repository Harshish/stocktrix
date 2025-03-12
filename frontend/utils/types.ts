export type News = {
  title: string;
  link: string;
  published: string;
  sentiment: {
    negative: number;
    neutral: number;
    positive: number;
  };
};

export type StockSentimentResponse = {
  news: Array<News>;
  average_sentiment: {
    negative: number;
    neutral: number;
    positive: number;
  };
  ticker: string;
};

import { useState } from "react";

export default function useApiGet(url: string) {
  const [data, setData] = useState<JSON | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  async function fetchData(): Promise<JSON | null> {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        setIsError(true);
      }
      return res.json();
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  fetchData().then((data) => {
    setData(data);
  });

  return [data, isLoading, isError];
}

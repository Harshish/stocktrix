import { useState } from "react";

export default function useApiGet(url: string) {
  const [data, setData] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorState, setError] = useState<{ error: boolean; message: string }>({
    error: false,
    message: "",
  });

  async function fetchData() {
    setIsLoading(true);
    let data = null;
    try {
      const res = await fetch(url);
      data = await res.json();
      if (!res.ok) {
        throw new Error(data?.detail || "Error in fetching data from server");
      }
      setData(data);
    } catch (error) {
      setError({ error: true, message: (error as Error).message });
    } finally {
      setIsLoading(false);
    }
  }

  fetchData();

  return [data, isLoading, errorState];
}

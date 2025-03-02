"use client";

import { createContext, useContext, useState } from "react";

import { StockSentimentResponse } from "@/utils/types";

type AppContextType = {
  sentimentResponse: StockSentimentResponse | null;
  setSentimentResponse: React.Dispatch<
    React.SetStateAction<StockSentimentResponse | null>
  >;
};

const AppContext = createContext<AppContextType>({
  sentimentResponse: null,
  setSentimentResponse: () => {},
});

interface AppContextProviderProps {
  children: React.ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [sentimentResponse, setSentimentResponse] =
    useState<StockSentimentResponse | null>(null);
  const ctx = {
    sentimentResponse,
    setSentimentResponse,
  };
  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
}

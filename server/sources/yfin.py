"""
yfin.py

This module contains functions for getting data from yahoo finance
"""

import requests
import yfinance as yf

STOCK_CHART_API = "https://query1.finance.yahoo.com/v8/finance/chart/"
# f"https://query2.finance.yahoo.com/v8/finance/chart/{ticker}?period1=1699549200&period2=1731319200&interval=1d"


def get_stock_history(symbol, period="1mo"):
    """
    Get the history of a stock
    """
    stock = yf.Ticker(symbol)
    return stock.history(period=period)


def get_matching_stock(search_term: str) -> dict:
    """Get ticker of matching stock with company name or ticker"""
    url = f"https://query1.finance.yahoo.com/v1/finance/search?q={search_term}&recommendCount=5"
    response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
    return response.json()

"""
yfin.py

This module contains functions for getting data from yahoo finance
"""

import yfinance as yf

STOCK_CHART_API = "https://query1.finance.yahoo.com/v8/finance/chart/"
# f"https://query2.finance.yahoo.com/v8/finance/chart/{ticker}?period1=1699549200&period2=1731319200&interval=1d"


def get_stock_history(symbol, period="1mo"):
    """
    Get the history of a stock
    """
    stock = yf.Ticker(symbol)
    return stock.history(period=period)

"""
yfin.py

This module contains functions for getting data from yahoo finance
"""

import yfinance as yf


def get_stock_history(symbol, period="1mo"):
    """
    Get the history of a stock
    """
    stock = yf.Ticker(symbol)
    return stock.history(period=period)

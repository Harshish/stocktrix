"""
yfin_rss.py

This module provides functions for fetching news articles from Yahoo Finance RSS feed.
"""

from typing import List

import feedparser

RSS_URL = "https://feeds.finance.yahoo.com/rss/2.0/headline?s="
# GENERAL = https://feeds.finance.yahoo.com/rss/2.0/headline?s=^DJI


def fetch_yahoo_finance_news(ticker: str) -> List[dict]:
    """
    Fetches news articles for a given ticker from Yahoo Finance RSS feed.
    """
    feed = feedparser.parse(RSS_URL + ticker)
    return feed.entries

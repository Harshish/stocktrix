"""
utils.py

This module contains utility functions for getting data from web.
"""

from typing import List

from ml.summarizer import summarize_content
from ml.utils import clean_text
from scraper.yfinance import scrape_article
from sources.yfin_rss import fetch_yahoo_finance_news


def get_scraped_articles_sentiment(ticker: str) -> List[str]:
    """
    Returns a list of news articles summary scraped from Yahoo Finance website.

    Args:
        ticker (str): The ticker symbol of the stock.

    Returns:
        List[str]: A list of news articles summary.
    """
    articles = []
    for article in fetch_yahoo_finance_news(ticker):
        if "finance.yahoo" not in article.link:
            continue
        content = scrape_article(article.link)
        cleaned_text = clean_text(content)
        summary = summarize_content(cleaned_text)
        articles.append(summary)
    return articles

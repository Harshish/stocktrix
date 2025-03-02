"""
stock.py

This module contains routes for stock related operations.
"""

from fastapi import APIRouter
from ml.kernai_distilbert import classify_sentiment
from ml.utils import calculate_average_sentiment, get_news_sentiments
from sources.yfin import get_stock_history
from sources.yfin_rss import fetch_yahoo_finance_news

router = APIRouter(prefix="/stock", tags=["Stock"])


@router.get("/history/{symbol}")
def get_stock_price(symbol: str):
    """
    Get the current price of a stock
    """
    df = get_stock_history(symbol)
    price = df["Close"].iloc[-1]
    return {"symbol": symbol, "price": price}


@router.get("/sentiment/{symbol}")
def get_stock_sentiment(symbol: str):
    """
    Get the current sentiment of a stock
    """
    articles = fetch_yahoo_finance_news(symbol)
    sentiments = get_news_sentiments(
        [article.summary for article in articles], classify_sentiment
    )
    news_score = []
    for article, sentiment in zip(articles, sentiments):
        news_score.append(
            {"title": article.title, "link": article.link, "sentiment": sentiment}
        )
    average_sentiment = calculate_average_sentiment(sentiments)
    return {
        "news": news_score,
        "average_sentiment": average_sentiment,
        "ticker": symbol,
    }

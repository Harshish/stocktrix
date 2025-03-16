"""
stock.py

This module contains routes for stock related operations.
"""

from auth import verify_api_key
from fastapi import APIRouter, Depends, HTTPException
from ml.kernai_distilbert import classify_sentiment
from ml.utils import calculate_average_sentiment, get_news_sentiments
from sources.yfin import get_matching_stock, get_stock_history
from sources.yfin_rss import fetch_yahoo_finance_news

router = APIRouter(prefix="/stock", tags=["Stock"])


@router.get("/history/{symbol}")
def get_stock_price(
    symbol: str, api_key: str = Depends(verify_api_key)
):  # pylint: disable=unused-argument
    """
    Get the current price of a stock
    """
    df = get_stock_history(symbol)
    price = df["Close"].iloc[-1]
    return {"symbol": symbol, "price": price}


@router.get("/sentiment/{symbol}")
def get_stock_sentiment(
    symbol: str, api_key: str = Depends(verify_api_key)
):  # pylint: disable=unused-argument
    """
    Get the current sentiment of a stock
    """
    articles = fetch_yahoo_finance_news(symbol)
    if not articles:
        raise HTTPException(
            status_code=204, detail="Cannot find news articles for this stock ticker"
        )
    sentiments = get_news_sentiments(
        [article.summary for article in articles], classify_sentiment
    )
    news_score = []
    for article, sentiment in zip(articles, sentiments):
        news_score.append(
            {
                "title": article.title,
                "link": article.link,
                "sentiment": sentiment,
                "published": article.published,
            }
        )
    average_sentiment = calculate_average_sentiment(sentiments)
    return {
        "news": news_score,
        "average_sentiment": average_sentiment,
        "ticker": symbol,
    }


@router.get("/search/{search_term}")
def get_stock(search_term: str):
    """
    Get ticker of matching stock with company name or ticker
    """
    value = get_matching_stock(search_term)
    return value.get("quotes", [])

"""
utils.py

This module contains utility functions for sentiment analysis.
"""

from functools import reduce
from typing import List


def adjust_sentiment_scores(sentiment_scores):
    """
    Adjust sentiment scores to make the sum of all scores equal to 1.
    """
    # Round each score to 2 decimal places
    rounded_scores = {key: round(value, 2) for key, value in sentiment_scores.items()}

    # Calculate the sum of the rounded values
    total_rounded = sum(rounded_scores.values())

    # If the sum is less than 1 (due to rounding errors), adjust the largest score
    if total_rounded < 1.0:
        max_key = max(rounded_scores, key=rounded_scores.get)
        rounded_scores[max_key] += (
            1.0 - total_rounded
        )  # Adjust to make the sum exactly 1

    return rounded_scores


def calculate_average_sentiment(sentiment_scores: List[dict]) -> dict:
    """
    Calculate the average sentiment scores for a list of news articles.
    """
    num_articles = len(sentiment_scores)
    if num_articles == 0:
        return {"negative": 0, "neutral": 0, "positive": 0}

    total_scores = reduce(
        lambda ac, x: {
            "negative": ac["negative"] + x["negative"],
            "neutral": ac["neutral"] + x["neutral"],
            "positive": ac["positive"] + x["positive"],
        },
        sentiment_scores,
        {"negative": 0, "neutral": 0, "positive": 0},
    )

    average_scores = {
        "negative": total_scores["negative"] / num_articles,
        "neutral": total_scores["neutral"] / num_articles,
        "positive": total_scores["positive"] / num_articles,
    }
    return adjust_sentiment_scores(average_scores)


def get_news_sentiments(news_articles, model_func) -> List[dict]:
    """
    Get the sentiment scores for a list of news articles.
    """
    total_scores = {"negative": 0, "neutral": 0, "positive": 0}
    num_articles = len(news_articles)

    if num_articles == 0:
        return total_scores  # Return zero if no articles are provided

    scores = []
    for article in news_articles:
        sentiment = model_func(article)
        scores.append(
            {
                "negative": sentiment[0],
                "neutral": sentiment[1],
                "positive": sentiment[2],
            }
        )
    return scores


def clean_text(text: str) -> str:
    """
    Clean the text by removing terms and privacy policy from the text.

    Args:
        text (str): The text to be cleaned.

    Returns:
        str: The cleaned text.
    """
    content_until_terms = ""
    for line in text.splitlines():
        if "Terms and Privacy Policy" in line:
            break
        content_until_terms += line + "\n"

    return content_until_terms

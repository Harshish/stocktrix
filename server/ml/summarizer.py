"""
summarizer.py

This module contains functions for summarizing news articles.
"""

from transformers import pipeline

# Summarization pipeline
summarizer = pipeline("summarization")


def summarize_content(content: str) -> str:
    """
    Summarize the content using the summarization pipeline.

    Args:
        content (str): The content to be summarized.

    Returns:
        str: The summarized content.
    """
    summary = summarizer(content, max_length=300, min_length=20, do_sample=False)
    return summary[0]["summary_text"]

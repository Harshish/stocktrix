"""
yfinance.py

This module contains functions for scraping news articles from yahoo finance webpage.
"""

from playwright.sync_api import sync_playwright


def scrape_article(url: str) -> str:
    """
    Scrape the main content of an article from a webpage using Playwright.

    Args:
        url (str): The URL of the webpage to scrape.

    Returns:
        str: The main content of the article.
    """
    # Launch Playwright browser
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)  # headless=True for no browser UI

        # Create a new browser context with English locale
        context = browser.new_context()

        # Open a new page in this context
        page = context.new_page()

        # Open the webpage
        page.goto(url)
        # Wait for the cookie consent banner to appear (optional)
        page.wait_for_selector(
            "button.reject-all"
        )  # Wait until the button is available

        # Click the "Reject All" button using the class
        page.click("button.reject-all")  # This targets the button by its class

        # Optionally, wait for the page to update or close the consent banner
        page.wait_for_timeout(
            2000
        )  # Wait for 2 seconds (adjust as needed)e banner to appear (optional)

        # Wait for the page to load and JavaScript to render
        page.wait_for_selector(
            "h1"
        )  # Wait for specific element to appear (you can adjust this)

        page.wait_for_selector(
            "article"
        )  # Common for news articles, adjust accordingly

        # Extract the main content of the article (using a common tag for article content)
        content = page.query_selector("article").inner_text()

        # Close the browser
        browser.close()
        return content

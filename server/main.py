"""
main.py

This module contains the main FastAPI application.
"""

import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import stock

load_dotenv()

APP_DOMAIN_NAME = os.getenv("APP_DOMAIN_NAME")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[APP_DOMAIN_NAME],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stock.router)

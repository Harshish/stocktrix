"""
main.py

This module contains the main FastAPI application.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import stock

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://stocktrix.online"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stock.router)

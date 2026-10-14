# Stocktrix

Stocktrix is full-stack stock sentiment app. It lets users search stock ticker, fetch recent Yahoo Finance headlines, score each headline with transformer model, and show aggregate sentiment in clean dashboard.

## What it does

- Search stocks by ticker or company name
- Fetch recent Yahoo Finance RSS headlines for ticker
- Classify each headline into negative, neutral, and positive sentiment
- Show average sentiment breakdown for stock
- Show per-article sentiment beside news list
- Support light and dark theme

## Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Recharts
- Radix UI

### Backend
- FastAPI
- Hugging Face Transformers
- PyTorch
- yfinance
- feedparser

## How it works

1. User types ticker or company name in frontend search.
2. Frontend calls backend `/stock/search/{search_term}` for suggestions.
3. Result page calls backend `/stock/sentiment/{symbol}`.
4. Backend reads Yahoo Finance RSS feed for ticker.
5. Each article summary goes through `KernAI/stock-news-distilbert` sentiment model.
6. Backend returns per-article scores and average sentiment.
7. Frontend renders charts and news list.

## Repository layout

```text
.
├── frontend/              # Next.js app
│   ├── app/               # App Router pages
│   ├── components/        # UI and feature components
│   ├── lib/               # Shared frontend utilities
│   └── utils/             # Types and helper functions
├── server/                # FastAPI app
│   ├── routes/            # API routes
│   ├── ml/                # Sentiment model and helpers
│   ├── scraper/           # Playwright scraper utilities
│   └── sources/           # Yahoo Finance data sources
├── docker-compose.yml     # Multi-service container setup
└── stock_tickers.csv      # Stock data asset
```

## API

Base path: `/stock`

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| GET | `/search/{search_term}` | Get ticker suggestions from Yahoo Finance search | No |
| GET | `/history/{symbol}` | Get latest close price from yfinance history | Yes |
| GET | `/sentiment/{symbol}` | Get Yahoo Finance news and sentiment summary | Yes |

Example:

```bash
curl http://localhost:9000/stock/search/apple

curl -H "x-api-key: your-api-key" \
  http://localhost:9000/stock/sentiment/AAPL
```

## Local development

### Prerequisites

- Node.js 18+
- npm
- Python 3.10+
- pip

> First backend run may download model weights from Hugging Face. This can take time.

### 1. Backend setup

Create `server/.env`:

```env
APP_DOMAIN_NAME=http://localhost:3000
API_KEY=change-me
```

Install and run:

```bash
cd server
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 9000
```

### 2. Frontend setup

Create `frontend/.env.local`:

```env
SERVER_DOMAIN_NAME=http://localhost:9000
APP_NAME=Stocktrix
API_KEY=change-me
```

Install and run:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Docker

Repo includes Dockerfiles for frontend and backend, plus root `docker-compose.yml`.

Current compose file uses `expose`, not `ports`. Good for internal container networking or reverse proxy setup. For direct local browser access, add port mappings or run services with local dev commands above.

## Environment variables

### Frontend

| Variable | Required | Purpose |
| --- | --- | --- |
| `SERVER_DOMAIN_NAME` | Yes | Backend base URL used by Next.js config |
| `APP_NAME` | Yes | App name shown in UI and metadata |
| `API_KEY` | Yes | Sent with server-side request to protected backend endpoints |

### Backend

| Variable | Required | Purpose |
| --- | --- | --- |
| `APP_DOMAIN_NAME` | Yes | Allowed CORS origin for frontend |
| `API_KEY` | Yes | API key checked in protected endpoints |

## Notes and limitations

- Sentiment is based on article summaries from Yahoo Finance RSS entries, not full article text in current API flow.
- Backend includes scraping and summarization utilities under `server/scraper/` and `server/sources/utils.py`, but those are not wired into public API routes now.
- No dedicated test suite exists yet.
- `server/requirements.txt` includes more packages than core app needs. Trim possible later.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT. See [LICENSE](./LICENSE).

# Contributing to Stocktrix

## Ground rules

- Keep changes focused.
- Prefer small pull requests.
- Discuss large refactors before doing them.
- Never commit secrets, API keys, or real `.env` files.

## Dev setup

### Backend

```bash
cd server
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 9000
```

Create `server/.env`:

```env
APP_DOMAIN_NAME=http://localhost:3000
API_KEY=change-me
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env.local`:

```env
SERVER_DOMAIN_NAME=http://localhost:9000
APP_NAME=Stocktrix
API_KEY=change-me
```

## Branches and commits

- Create branch from `main`
- Use descriptive branch names:
  - `feat/search-ui`
  - `fix/sentiment-error-state`
  - `docs/readme`
- Use clear commit messages

Good examples:

```text
feat: add empty state for sentiment results
fix: handle missing Yahoo Finance articles
docs: improve local setup instructions
```

## Code style

### Frontend

- TypeScript first
- Prefer existing component patterns in `frontend/components/`
- Keep styling in Tailwind classes unless shared abstraction already exists
- Avoid adding new dependencies unless needed

### Backend

- Follow existing FastAPI route layout in `server/routes/`
- Put data-source logic in `server/sources/`
- Put ML-related logic in `server/ml/`
- Keep route handlers thin

## Before opening PR

Run what repo already supports.

### Frontend

```bash
cd frontend
npm run build
```

If lint script added later, run it too.

### Backend

No formal test or lint command wired at root now. At minimum:

- Start backend locally
- Hit affected endpoint manually
- Check import errors and runtime errors

Useful smoke tests:

```bash
curl http://localhost:9000/stock/search/apple
curl -H "x-api-key: change-me" http://localhost:9000/stock/sentiment/AAPL
```

## Pull request checklist

- [ ] Change is scoped and understandable
- [ ] Local setup still works
- [ ] Docs updated if behavior changed
- [ ] No secrets or environment files committed
- [ ] No accidental changes to generated or vendor files

## Files to avoid committing by accident

Watch for noise in PRs from:

- `frontend/node_modules/`
- `frontend/.next/`
- `server/.venv/`
- `.env` files
- notebook checkpoints

## Reporting bugs

Include:

- What you expected
- What happened instead
- Steps to reproduce
- Logs or screenshots if useful
- Environment details: Node, Python, OS

## Feature requests

Open issue first for bigger ideas. Include:

- Problem being solved
- Proposed behavior
- Scope
- Any API or UI impact

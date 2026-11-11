# Portfolio chat API

A small Go service behind the chat bubble on ethanmerrill.com. It holds the OpenAI key server-side and exposes a single rate-limited chat endpoint. No credentials are ever returned to the browser.

## Endpoints

| Method | Path        | Notes |
|--------|-------------|-------|
| GET    | `/health`   | `{"status":"healthy"}` |
| POST   | `/api/chat` | Body `{"message": "..."}` → `{"response": "..."}`. Rate limited per IP and globally; returns `429` with `Retry-After` when exceeded. |

The assistant's knowledge of Ethan's work comes from `internal/work_history.go`.

## Configuration

Copy `.env.example` to `.env`. Variables read by the service:

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `8080` | Listen port |
| `ALLOWED_ORIGINS` | `https://ethanmerrill.com` | Comma-separated CORS origins (localhost:3000/5173 are always added for development) |
| `OPENAI_API_KEY` | — | Required for chat; without it the service starts but chat is disabled |
| `OPENAI_MODEL` | `gpt-4o-mini` | Model used for chat |
| `RATE_LIMIT_PER_MINUTE` | `30` | Per-IP limit (client IP from `CF-Connecting-IP` / `X-Forwarded-For`); `0` disables |
| `RATE_LIMIT_BURST` | `10` | Per-IP burst |
| `RATE_LIMIT_GLOBAL_PER_MINUTE` | `120` | Cap across all clients, bounding OpenAI spend |

## Development

```bash
make setup   # creates .env from the template, tidies modules
make run     # go run main.go
make test    # go test ./...
```

## Deployment

Production runs on Coolify from `docker-compose.yml` (builds `dockerfile`, joins the `coolify` network, routed by Traefik to `portfolio.merrill-api.com`). Set the variables above in the Coolify resource's environment. `.github/workflows/backend-ci.yml` runs vet, tests and `govulncheck` on every backend change; it does not deploy.

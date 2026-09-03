FROM python:3.12-slim

COPY --from=ghcr.io/astral-sh/uv:0.5.11 /uv /usr/local/bin/uv

WORKDIR /app
ENV UV_LINK_MODE=copy \
    UV_PROJECT_ENVIRONMENT=/app/.venv \
    PYTHONUNBUFFERED=1

# Les dependances d'abord : elles changent bien moins souvent que le code, la
# couche reste donc en cache entre deux deploiements.
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev

COPY main.py ./

# La base vit dans un volume, pas dans l'image.
ENV STUDIO_DB=/data/intranet.db
VOLUME ["/data"]

EXPOSE 5504
CMD ["uv", "run", "--frozen", "--no-dev", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5504"]

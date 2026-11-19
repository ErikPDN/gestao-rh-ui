#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

PROJECT=sd-ufg-2026
REGION=us-central1
REGISTRY=$REGION-docker.pkg.dev/$PROJECT/gestao-rh

GATEWAY_HOST=$(gcloud run services describe api-gateway \
  --region "$REGION" --project "$PROJECT" \
  --format='value(status.url)' | sed 's|^https://||')
TAG=$(git rev-parse --short HEAD)

docker build --build-arg VITE_API_URL=/api -t "$REGISTRY/frontend:$TAG" .
docker push "$REGISTRY/frontend:$TAG"

gcloud run deploy frontend --image "$REGISTRY/frontend:$TAG" \
  --project "$PROJECT" --region "$REGION" --allow-unauthenticated --max-instances 2 \
  --set-env-vars "GATEWAY_HOST=$GATEWAY_HOST"

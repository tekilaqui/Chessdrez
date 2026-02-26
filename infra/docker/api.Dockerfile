FROM node:18-alpine AS base

# Setup pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

FROM base AS builder
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm turbo run build --filter=api...

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-workspace.yaml .
# Solo copiamos lo necesario para production
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/packages ./packages
# Install only prod deps
RUN pnpm install --prod --filter=api...

CMD ["node", "apps/api/dist/main"]

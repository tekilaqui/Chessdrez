FROM node:18-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

FROM base AS builder
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm turbo run build --filter=worker...

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-workspace.yaml .
COPY --from=builder /app/apps/worker/dist ./apps/worker/dist
COPY --from=builder /app/apps/worker/package.json ./apps/worker/package.json
COPY --from=builder /app/packages ./packages
RUN pnpm install --prod --filter=worker...

CMD ["node", "apps/worker/dist/index"]

# ---- Build stage ----
FROM oven/bun:1 AS build
WORKDIR /app

# Install dependencies (cached unless manifests change)
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Build the static site
COPY . .
RUN bun run build

# ---- Runtime stage: static files only, no Node runtime ----
FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Dockerfile para o frontend React (Vite)
FROM node:18-slim as build

WORKDIR /app

# Aproveita cache de dependências
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN corepack enable && \
    pnpm install --frozen-lockfile --reporter=ndjson

COPY . .

RUN pnpm build

# Servidor estático para produção
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

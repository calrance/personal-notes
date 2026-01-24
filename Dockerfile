# ---------- Build stage ----------
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && corepack pnpm install --frozen-lockfile

COPY . .
RUN corepack pnpm build

# ---------- Runtime stage ----------
FROM nginx:1.27-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/personal-note-taking/browser /usr/share/nginx/html

EXPOSE 8080
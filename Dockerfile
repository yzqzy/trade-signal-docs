FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG NEXT_PUBLIC_OSS_BASE_URL=""
ARG NEXT_PUBLIC_UTTERANCES_REPO=""

ENV NEXT_PUBLIC_OSS_BASE_URL=${NEXT_PUBLIC_OSS_BASE_URL}
ENV NEXT_PUBLIC_UTTERANCES_REPO=${NEXT_PUBLIC_UTTERANCES_REPO}

RUN pnpm build

FROM nginx:1.27-alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

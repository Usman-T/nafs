FROM oven/bun:1.1-slim

WORKDIR /app

COPY package.json ./
RUN bun install --frozen-lockfile

COPY . .

RUN bunx prisma generate

RUN echo "Waiting for database..." && \
    for i in {1..10}; do \
        bunx prisma migrate dev --name init && break || \
        (echo "Attempt $i failed, retrying..." && sleep 5); \
    done

CMD ["bun", "run", "dev"]
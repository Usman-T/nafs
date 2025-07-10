FROM oven/bun:1.1-slim

WORKDIR /app

COPY package.json ./
RUN bun install --frozen-lockfile

COPY . .

RUN bunx prisma generate

CMD ["bun", "run", "start"] # Keep clean and move logic outside

# ---- Builder stage ----
FROM node:22-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .

# ---- Runner stage ----
FROM node:22-slim AS runner
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 5000
CMD ["node", "index.js"]

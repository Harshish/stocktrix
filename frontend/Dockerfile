# Install dependencies only when needed
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Pass build arguments (must be repeated for each stage where they are needed)
ARG SERVER_DOMAIN_NAME
ARG APP_NAME
ENV SERVER_DOMAIN_NAME=$SERVER_DOMAIN_NAME
ENV APP_NAME=$APP_NAME

# Build the project
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Re-declare the build arguments in this stage
ARG SERVER_DOMAIN_NAME
ARG APP_NAME
ENV SERVER_DOMAIN_NAME=$SERVER_DOMAIN_NAME
ENV APP_NAME=$APP_NAME

RUN npm run build

# Run the application
FROM node:18-alpine AS runner
WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Re-declare the environment variables in the runtime stage
ENV SERVER_DOMAIN_NAME=$SERVER_DOMAIN_NAME
ENV APP_NAME=$APP_NAME

CMD ["npm", "start"]

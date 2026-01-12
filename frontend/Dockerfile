# ---- Build React app ----
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build


# ---- Run with nginx ----
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.railway.conf /etc/nginx/templates/default.conf.template


# Copy nginx configs
COPY nginx.conf /nginx.conf
COPY nginx.railway.conf /nginx.railway.conf

# Create templates directory for Railway
RUN mkdir -p /etc/nginx/templates

ARG ENVIRONMENT=railway

# Select correct config
RUN if [ "$ENVIRONMENT" = "railway" ]; then \
        cp /nginx.railway.conf /etc/nginx/templates/default.conf.template ; \
    else \
        cp /nginx.conf /etc/nginx/conf.d/default.conf ; \
    fi


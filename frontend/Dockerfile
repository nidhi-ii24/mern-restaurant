FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine

# Copy built React app
COPY --from=build /app/build /usr/share/nginx/html

# Copy both nginx configs into container
COPY nginx.conf /nginx.conf
COPY nginx.railway.conf /nginx.railway.conf

# Choose config based on environment
ARG ENVIRONMENT=railway
RUN if [ "$ENVIRONMENT" = "railway" ]; then \
        cp /nginx.railway.conf /etc/nginx/conf.d/default.conf ; \
    else \
        cp /nginx.conf /etc/nginx/conf.d/default.conf ; \
    fi


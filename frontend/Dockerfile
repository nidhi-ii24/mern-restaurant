FROM node:18 AS build
WORKDIR /app

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY . .
RUN npm install
RUN npm run build


FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /nginx.conf
COPY nginx.railway.conf /nginx.railway.conf

# Enable env injection
RUN mkdir -p /etc/nginx/templates

ARG ENVIRONMENT=railway

RUN if [ "$ENVIRONMENT" = "railway" ]; then \
        cp /nginx.railway.conf /etc/nginx/templates/default.conf.template ; \
    else \
        cp /nginx.conf /etc/nginx/conf.d/default.conf ; \
    fi


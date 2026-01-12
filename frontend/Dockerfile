FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /nginx.conf
COPY nginx.railway.conf /nginx.railway.conf

ARG ENVIRONMENT=railway

RUN if [ "$ENVIRONMENT" = "railway" ]; then \
        cp /nginx.railway.conf /etc/nginx/templates/default.conf.template ; \
    else \
        cp /nginx.conf /etc/nginx/conf.d/default.conf ; \
    fi


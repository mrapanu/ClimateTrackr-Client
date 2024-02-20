#!/bin/sh

# Set the API_URL environment variable at runtime
sed -i "s|REACT_APP_API_URL_REPLACE|$API_URL|g" /usr/share/nginx/html/static/js/main*.js

# Start NGINX
nginx -g "daemon off;"

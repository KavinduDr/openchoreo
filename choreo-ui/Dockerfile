# Multi-stage Dockerfile for OpenChoreo Console

# Build Stage
FROM node:20.14.0-alpine AS builder

# Install global dependencies
RUN npm install -g @microsoft/rush@5.153.1 pnpm@10.12.1

# Set working directory
WORKDIR /app

# Copy Rush configuration files
COPY rush.json ./
COPY tsconfig.base.json ./
COPY eslint.config.base.cjs ./
COPY common/ ./common/

# Copy all workspace package.json files first for better Docker layer caching
COPY workspaces/apps/console/package.json ./workspaces/apps/console/package.json

# Copy libs package.json files
COPY workspaces/libs/api-client/package.json ./workspaces/libs/api-client/package.json
COPY workspaces/libs/common-views/package.json ./workspaces/libs/common-views/package.json
COPY workspaces/libs/definitions/package.json ./workspaces/libs/definitions/package.json
COPY workspaces/libs/design-system/package.json ./workspaces/libs/design-system/package.json
COPY workspaces/libs/resource-views/package.json ./workspaces/libs/resource-views/package.json

# Copy plugins package.json files
COPY workspaces/plugins/choreo-context/package.json ./workspaces/plugins/choreo-context/package.json
COPY workspaces/plugins/overview/package.json ./workspaces/plugins/overview/package.json
COPY workspaces/plugins/plugin-core/package.json ./workspaces/plugins/plugin-core/package.json
COPY workspaces/plugins/resource-list/package.json ./workspaces/plugins/resource-list/package.json
COPY workspaces/plugins/top-level-selector/package.json ./workspaces/plugins/top-level-selector/package.json
COPY workspaces/plugins/top-right-menu/package.json ./workspaces/plugins/top-right-menu/package.json

# Install dependencies using Rush
RUN rush purge
RUN rush update --full

# Copy source code
COPY workspaces/ ./workspaces/

# Build all packages
RUN rush build

# Build the console application specifically
WORKDIR /app/workspaces/apps/console
RUN npm run build

# Production Stage
FROM nginx:alpine AS production

# Copy built application
COPY --from=builder /app/workspaces/apps/console/dist /usr/share/nginx/html

# Create nginx configuration
RUN echo 'server {' > /etc/nginx/conf.d/default.conf && \
    echo '    listen 80;' >> /etc/nginx/conf.d/default.conf && \
    echo '    server_name localhost;' >> /etc/nginx/conf.d/default.conf && \
    echo '    ' >> /etc/nginx/conf.d/default.conf && \
    echo '    # Serve static files' >> /etc/nginx/conf.d/default.conf && \
    echo '    location / {' >> /etc/nginx/conf.d/default.conf && \
    echo '        root /usr/share/nginx/html;' >> /etc/nginx/conf.d/default.conf && \
    echo '        index index.html index.htm;' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri $uri/ /index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '        ' >> /etc/nginx/conf.d/default.conf && \
    echo '        # Security headers' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header X-Frame-Options "SAMEORIGIN" always;' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header X-Content-Type-Options "nosniff" always;' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header X-XSS-Protection "1; mode=block" always;' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Referrer-Policy "no-referrer-when-downgrade" always;' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Content-Security-Policy "default-src '\''self'\'' http: https: data: blob: '\''unsafe-inline'\''" always;' >> /etc/nginx/conf.d/default.conf && \
    echo '        ' >> /etc/nginx/conf.d/default.conf && \
    echo '        # Cache static assets' >> /etc/nginx/conf.d/default.conf && \
    echo '        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {' >> /etc/nginx/conf.d/default.conf && \
    echo '            expires 1y;' >> /etc/nginx/conf.d/default.conf && \
    echo '            add_header Cache-Control "public, immutable";' >> /etc/nginx/conf.d/default.conf && \
    echo '        }' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '    ' >> /etc/nginx/conf.d/default.conf && \
    echo '    # Health check endpoint' >> /etc/nginx/conf.d/default.conf && \
    echo '    location /health {' >> /etc/nginx/conf.d/default.conf && \
    echo '        access_log off;' >> /etc/nginx/conf.d/default.conf && \
    echo '        return 200 "healthy\n";' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Content-Type text/plain;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '    ' >> /etc/nginx/conf.d/default.conf && \
    echo '    # Enable gzip compression' >> /etc/nginx/conf.d/default.conf && \
    echo '    gzip on;' >> /etc/nginx/conf.d/default.conf && \
    echo '    gzip_vary on;' >> /etc/nginx/conf.d/default.conf && \
    echo '    gzip_min_length 1024;' >> /etc/nginx/conf.d/default.conf && \
    echo '    gzip_proxied expired no-cache no-store private auth;' >> /etc/nginx/conf.d/default.conf && \
    echo '    gzip_types' >> /etc/nginx/conf.d/default.conf && \
    echo '        text/plain' >> /etc/nginx/conf.d/default.conf && \
    echo '        text/css' >> /etc/nginx/conf.d/default.conf && \
    echo '        text/xml' >> /etc/nginx/conf.d/default.conf && \
    echo '        text/javascript' >> /etc/nginx/conf.d/default.conf && \
    echo '        application/x-javascript' >> /etc/nginx/conf.d/default.conf && \
    echo '        application/xml+rss' >> /etc/nginx/conf.d/default.conf && \
    echo '        application/javascript' >> /etc/nginx/conf.d/default.conf && \
    echo '        application/json' >> /etc/nginx/conf.d/default.conf && \
    echo '        application/xml' >> /etc/nginx/conf.d/default.conf && \
    echo '        application/rss+xml' >> /etc/nginx/conf.d/default.conf && \
    echo '        application/atom+xml' >> /etc/nginx/conf.d/default.conf && \
    echo '        image/svg+xml;' >> /etc/nginx/conf.d/default.conf && \
    echo '}' >> /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

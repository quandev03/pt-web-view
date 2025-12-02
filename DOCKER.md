# Docker Build và Deploy

## Cách sử dụng Docker

### 1. Build Docker image

```bash
docker build -t phongtro-web .
```

### 2. Chạy container

```bash
docker run -d -p 3005:80 --name phongtro-web phongtro-web
```

Ứng dụng sẽ chạy tại: http://localhost:3005

### 3. Sử dụng Docker Compose (Khuyến nghị)

```bash
# Build và chạy
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng
docker-compose down
```

Ứng dụng sẽ chạy tại: http://localhost:3005

### 4. Các lệnh hữu ích

```bash
# Xem logs
docker logs phongtro-web

# Dừng container
docker stop phongtro-web

# Xóa container
docker rm phongtro-web

# Xóa image
docker rmi phongtro-web

# Rebuild (khi có thay đổi code)
docker-compose up -d --build
```

## Cấu trúc Docker

- **Dockerfile**: Multi-stage build (Node.js build + Nginx serve)
- **nginx.conf**: Cấu hình Nginx để serve static files
- **docker-compose.yml**: Định nghĩa service và cấu hình
- **.dockerignore**: Loại trừ các file không cần thiết khi build

## Production Deployment

Để deploy lên production, bạn có thể:

1. Push image lên Docker Hub hoặc registry khác
2. Pull và chạy trên server production
3. Sử dụng reverse proxy (như Traefik, Nginx) nếu cần

## Environment Variables

Nếu cần thay đổi API endpoints, bạn có thể:
- Sử dụng build-time variables trong Dockerfile
- Hoặc runtime variables với nginx config


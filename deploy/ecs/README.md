# 应用部署目录说明（docs）

该目录仅用于 `trade-signal-docs` 应用发布，不包含网关配置。

## 包含文件

- `docker-compose.yml`：应用容器定义（连接 `web` 外部网络）

## 服务器目标目录

- `/opt/apps/trade-signal-docs`

## 发布方式

- 由 `.github/workflows/build.yml` 自动上传 `deploy/ecs/docker-compose.yml`
- CI 在 ECS 执行 `docker compose pull && docker compose up -d`

## 手动运维

```bash
cd /opt/apps/trade-signal-docs
docker compose ps
docker compose logs -f docs
docker compose pull && docker compose up -d
```

完整流程请查看 `deploy/README.md`。

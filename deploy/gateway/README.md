# 网关目录说明（Caddy）

该目录用于统一入口网关，负责：

- 对外监听 `80/443`
- 域名到应用容器的路由转发
- 自动 HTTPS 证书申请与续期

## 包含文件

- `docker-compose.yml`：网关容器定义
- `Caddyfile`：域名路由规则

## 服务器目标目录

- `/opt/gateway`

## 使用方式

```bash
cd /opt/gateway
docker compose pull
docker compose up -d
docker compose ps
```

## 注意事项

- 修改路由后执行 `docker compose up -d` 使配置生效
- 反向代理目标应为容器名（例如 `trade-signal-docs:80`）
- 应用容器必须加入外部网络 `web`
- 当前默认配置为模板：`www.example.com` 提供服务，`example.com` 永久跳转到 `www`

完整流程请查看 `deploy/README.md`。

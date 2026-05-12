# ECS 多应用部署手册（推荐）

本手册采用「双目录解耦」：

- `deploy/ecs`：应用部署模板（由 CI 自动发布）
- `deploy/gateway`：网关配置（Caddy，统一域名与 HTTPS，手动维护）

> 目标：每个应用独立发布，网关统一接入，互不覆盖。

## 1. 目录与服务器约定

仓库目录：

- `deploy/ecs/docker-compose.yml`：当前文档站应用 compose
- `deploy/gateway/docker-compose.yml`：网关 compose
- `deploy/gateway/Caddyfile`：域名路由与 HTTPS

服务器目录：

- `/opt/apps/trade-signal-docs`：文档站应用目录
- `/opt/gateway`：网关目录
- `web`：Docker 外部网络（所有应用与网关都加入）

## 2. 首次部署前准备

### 2.1 ECS 与网络

- 安装 Docker / Docker Compose（要求 `docker compose` 可用）
- 安全组放行：`22`、`80`、`443`
- 域名解析建议（模板）：
  - `@`（`example.com`） -> `A` 到 ECS 公网 IP
  - `www`（`www.example.com`） -> `A` 到 ECS 公网 IP（或 `CNAME` 到 `@`）

### 2.2 GitHub Secrets / Variables

Secrets（必填）：

- `ALIYUN_USERNAME`
- `ALIYUN_PASSWORD`
- `OSS_BASE_URL`
- `ECS_HOST`
- `ECS_USER`
- `ECS_SSH_KEY`
- `ECS_PORT`（默认 `22`）

Secrets（可选）：

- `UTTERANCES_REPO`

Variables（必填）：

- `ALIYUN_REGISTRY`
- `ALIYUN_NAMESPACE`
- `ALIYUN_IMAGE`

## 3. 服务器初始化（仅一次）

在 ECS 执行：

```bash
sudo mkdir -p /opt/apps/trade-signal-docs
sudo mkdir -p /opt/gateway
sudo chown -R "$(whoami)":"$(whoami)" /opt/apps /opt/gateway

docker network create web || true
```

## 4. 初始化网关（仅一次）

1. 按当前仓库默认模板，网关域名为：
   - 主站：`www.example.com`
   - 跳转：`example.com` 301 到 `www.example.com`
2. 上传 `deploy/gateway/*` 到服务器 `/opt/gateway`
3. 在 ECS 执行：

```bash
cd /opt/gateway
docker compose pull
docker compose up -d
docker compose ps
```

验证：

- `docker logs gateway-caddy --tail 100` 无明显报错
- 访问 `http://你的域名` 可自动跳转 HTTPS（首次申请证书可能慢几秒）

## 5. 发布文档应用（CI 自动）

当前仓库 `.github/workflows/build.yml` 已配置：

1. 构建镜像并推送阿里云镜像仓库
2. 构建成功后（`needs: build`）自动部署 ECS
3. 仅上传 `deploy/ecs/docker-compose.yml` 到 `/opt/apps/trade-signal-docs`
4. 在 ECS 执行 `docker compose pull && docker compose up -d`

触发方式：

```bash
git tag v1.0.0
git push origin v1.0.0
```

## 6. 日常运维命令

应用侧：

```bash
cd /opt/apps/trade-signal-docs
docker compose ps
docker compose logs -f docs
docker compose pull && docker compose up -d
```

网关侧：

```bash
cd /opt/gateway
docker compose ps
docker compose logs -f caddy
docker compose up -d
```

## 7. 新增第二个应用（标准流程）

1. 新应用创建目录（例如 `/opt/apps/admin`）
2. 新应用准备独立 compose（加入外部网络 `web`，不占 `80/443`）
3. 新应用建立自己的 CI 发布流程（上传到对应目录并 `up -d`）
4. 修改 `/opt/gateway/Caddyfile`，新增域名反代
5. 在 `/opt/gateway` 执行 `docker compose up -d`

示例路由：

```caddy
www.example.com {
  reverse_proxy trade-signal-docs:80
}

admin.example.com {
  reverse_proxy admin:3000
}
```

## 8. 回滚策略（推荐）

建议用镜像版本号回滚（例如 `1.0.0`）：

1. 修改 `/opt/apps/trade-signal-docs/.env` 中 `IMAGE_TAG`
2. 执行：

```bash
cd /opt/apps/trade-signal-docs
docker compose pull
docker compose up -d
```

> 由于发布由 `v*` Tag 触发，镜像 tag 可追踪，回滚成本低。

## 9. 常见问题排查

### 9.1 域名无法访问

- 检查 DNS：`nslookup www.example.com`（实际使用时替换为你的域名）
- 检查安全组是否放行 `80/443`
- 检查网关状态：`docker ps | grep gateway-caddy`

### 9.2 HTTPS 证书未签发

- 确认域名公网可达，且 80 端口可访问
- 查看网关日志：`docker logs gateway-caddy --tail 200`

### 9.3 应用已更新但页面未变

- 检查容器实际镜像 tag：`docker inspect trade-signal-docs`
- 强制更新：`docker compose pull && docker compose up -d`

## 10. 设计原则（为什么这样做）

- 应用与网关分离：避免应用发布覆盖网关配置
- 单应用独立目录：便于权限管理、审计与故障隔离
- 统一网关：多域名、多应用扩展成本低

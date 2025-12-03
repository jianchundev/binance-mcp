# 代理配置指南

## 🚀 快速开始 - 拷贝即用配置

### 默认SOCKS5代理配置（最常用）

```json
{
  "key": "binance",
  "command": "npx",
  "args": [
    "-y",
    "git+https://github.com/jianchundev/binance-mcp.git"
  ],
  "approvalPolicy": "always",
  "env": {
    "SOCKS_PROXY": "socks5://127.0.0.1:1080"
  }
}
```

**Windows兼容性配置：**
```json
{
  "key": "binance",
  "command": "npx",
  "args": [
    "-y",
    "https://github.com/jianchundev/binance-mcp.git"
  ],
  "approvalPolicy": "always",
  "env": {
    "SOCKS_PROXY": "socks5://127.0.0.1:1080"
  }
}
```

### 常见代理端口配置

**Clash/V2Ray (端口7890):**
```json
{
  "key": "binance",
  "command": "npx",
  "args": ["-y", "git+https://github.com/jianchundev/binance-mcp.git"],
  "approvalPolicy": "always",
  "env": {
    "SOCKS_PROXY": "socks5://127.0.0.1:7890"
  }
}
```

**Windows版本（Clash/V2Ray）：**
```json
{
  "key": "binance",
  "command": "npx",
  "args": ["-y", "https://github.com/jianchundev/binance-mcp.git"],
  "approvalPolicy": "always",
  "env": {
    "SOCKS_PROXY": "socks5://127.0.0.1:7890"
  }
}
```

**Shadowsocks (端口1081):**
```json
{
  "key": "binance",
  "command": "npx",
  "args": ["-y", "git+https://github.com/jianchundev/binance-mcp.git"],
  "approvalPolicy": "always",
  "env": {
    "SOCKS_PROXY": "socks5://127.0.0.1:1081"
  }
}
```

**Windows版本（Shadowsocks）：**
```json
{
  "key": "binance",
  "command": "npx",
  "args": ["-y", "https://github.com/jianchundev/binance-mcp.git"],
  "approvalPolicy": "always",
  "env": {
    "SOCKS_PROXY": "socks5://127.0.0.1:1081"
  }
}
```

## 支持的代理类型

本 Binance MCP 服务现在支持以下代理类型：

1. **SOCKS5 代理**（推荐）
2. **HTTP/HTTPS 代理**

## 配置方法

### 1. SOCKS5 代理配置

设置环境变量：

```bash
# Linux/macOS
export SOCKS_PROXY="socks5://127.0.0.1:1080"
# 或者
export SOCKS5_PROXY="socks5://127.0.0.1:1080"

# Windows
set SOCKS_PROXY=socks5://127.0.0.1:1080
# 或者
set SOCKS5_PROXY=socks5://127.0.0.1:1080
```

### 2. HTTP/HTTPS 代理配置

设置环境变量：

```bash
# Linux/macOS
export HTTP_PROXY="http://127.0.0.1:8080"
export HTTPS_PROXY="https://127.0.0.1:8080"

# Windows
set HTTP_PROXY=http://127.0.0.1:8080
set HTTPS_PROXY=https://127.0.0.1:8080
```

### 3. 带认证的代理

#### SOCKS5 带认证：
```bash
export SOCKS_PROXY="socks5://username:password@127.0.0.1:1080"
```

#### HTTP 带认证：
```bash
export HTTP_PROXY="http://username:password@127.0.0.1:8080"
```

## MCP 配置文件示例

### Cursor IDE 配置

在 `.cursor/mcp.json` 文件中：

```json
{
  "mcpServers": {
    "binance": {
      "command": "npx",
      "args": [
        "-y",
        "@snjyor/binance-mcp@latest"
      ],
      "env": {
        "SOCKS_PROXY": "socks5://127.0.0.1:1080"
      }
    }
  }
}
```

### 通用 MCP 配置

```json
{
  "mcpServers": {
    "binance": {
      "command": "npx",
      "args": [
        "-y",
        "@snjyor/binance-mcp@latest"
      ],
      "env": {
        "SOCKS_PROXY": "socks5://username:password@127.0.0.1:1080"
      }
    }
  }
}
```

## 代理优先级

1. **SOCKS5 代理**（`SOCKS_PROXY` 或 `SOCKS5_PROXY`）- 最高优先级
2. **HTTP/HTTPS 代理**（`HTTP_PROXY` 或 `HTTPS_PROXY`）- 次优先级
3. **直连** - 无代理时

## 常见代理端口

- SOCKS5: 1080, 1081, 7890
- HTTP: 8080, 3128, 8888
- HTTPS: 8443

## 测试代理配置

启动服务后，如果代理配置正确，您应该看到：
- 无错误信息
- MCP 服务正常启动
- 能够正常获取 Binance 数据

## 故障排除

1. **连接超时**：检查代理地址和端口是否正确
2. **认证失败**：验证用户名和密码
3. **SOCKS5 不支持**：确保代理服务器支持 SOCKS5 协议
4. **防火墙阻止**：检查防火墙设置

## 注意事项

- 代理 URL 必须包含协议（socks5://, http://, https://）
- 用户名和密码如果包含特殊字符，需要进行 URL 编码
- 建议使用 SOCKS5 代理，因为它支持 TCP 和 UDP 流量
# Binance Cryptocurrency MCP

[![smithery badge](https://smithery.ai/badge/@snjyor/binance-mcp-data)](https://smithery.ai/server/@snjyor/binance-mcp-data)

<a href="https://glama.ai/mcp/servers/@snjyor/binance-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@snjyor/binance-mcp/badge" alt="Binance Cryptocurrency MCP server" />
</a>

[Model Context Protocol](https://modelcontextprotocol.io) service for accessing Binance cryptocurrency market data.

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🔄 Fork Notice

This is a fork of the original [binance-mcp](https://github.com/snjyor/binance-mcp) project by [snjyor](https://github.com/snjyor).

**Major enhancements in this fork:**
- ✅ Added SOCKS5 proxy support
- ✅ Enhanced proxy configuration options
- ✅ Improved documentation with copy-paste examples
- ✅ Better MCP configuration compatibility

## 🤝 Contributing

This fork maintains the same Apache 2.0 license as the original project. All contributions are welcome!

## Overview

This MCP service allows AI agents (such as Claude, Cursor, Windsurf, etc.) to execute Binance API calls and obtain real-time data from the cryptocurrency market, including prices, candlestick charts, order books, and more.

**Purpose**
You can directly ask AI about the latest cryptocurrency prices, trading volume, price trends, and other information, without having to check the Binance website or use other tools.

**Available Information**

Through this MCP service, you can obtain the following information:

- Current price information - Get real-time prices for specified cryptocurrencies
- Order book data - View buy and sell order depth
- Candlestick chart data - Obtain candlestick data for different time periods
- 24-hour price changes - View price changes within 24 hours
- Trading history - View recent trading records
- Price statistics - Get price statistics for various time windows

## Available Tools

| Tool                       | Description                                    |
| -------------------------- | ----------------------------------------------- |
| `get_price`                | Get current price for specified cryptocurrency  |
| `get_order_book`           | Get order book data                            |
| `get_recent_trades`        | Get list of recent trades                      |
| `get_historical_trades`    | Get historical trade data                      |
| `get_aggregate_trades`     | Get list of aggregate trades                   |
| `get_klines`               | Get K-line/candlestick data                    |
| `get_ui_klines`            | Get UI-optimized K-line data                   |
| `get_avg_price`            | Get current average price                      |
| `get_24hr_ticker`          | Get 24-hour price change statistics            |
| `get_trading_day_ticker`   | Get trading day market information             |
| `get_book_ticker`          | Get order book ticker                          |
| `get_rolling_window_ticker` | Get rolling window price change statistics    |

## Using in Cursor

**Global Installation**

Use npx to run the MCP service directly from GitHub:

```bash
# Method 1: Direct from GitHub (recommended)
npx -y git+https://github.com/jianchundev/binance-mcp.git

# Method 2: Alternative for Windows compatibility
npx -y https://github.com/jianchundev/binance-mcp.git

# Method 3: Clone and run locally (most reliable)
git clone https://github.com/jianchundev/binance-mcp.git
cd binance-mcp
npm install
npm run build
npm start
```

In Cursor IDE:

1. Go to `Cursor Settings` > `MCP`
2. Click `+ Add New MCP Service`
3. Fill in the form:
   - Name: `binance`
   - Type: `command`
   - Command: `npx -y git+https://github.com/jianchundev/binance-mcp.git`
   
   **If the above doesn't work on Windows, use:**
   - Command: `npx -y https://github.com/jianchundev/binance-mcp.git`

**Project Installation**

Add a `.cursor/mcp.json` file to your project:

```json
{
  "mcpServers": {
    "binance": {
      "command": "npx",
      "args": [
        "-y",
        "git+https://github.com/jianchundev/binance-mcp.git"
      ]
    }
  }
}
```

**Windows Alternative:**
```json
{
  "mcpServers": {
    "binance": {
      "command": "npx",
      "args": [
        "-y",
        "https://github.com/jianchundev/binance-mcp.git"
      ]
    }
  }
}
```

**Alternative MCP Configuration**

Some MCP clients use a different configuration format:

```json
{
  "key": "binance",
  "command": "npx",
  "args": [
    "-y",
    "@snjyor/binance-mcp@latest"
  ],
  "approvalPolicy": "always"
}
```

**Configuration Options**

- `key`: Unique identifier for the MCP service
- `command`: Command to run the service
- `args`: Arguments passed to the command
- `approvalPolicy`:
  - `"always"` - Auto-approve all tool calls
  - `"prompt"` - Ask for approval before each tool call
  - `"never"` - Never auto-approve
- `env`: Environment variables (for proxy configuration)

**Usage**

After configuration, the Binance market data tools will be automatically available to Cursor AI agents:

1. The tool will be listed under `Available Tools` in the MCP settings
2. Agents will automatically use it when relevant
3. You can explicitly ask agents to use these tools

## Using in Other MCP-Compatible Environments

### Standard MCP Configuration

```json
{
  "mcpServers": {
    "binance": {
      "command": "npx",
      "args": [
        "-y",
        "@snjyor/binance-mcp@latest"
      ]
    }
  }
}
```

### Alternative Configuration Format

```json
{
  "key": "binance",
  "command": "npx",
  "args": [
    "-y",
    "git+https://github.com/jianchundev/binance-mcp.git"
  ],
  "approvalPolicy": "always"
}
```

### With Proxy Configuration

```json
{
  "key": "binance",
  "command": "npx",
  "args": [
    "-y",
    "@snjyor/binance-mcp@latest"
  ],
  "approvalPolicy": "always",
  "env": {
    "SOCKS_PROXY": "socks5://127.0.0.1:1080"
  }
}
```

### 🚀 Quick Start with SOCKS5 Proxy (Copy & Paste)

For users who need proxy support, use this ready-to-use configuration:

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

**Common SOCKS5 Proxy Ports:**
- `1080` - Default SOCKS5 port
- `7890` - Common alternative (Clash, V2Ray)
- `1081` - Alternative port
- `10808` - Some proxy tools

**To use a different port, simply change the port number:**
```json
"env": {
  "SOCKS_PROXY": "socks5://127.0.0.1:7890"
}
```

## 📦 **Installation from GitHub**

This package is distributed directly from GitHub for simplicity and to avoid npm publishing overhead:

```bash
# Direct run from GitHub
npx -y git+https://github.com/jianchundev/binance-mcp.git

# Or clone and run locally
git clone https://github.com/jianchundev/binance-mcp.git
cd binance-mcp
npm install
npm run build
npm start
```

**Benefits of GitHub distribution:**
- 🚀 No npm account required
- 🔄 Always get the latest version
- 📝 Full source code transparency
- ⚡ Faster updates and fixes

## 🔧 **Troubleshooting**

### Windows npx Issues
If you encounter `'binance-mcp' is not recognized` error on Windows:

1. **Try alternative URL format:**
   ```bash
   npx -y https://github.com/jianchundev/binance-mcp.git
   ```

2. **Use local installation:**
   ```bash
   git clone https://github.com/jianchundev/binance-mcp.git
   cd binance-mcp
   npm install
   npm run build
   ```

3. **Update MCP configuration to use local path:**
   ```json
   {
     "mcpServers": {
       "binance": {
         "command": "node",
         "args": ["C:\\path\\to\\binance-mcp\\dist\\index.js"]
       }
     }
   }
   ```

### Proxy Connection Issues
- Verify your SOCKS5 proxy is running on the specified port
- Check firewall settings
- Try different proxy ports (7890, 1081, 10808)

## Proxy Configuration

This MCP service supports both SOCKS5 and HTTP/HTTPS proxies to help users access Binance API from restricted networks.

### SOCKS5 Proxy (Recommended)

Set environment variable:

```bash
# Linux/macOS
export SOCKS_PROXY="socks5://127.0.0.1:1080"

# Windows
set SOCKS_PROXY=socks5://127.0.0.1:1080
```

### HTTP/HTTPS Proxy

Set environment variable:

```bash
# Linux/macOS
export HTTP_PROXY="http://127.0.0.1:8080"

# Windows
set HTTP_PROXY=http://127.0.0.1:8080
```

### MCP Configuration with Proxy

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

For detailed proxy configuration instructions, see [PROXY_CONFIG.md](PROXY_CONFIG.md).

## Usage Examples

Here are some usage examples:

**Query Bitcoin Price**
```
Please tell me the current price of Bitcoin
```

**View Ethereum's 24-hour Price Movement**
```
How has Ethereum's price changed in the past 24 hours?
```

**Get BNB's K-line Data**
```
Show me the daily K-line data for BNB over the last 5 days
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Local testing
npm run start
```

## Debugging Server

To debug your server, you can use [MCP Inspector](https://github.com/modelcontextprotocol/inspector).

First build the server

```
npm run build
```

Run the following command in terminal:

```
# Start MCP Inspector and server
npx @modelcontextprotocol/inspector node dist/index.js
```

## License

[Apache 2.0](LICENSE) 
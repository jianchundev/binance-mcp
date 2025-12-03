#!/usr/bin/env node

// 完整的MCP工具功能测试
import { spawn } from 'child_process';
import { setTimeout } from 'timers/promises';

console.log('🧪 完整测试 @jianchundev/binance-mcp MCP工具功能...\n');

// 设置SOCKS5代理环境变量
process.env.SOCKS_PROXY = 'socks5://127.0.0.1:1080';

// 测试用例
const testCases = [
    {
        name: 'get_price',
        params: { symbol: 'BTCUSDT' },
        description: '获取BTC价格'
    },
    {
        name: 'get_klines',
        params: { symbol: 'BTCUSDT', interval: '1h', limit: 2 },
        description: '获取BTC 1小时K线数据'
    },
    {
        name: 'get_order_book',
        params: { symbol: 'BTCUSDT', limit: 5 },
        description: '获取BTC订单簿'
    },
    {
        name: 'get_24hr_ticker',
        params: { symbol: 'BTCUSDT' },
        description: '获取BTC 24小时统计数据'
    }
];

// 启动MCP服务
const mcpProcess = spawn('node', ['dist/index.js'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    env: process.env
});

let testResults = [];
let currentTest = 0;

// 发送MCP请求
function sendMCPRequest(toolName, params) {
    const request = {
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'tools/call',
        params: {
            name: toolName,
            arguments: params
        }
    };
    
    return JSON.stringify(request) + '\n';
}

// 处理MCP响应
mcpProcess.stdout.on('data', (data) => {
    const response = data.toString();
    console.log('📨 收到响应:', response.substring(0, 100) + '...');
    
    try {
        const parsed = JSON.parse(response);
        if (parsed.result) {
            testResults.push({
                tool: testCases[currentTest]?.name,
                status: '✅ 成功',
                description: testCases[currentTest]?.description
            });
            currentTest++;
            
            if (currentTest < testCases.length) {
                runNextTest();
            } else {
                finishTests();
            }
        } else if (parsed.error) {
            testResults.push({
                tool: testCases[currentTest]?.name,
                status: '❌ 失败',
                error: parsed.error.message,
                description: testCases[currentTest]?.description
            });
            currentTest++;
            
            if (currentTest < testCases.length) {
                runNextTest();
            } else {
                finishTests();
            }
        }
    } catch (e) {
        console.log('解析响应失败:', e.message);
    }
});

// 运行下一个测试
function runNextTest() {
    if (currentTest < testCases.length) {
        const test = testCases[currentTest];
        console.log(`\n🔧 测试 ${currentTest + 1}/${testCases.length}: ${test.description}`);
        
        const request = sendMCPRequest(test.name, test.params);
        mcpProcess.stdin.write(request);
        
        // 设置超时
        setTimeout(5000).then(() => {
            testResults.push({
                tool: test.name,
                status: '⏰ 超时',
                description: test.description
            });
            currentTest++;
            
            if (currentTest < testCases.length) {
                runNextTest();
            } else {
                finishTests();
            }
        });
    }
}

// 完成测试
function finishTests() {
    mcpProcess.kill('SIGTERM');
    
    console.log('\n📊 测试结果汇总:');
    console.log('=' .repeat(60));
    
    testResults.forEach((result, index) => {
        console.log(`${index + 1}. ${result.description}`);
        console.log(`   工具: ${result.tool}`);
        console.log(`   状态: ${result.status}`);
        if (result.error) {
            console.log(`   错误: ${result.error}`);
        }
        console.log('');
    });
    
    const successCount = testResults.filter(r => r.status.includes('成功')).length;
    const totalCount = testResults.length;
    
    console.log(`🎯 总体结果: ${successCount}/${totalCount} 测试通过`);
    
    if (successCount === totalCount) {
        console.log('🎉 所有测试通过！MCP服务功能正常');
        console.log('✅ 可以安全发布到npm');
    } else {
        console.log('⚠️ 部分测试失败，请检查配置');
    }
    
    console.log('\n📝 用户使用指南:');
    console.log('1. 注册npm账户: https://www.npmjs.com/signup');
    console.log('2. 登录: npm login');
    console.log('3. 发布: npm publish');
    console.log('4. 用户使用: npx @jianchundev/binance-mcp@latest');
    
    process.exit(0);
}

// 错误处理
mcpProcess.stderr.on('data', (data) => {
    console.log('🔍 错误输出:', data.toString());
});

mcpProcess.on('error', (error) => {
    console.error('❌ MCP服务启动失败:', error.message);
    process.exit(1);
});

// 等待服务启动后开始测试
setTimeout(1000).then(() => {
    console.log('🚀 开始测试MCP工具...\n');
    runNextTest();
});
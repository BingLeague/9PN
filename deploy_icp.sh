#!/bin/bash

# ICP 主网部署脚本
# 使用方法: ./deploy_icp.sh

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}开始部署到 ICP 主网...${NC}"

# 检查 dfx 是否安装
if ! command -v dfx &> /dev/null; then
    echo -e "${RED}错误: dfx 未安装${NC}"
    echo "请先安装 dfx: https://internetcomputer.org/docs/current/developer-docs/setup/install/"
    exit 1
fi

# 检查是否在项目根目录
if [ ! -f "dfx.json" ]; then
    echo -e "${RED}错误: 请在项目根目录运行此脚本${NC}"
    exit 1
fi

# 检查是否已登录 ICP
echo -e "${YELLOW}检查 ICP 登录状态...${NC}"
if ! dfx identity whoami &> /dev/null; then
    echo -e "${RED}错误: 请先登录 ICP${NC}"
    echo "运行: dfx identity new <your-identity-name>"
    echo "然后: dfx identity use <your-identity-name>"
    exit 1
fi

# 显示当前身份
CURRENT_IDENTITY=$(dfx identity whoami)
echo -e "${GREEN}当前身份: ${CURRENT_IDENTITY}${NC}"

# 强制清理之前的构建
echo -e "${YELLOW}强制清理之前的构建...${NC}"
dfx stop 2>/dev/null || true
rm -rf .dfx 2>/dev/null || true

# 部署到 ICP 主网
echo -e "${YELLOW}部署到 ICP 主网...${NC}"
dfx deploy --network ic

# 获取 canister ID
CANISTER_ID=$(dfx canister id 9pn_frontend --network ic)
echo -e "${GREEN}部署成功!${NC}"
echo -e "${GREEN}Canister ID: ${CANISTER_ID}${NC}"
echo -e "${GREEN}ICP 主网访问地址: https://${CANISTER_ID}.ic0.app${NC}"

echo -e "${GREEN}部署完成!${NC}" 
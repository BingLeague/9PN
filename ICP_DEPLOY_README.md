# ICP 部署说明

## 前置要求

1. **安装 dfx**
   ```bash
   sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
   ```

2. **创建并配置身份**
   ```bash
   # 创建新身份
   dfx identity new my-identity
   
   # 使用身份
   dfx identity use my-identity
   
   # 查看当前身份
   dfx identity whoami
   ```

## 部署步骤

1. **确保在项目根目录**
   ```bash
   cd /path/to/your/9pn/project
   ```

2. **给部署脚本添加执行权限**
   ```bash
   chmod +x deploy_icp.sh
   ```

3. **运行部署脚本**
   ```bash
   ./deploy_icp.sh
   ```

## 部署后

- 脚本会自动显示 Canister ID 和访问地址
- 访问地址格式：`https://<canister-id>.ic0.app`

## 注意事项

- 确保已正确配置 dfx 身份
- 首次部署可能需要较长时间
- 部署成功后，前端应用将完全运行在 ICP 区块链上

## 故障排除

如果遇到问题：

1. **dfx 未安装**：按照前置要求安装 dfx
2. **身份未配置**：按照前置要求创建和配置身份
3. **部署失败**：检查网络连接和 dfx 配置 
# 菜单功能使用指南

## 功能概述

首页右上角的三条线菜单按钮已经完成优化，具备以下特性：

### ✅ 三条线图标
- 使用CSS自定义的三条线图标
- 图标更加明显和易于识别
- 添加了背景和阴影效果，提升视觉层次

### ✅ 点击交互
- 点击时有缩放动画效果
- 背景色变化提供视觉反馈
- 增加了点击区域，提升用户体验

### ✅ 菜单弹窗
- 默认隐藏，只有点击三条线图标后才显示
- 支持点击遮罩层关闭
- 添加了关闭按钮
- 菜单项点击后自动关闭弹窗并跳转

## 使用方法

### 1. 打开菜单
- 点击首页右上角的三条线图标
- 菜单弹窗会从顶部滑入

### 2. 选择功能
- **邀请列表**：查看邀请的好友和佣金情况
- **解码历史**：查看历史解码记录

### 3. 关闭菜单
- 点击菜单外的遮罩层
- 点击右上角的关闭按钮
- 选择菜单项后自动关闭

## 技术实现

### 菜单按钮样式
```scss
.menu-btn {
  position: absolute;
  top: 40px;
  right: 0;
  padding: 12px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.menu-btn:active {
  transform: scale(0.95);
  background: rgba(255, 255, 255, 1);
}
```

### 三条线图标
```scss
.hamburger {
  width: 24px;
  height: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.line {
  width: 100%;
  height: 3px;
  background: #333;
  border-radius: 2px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
```

### 菜单弹窗
```vue
<uni-popup ref="menuPopup" type="top" :mask-click="true" @maskClick="closeMenu">
  <view class="menu-content">
    <!-- 菜单内容 -->
  </view>
</uni-popup>
```

## 测试方法

### 1. 功能测试
访问 `/pages/test/menu` 页面进行功能测试：
- 测试三条线菜单按钮点击
- 测试菜单弹窗显示/隐藏
- 测试菜单项点击跳转

### 2. 页面跳转测试
- 点击"邀请列表" → 跳转到 `/pages/invite/list`
- 点击"解码历史" → 跳转到 `/pages/history/list`

### 3. 交互测试
- 点击菜单按钮 → 菜单弹窗显示
- 点击遮罩层 → 菜单弹窗关闭
- 点击关闭按钮 → 菜单弹窗关闭
- 点击菜单项 → 菜单关闭并跳转

## 注意事项

1. **uni-popup组件**：确保项目中已安装uni-ui组件库
2. **图标组件**：菜单中使用了uni-icons组件
3. **路由配置**：确保pages.json中已配置相关页面路由
4. **样式兼容**：CSS样式已适配移动端显示

## 后续优化建议

1. 添加菜单打开/关闭的动画效果
2. 增加菜单项的图标和描述
3. 支持菜单项的长按操作
4. 添加菜单使用统计
5. 优化在不同设备上的显示效果 
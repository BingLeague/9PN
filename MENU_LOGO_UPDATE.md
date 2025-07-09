# 菜单Logo更新说明

## 修改内容

### ✅ 已完成的修改

1. **菜单标题替换**
   - 原内容：`<text class="menu-title">功能菜单</text>`
   - 新内容：名秘九宫logo + 文字
   - 文件：`pages/index/index.vue` 和 `pages/test/menu.vue`

2. **新的菜单头部结构**
   ```vue
   <view class="menu-header">
     <view class="menu-logo">
       <image src="/static/logo.png" class="menu-logo-img"></image>
       <text class="menu-logo-text">名秘九宫</text>
     </view>
     <view class="close-btn" @click="closeMenu">
       <text class="close-icon">×</text>
     </view>
   </view>
   ```

### ✅ 样式优化

1. **Logo样式**
   ```scss
   .menu-logo {
     display: flex;
     align-items: center;
     gap: 10px;
   }
   
   .menu-logo-img {
     width: 30px;
     height: 30px;
     border-radius: 6px;
   }
   
   .menu-logo-text {
     font-size: 16px;
     font-weight: bold;
     color: #333;
   }
   ```

2. **布局特点**
   - Logo图片：30px × 30px，圆角6px
   - 文字：16px，粗体，深灰色
   - 间距：Logo和文字之间10px间距
   - 对齐：垂直居中对齐

## 技术实现

### 1. 图片引用
- 使用现有的 `/static/logo.png` 文件
- 图片尺寸：30px × 30px（自动缩放）
- 格式：PNG（支持透明背景）

### 2. 响应式设计
- 使用flexbox布局
- 自适应不同屏幕尺寸
- 保持logo和文字的比例

### 3. 视觉一致性
- 与首页logo保持一致的品牌形象
- 颜色和字体与整体设计协调
- 圆角设计符合现代UI趋势

## 优势

### 1. 品牌强化
- 在菜单中展示品牌logo
- 增强品牌识别度
- 提升专业形象

### 2. 用户体验
- 更直观的菜单标识
- 与首页logo形成呼应
- 保持界面一致性

### 3. 视觉效果
- 比纯文字更吸引眼球
- 增加视觉层次
- 提升整体美观度

## 文件修改

### 主要文件
- `pages/index/index.vue` - 首页菜单
- `pages/test/menu.vue` - 测试页面菜单

### 样式变更
- 移除 `.menu-title` 样式
- 新增 `.menu-logo`、`.menu-logo-img`、`.menu-logo-text` 样式

## 注意事项

1. **图片文件**：确保 `/static/logo.png` 文件存在
2. **图片质量**：建议使用高清logo图片
3. **兼容性**：在不同设备上测试显示效果
4. **性能**：图片文件大小建议控制在合理范围内

## 后续优化建议

1. 添加logo加载动画
2. 支持不同主题的logo切换
3. 优化logo在不同分辨率下的显示
4. 添加logo点击交互效果
5. 考虑添加品牌标语或副标题 
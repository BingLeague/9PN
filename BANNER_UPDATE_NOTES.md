# Banner 图片更新说明

## 修改内容

### ✅ 已完成的修改

1. **宣传标语轮播模块**
   - 原内容：三个独立的文字卡片
   - 新内容：单张图片横幅
   - 图片路径：`/static/banners/slogan-banner.png`

2. **价值主张模块**
   - 原内容：两行文字内容
   - 新内容：单张图片横幅
   - 图片路径：`/static/banners/value-banner.png`

### ✅ 样式优化

1. **图片样式**
   - 宽度：100% 自适应
   - 圆角：12px
   - 阴影：0 4px 15px rgba(0,0,0,0.1)
   - 显示模式：widthFix (保持宽高比)

2. **布局调整**
   - 移除了原有的卡片样式
   - 简化了HTML结构
   - 保持了原有的间距和边距

## 需要绘制的图片

### 1. slogan-banner.png
**尺寸**: 750px × 300px
**内容**: 三条宣传标语
- 🌟 "姓名构成你专属的'气场'"
- 🎯 "命里跟领导合拍吗？"
- 🔮 "悄悄查一下，他是不是我的贵人"

**设计建议**:
- 背景：紫色到蓝色渐变
- 风格：现代简约，符合命理测算特点
- 装饰：可添加九宫格、星象等元素

### 2. value-banner.png
**尺寸**: 750px × 200px
**内容**: 价值主张
- 主标题："姓名学不是宿命论"
- 副标题："任何人都可以根据自己的特质，来优化自己的人生"

**设计建议**:
- 背景：白色或浅色
- 风格：正式、权威
- 装饰：几何图形或线条

## 文件结构

```
static/
└── banners/
    ├── slogan-banner.png    # 宣传标语横幅 (750×300)
    ├── value-banner.png     # 价值主张横幅 (750×200)
    ├── README.md           # 详细设计说明
    └── placeholder.txt     # 占位说明
```

## 技术实现

### 代码修改
```vue
<!-- 宣传标语轮播 -->
<view class="slogan-section">
  <image src="/static/banners/slogan-banner.png" class="slogan-image" mode="widthFix"></image>
</view>

<!-- 价值主张 -->
<view class="value-proposition">
  <image src="/static/banners/value-banner.png" class="value-image" mode="widthFix"></image>
</view>
```

### 样式定义
```scss
.slogan-image {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.value-image {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
```

## 优势

### 1. 视觉效果更好
- 统一的视觉风格
- 更丰富的设计元素
- 更好的品牌展示

### 2. 维护更简单
- 只需要替换图片文件
- 无需修改代码
- 便于A/B测试

### 3. 性能优化
- 减少DOM元素
- 简化CSS样式
- 提升渲染性能

## 注意事项

1. **图片尺寸**：必须严格按照指定尺寸设计
2. **文件格式**：使用PNG格式，支持透明背景
3. **文件大小**：建议单个文件不超过200KB
4. **响应式**：确保在不同屏幕尺寸下都能正常显示
5. **加载优化**：考虑图片压缩和CDN加速

## 后续优化建议

1. 添加图片加载动画
2. 实现图片懒加载
3. 支持不同主题的图片切换
4. 添加图片点击交互效果
5. 优化图片加载性能 
<template>
  <view class="container">
    <!-- 顶部区域 -->
    <view class="header">
      <view class="menu-btn" @click="toggleMenu">
        <view class="hamburger">
          <view class="line"></view>
          <view class="line"></view>
          <view class="line"></view>
        </view>
      </view>
      <image src="/static/logo.png" class="logo"></image>
      <text class="title">名秘九宫</text>
      <text class="subtitle">科学姓名解码专家</text>
    </view>

    <!-- 广告横幅 -->
    <view class="banner-section">
      <view class="banner-card">
        <view class="banner-content">
          <text class="banner-title">找到适合你的另一半</text>
          <text class="banner-desc">姓名学揭示缘分密码</text>
        </view>
        <view class="banner-icon">💕</view>
      </view>
    </view>

    <!-- 核心功能卡片 -->
    <view class="card-container">
      <view class="card" @click="navTo('/pages/decrypt/single')">
        <view class="card-bg single-bg"></view>
        <image src="/static/icons/decrypt.png" class="card-icon"></image>
        <text class="card-title">姓名解码</text>
        <text class="card-desc">解析姓名中的能量密码</text>
      </view>
      
      <view class="card" @click="navTo('/pages/decrypt/double')">
        <view class="card-bg double-bg"></view>
        <image src="/static/icons/relationship.png" class="card-icon"></image>
        <text class="card-title">关系解析</text>
        <text class="card-desc">揭秘人际互动奥秘</text>
      </view>
    </view>

    <!-- 宣传标语轮播 -->
    <view class="slogan-section">
      <image src="/static/banners/slogan-banner.png" class="slogan-image" mode="widthFix"></image>
    </view>

    <!-- 明星案例展示 -->
    <view class="celebrity-section">
      <text class="section-title">明星解析案例</text>
      <view class="celebrity-list">
        <view class="celebrity-item" @click="viewCelebrity('王力宏')">
          <image src="/static/celebrity/wanglihong.jpg" class="celebrity-avatar"></image>
          <text class="celebrity-name">王力宏</text>
          <text class="celebrity-tag">天生艺术家</text>
        </view>
        <view class="celebrity-item" @click="viewCelebrity('杨幂')">
          <image src="/static/celebrity/yangmi.jpg" class="celebrity-avatar"></image>
          <text class="celebrity-name">杨幂</text>
          <text class="celebrity-tag">事业心强</text>
        </view>
        <view class="celebrity-item" @click="viewCelebrity('周杰伦')">
          <image src="/static/celebrity/zhoujielun.jpg" class="celebrity-avatar"></image>
          <text class="celebrity-name">周杰伦</text>
          <text class="celebrity-tag">音乐天才</text>
        </view>
      </view>
    </view>

    <!-- 价值主张 -->
    <view class="value-proposition">
      <image src="/static/banners/value-banner.png" class="value-image" mode="widthFix"></image>
    </view>

    <!-- 底部分享按钮 -->
    <view class="footer">
      <button class="share-btn" @click="handleShare">
        <text>分享给好友</text>
      </button>
    </view>

    <!-- 菜单遮罩层 -->
    <view class="menu-mask" v-if="showMenu" @click="closeMenu"></view>

    <!-- 菜单弹窗 -->
    <view class="menu-popup" v-if="showMenu">
      <view class="menu-content">
        <view class="menu-header">
          <view class="menu-logo">
            <image src="/static/logo.png" class="menu-logo-img"></image>
            <text class="menu-logo-text">名秘九宫</text>
          </view>
          <view class="close-btn" @click="closeMenu">
            <text class="close-icon">×</text>
          </view>
        </view>
        <view class="menu-item" @click="navTo('/pages/invite/list')">
          <view class="menu-icon">👥</view>
          <text>邀请列表</text>
          <view class="arrow">></view>
        </view>
        <view class="menu-item" @click="navTo('/pages/history/list')">
          <view class="menu-icon">📅</view>
          <text>解码历史</text>
          <view class="arrow">></view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.container {
  padding: 20px;
  background: linear-gradient(135deg, #F5F5DC 0%, #E8E4C9 100%);
  min-height: 100vh;
}

.header {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  padding-top: 40px;
}

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

.hamburger {
  width: 24px;
  height: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.line {
  width: 100%;
  height: 3px;
  background: #333;
  border-radius: 2px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}

.title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
}

.subtitle {
  font-size: 14px;
  color: #666;
}

.banner-section {
  margin-bottom: 25px;
}

.banner-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.banner-content {
  flex: 1;
}

.banner-title {
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
  display: block;
}

.banner-desc {
  font-size: 14px;
  color: rgba(255,255,255,0.8);
}

.banner-icon {
  font-size: 40px;
  margin-left: 15px;
}

.card-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  gap: 15px;
}

.card {
  flex: 1;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.card:active {
  transform: scale(0.98);
}

.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
}

.single-bg {
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.double-bg {
  background: linear-gradient(90deg, #f093fb, #f5576c);
}

.card-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
  z-index: 1;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  z-index: 1;
}

.card-desc {
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-bottom: 10px;
  z-index: 1;
}

.card-price {
  font-size: 14px;
  font-weight: bold;
  color: #4a90e2;
  z-index: 1;
}

.slogan-section {
  margin-bottom: 25px;
}

.slogan-image {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.celebrity-section {
  margin-bottom: 25px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  display: block;
}

.celebrity-list {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 10px;
  justify-content: center;
  flex-wrap: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.celebrity-item {
  min-width: 80px;
  max-width: 100px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FEFEF8;
  border-radius: 12px;
  padding: 15px 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.celebrity-item:active {
  transform: scale(0.95);
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
}

.celebrity-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 8px;
}

.celebrity-name {
  font-size: 12px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.celebrity-tag {
  font-size: 10px;
  color: #666;
  text-align: center;
}

/* 响应式设计 - 确保在不同屏幕尺寸下都能居中显示 */
@media screen and (max-width: 375px) {
  .celebrity-list {
    gap: 10px;
    padding: 0 10px 10px 10px;
  }
  
  .celebrity-item {
    min-width: 70px;
    max-width: 80px;
    padding: 12px 8px;
  }
  
  .celebrity-avatar {
    width: 45px;
    height: 45px;
  }
  
  .celebrity-name {
    font-size: 11px;
  }
  
  .celebrity-tag {
    font-size: 9px;
  }
}

@media screen and (min-width: 414px) {
  .celebrity-list {
    gap: 20px;
    padding: 0 20px 10px 20px;
  }
  
  .celebrity-item {
    min-width: 90px;
    max-width: 110px;
    padding: 18px 12px;
  }
  
  .celebrity-avatar {
    width: 55px;
    height: 55px;
  }
  
  .celebrity-name {
    font-size: 13px;
  }
  
  .celebrity-tag {
    font-size: 11px;
  }
}

.value-proposition {
  margin-bottom: 45px;
}

.value-image {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.footer {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
}

.share-btn {
  background: linear-gradient(135deg, #4a90e2, #357abd);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

.share-btn text {
  margin-left: 8px;
}

/* 菜单相关样式 */
.menu-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.menu-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

.menu-content {
  background: #FEFEF8;
  border-radius: 0 0 12px 12px;
  margin: 0 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  overflow: hidden;
}

.menu-header {
  background: #F5F5DC;
  padding: 15px 20px;
  border-bottom: 1px solid #E8E4C9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

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

.close-btn {
  padding: 5px;
  cursor: pointer;
}

.close-icon {
  font-size: 24px;
  color: #999;
  line-height: 1;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f5f5f5;
  transition: background-color 0.3s ease;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:active {
  background-color: #E8E4C9;
}

.menu-icon {
  font-size: 20px;
  margin-right: 15px;
}

.menu-item text {
  flex: 1;
  font-size: 16px;
  color: #333;
}

.arrow {
  font-size: 16px;
  color: #ccc;
  font-weight: bold;
}
</style>

<script>
export default {
  data() {
    return {
      showMenu: false
    }
  },
  onLoad() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      // 检查本地存储的用户信息
      const userInfo = uni.getStorageSync('userInfo');
      if(!userInfo) {
        // 如果没有用户信息，可以选择是否显示登录提示
        // 暂时注释掉，避免影响用户体验
        /*
        uni.showModal({
          title: '登录提示',
          content: '请先登录微信或支付宝账号',
          success: (res) => {
            if(res.confirm) {
              uni.login({
                provider: 'weixin', // 或'alipay'
                success: (loginRes) => {
                  // 登录成功处理
                }
              });
            }
          }
        });
        */
      }
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    closeMenu() {
      this.showMenu = false;
    },
    navTo(url) {
      this.closeMenu();
      uni.navigateTo({
        url: url
      });
    },
    handleShare() {
      // 生成邀请链接
      const inviteCode = this.generateInviteCode();
      const shareUrl = `https://your-domain.com/invite?code=${inviteCode}`;
      
      uni.share({
        provider: 'weixin',
        scene: 'WXSceneSession',
        type: 0,
        href: shareUrl,
        title: '名秘九宫 - 科学姓名解码专家',
        summary: '解析姓名中的能量密码，助你更好了解自己和他人',
        imageUrl: '/static/share-image.png',
        success: function (res) {
          console.log('分享成功');
        },
        fail: function (err) {
          console.log('分享失败', err);
        }
      });
    },
    generateInviteCode() {
      // 生成邀请码逻辑
      return 'INV' + Date.now().toString(36).toUpperCase();
    },
    viewCelebrity(name) {
      uni.showToast({
        title: `查看${name}的解析`,
        icon: 'none'
      });
      // 这里可以跳转到明星详情页
    }
  }
}
</script>

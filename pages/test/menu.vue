<template>
  <view class="container">
    <text class="title">菜单功能测试</text>
    
    <view class="test-section">
      <text class="section-title">菜单按钮测试</text>
      <view class="menu-btn-test" @click="testMenuButton">
        <view class="hamburger">
          <view class="line"></view>
          <view class="line"></view>
          <view class="line"></view>
        </view>
        <text class="test-label">点击测试三条线菜单</text>
      </view>
    </view>
    
    <view class="test-buttons">
      <button @click="testInviteList" class="test-btn">测试邀请列表</button>
      <button @click="testHistoryList" class="test-btn">测试解码历史</button>
      <button @click="testMenuPopup" class="test-btn">测试菜单弹窗</button>
    </view>
    
    <view class="result">
      <text>测试结果: {{testResult}}</text>
    </view>
    
    <!-- 测试菜单遮罩层 -->
    <view class="menu-mask" v-if="showTestMenu" @click="closeTestMenu"></view>
    
    <!-- 测试菜单弹窗 -->
    <view class="test-menu-popup" v-if="showTestMenu">
      <view class="test-menu-content">
        <view class="menu-header">
          <view class="menu-logo">
            <image src="/static/logo.png" class="menu-logo-img"></image>
            <text class="menu-logo-text">名秘九宫</text>
          </view>
          <view class="close-btn" @click="closeTestMenu">
            <text class="close-icon">×</text>
          </view>
        </view>
        <view class="menu-item" @click="testMenuItem('邀请列表')">
          <view class="menu-icon">👥</view>
          <text>邀请列表</text>
          <view class="arrow">></view>
        </view>
        <view class="menu-item" @click="testMenuItem('解码历史')">
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
  text-align: center;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
  display: block;
}

.test-section {
  margin-bottom: 30px;
  padding: 20px;
  background: #F5F5DC;
  border-radius: 12px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  display: block;
}

.menu-btn-test {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 15px;
  background: #FEFEF8;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

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
}

.test-label {
  font-size: 14px;
  color: #666;
}

.test-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.test-btn {
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 15px;
  font-size: 16px;
}

.result {
  background: #F5F5DC;
  padding: 20px;
  border-radius: 8px;
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

.test-menu-popup {
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

.test-menu-content {
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
  background-color: #f8f9fa;
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
      testResult: '等待测试...',
      showTestMenu: false
    }
  },
  methods: {
    testMenuButton() {
      this.testResult = '三条线菜单按钮点击成功！';
      this.showTestMenu = true;
    },
    testInviteList() {
      this.testResult = '正在跳转到邀请列表...';
      uni.navigateTo({
        url: '/pages/invite/list',
        success: () => {
          this.testResult = '跳转成功';
        },
        fail: (err) => {
          this.testResult = '跳转失败: ' + JSON.stringify(err);
        }
      });
    },
    testHistoryList() {
      this.testResult = '正在跳转到解码历史...';
      uni.navigateTo({
        url: '/pages/history/list',
        success: () => {
          this.testResult = '跳转成功';
        },
        fail: (err) => {
          this.testResult = '跳转失败: ' + JSON.stringify(err);
        }
      });
    },
    testMenuPopup() {
      this.testResult = '打开测试菜单弹窗...';
      this.showTestMenu = true;
    },
    closeTestMenu() {
      this.showTestMenu = false;
      this.testResult = '菜单弹窗已关闭';
    },
    testMenuItem(name) {
      this.testResult = `点击了菜单项: ${name}`;
      this.showTestMenu = false;
    }
  }
}
</script> 
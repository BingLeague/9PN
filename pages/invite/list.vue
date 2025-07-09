<template>
  <view class="container">
    <!-- 佣金统计卡片 -->
    <view class="commission-card">
      <view class="commission-item">
        <text class="commission-label">总佣金</text>
        <text class="commission-value">¥{{totalCommission}}</text>
      </view>
      <view class="commission-item">
        <text class="commission-label">可提现</text>
        <text class="commission-value">¥{{availableCommission}}</text>
      </view>
      <view class="commission-item">
        <text class="commission-label">已提现</text>
        <text class="commission-value">¥{{withdrawnCommission}}</text>
      </view>
    </view>

    <!-- 邀请列表 -->
    <view class="invite-list">
      <view class="list-header">
        <text class="header-title">邀请记录</text>
        <text class="header-count">共{{inviteList.length}}人</text>
      </view>
      
      <view class="invite-item" v-for="item in inviteList" :key="item.id">
        <view class="user-info">
          <text class="user-id">用户ID: {{item.userId}}</text>
          <text class="invite-date">{{item.inviteDate}}</text>
        </view>
        <view class="commission-info">
          <text class="amount">消费: ¥{{item.amount}}</text>
          <text class="commission">佣金: ¥{{item.commission}}</text>
        </view>
        <view class="status-tag" :class="item.status">
          <text>{{getStatusText(item.status)}}</text>
        </view>
      </view>
    </view>

    <!-- 提现按钮 -->
    <view class="withdraw-section">
      <button 
        class="withdraw-btn" 
        @click="handleWithdraw" 
        :disabled="availableCommission < 20"
        :class="{ disabled: availableCommission < 20 }"
      >
        <text>申请提现</text>
        <text class="withdraw-note">最低提现金额 ¥20</text>
      </button>
    </view>

    <!-- 邀请码展示 -->
    <view class="invite-code-section">
      <text class="code-title">我的邀请码</text>
      <view class="code-display">
        <text class="invite-code">{{inviteCode}}</text>
        <button class="copy-btn" @click="copyInviteCode">复制</button>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.container {
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
}

.commission-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.commission-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.commission-label {
  font-size: 12px;
  color: rgba(255,255,255,0.8);
  margin-bottom: 5px;
}

.commission-value {
  font-size: 18px;
  font-weight: bold;
  color: white;
}

.invite-list {
  background: white;
  border-radius: 12px;
  margin-bottom: 20px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.header-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.header-count {
  font-size: 12px;
  color: #666;
}

.invite-item {
  padding: 15px 20px;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.invite-item:last-child {
  border-bottom: none;
}

.user-info {
  flex: 1;
}

.user-id {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
  display: block;
}

.invite-date {
  font-size: 12px;
  color: #999;
}

.commission-info {
  text-align: right;
  margin-right: 15px;
}

.amount {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
  display: block;
}

.commission {
  font-size: 14px;
  color: #4a90e2;
  font-weight: bold;
}

.status-tag {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-tag.pending {
  background: #fff3cd;
  color: #856404;
}

.status-tag.completed {
  background: #d4edda;
  color: #155724;
}

.status-tag.failed {
  background: #f8d7da;
  color: #721c24;
}

.withdraw-section {
  margin-bottom: 20px;
}

.withdraw-btn {
  width: 100%;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 15px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.withdraw-btn.disabled {
  background: #ccc;
  color: #999;
}

.withdraw-note {
  font-size: 12px;
  margin-top: 5px;
  opacity: 0.8;
}

.invite-code-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
}

.code-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  display: block;
}

.code-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
}

.invite-code {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  font-family: monospace;
}

.copy-btn {
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
}
</style>

<script>
export default {
  data() {
    return {
      totalCommission: 0,
      availableCommission: 0,
      withdrawnCommission: 0,
      inviteList: [],
      inviteCode: ''
    }
  },
  onLoad() {
    this.loadInviteData();
    this.generateInviteCode();
  },
  methods: {
    loadInviteData() {
      // 模拟数据，实际应该从API获取
      this.totalCommission = 156.80;
      this.availableCommission = 89.50;
      this.withdrawnCommission = 67.30;
      
      this.inviteList = [
        {
          id: 1,
          userId: 'U202312001',
          inviteDate: '2023-12-15',
          amount: 39.9,
          commission: 3.99,
          status: 'completed'
        },
        {
          id: 2,
          userId: 'U202312002',
          inviteDate: '2023-12-14',
          amount: 19.9,
          commission: 1.99,
          status: 'completed'
        },
        {
          id: 3,
          userId: 'U202312003',
          inviteDate: '2023-12-13',
          amount: 9.9,
          commission: 0.99,
          status: 'pending'
        }
      ];
    },
    generateInviteCode() {
      // 生成邀请码
      this.inviteCode = 'INV' + Date.now().toString(36).toUpperCase();
    },
    getStatusText(status) {
      const statusMap = {
        pending: '待结算',
        completed: '已结算',
        failed: '失败'
      };
      return statusMap[status] || '未知';
    },
    handleWithdraw() {
      if (this.availableCommission < 20) {
        uni.showToast({
          title: '提现金额不足20元',
          icon: 'none'
        });
        return;
      }
      
      uni.showModal({
        title: '提现申请',
        content: `确认提现 ¥${this.availableCommission} 到您的账户？`,
        success: (res) => {
          if (res.confirm) {
            this.processWithdraw();
          }
        }
      });
    },
    processWithdraw() {
      uni.showLoading({
        title: '处理中...'
      });
      
      // 模拟API调用
      setTimeout(() => {
        uni.hideLoading();
        uni.showToast({
          title: '提现申请已提交',
          icon: 'success'
        });
        
        // 更新数据
        this.withdrawnCommission += this.availableCommission;
        this.availableCommission = 0;
      }, 2000);
    },
    copyInviteCode() {
      uni.setClipboardData({
        data: this.inviteCode,
        success: () => {
          uni.showToast({
            title: '邀请码已复制',
            icon: 'success'
          });
        }
      });
    }
  }
}
</script> 
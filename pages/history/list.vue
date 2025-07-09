<template>
  <view class="container">
    <!-- 搜索栏 -->
    <view class="search-section">
      <view class="search-input">
        <uni-icons type="search" size="16" color="#999"></uni-icons>
        <input 
          type="text" 
          placeholder="搜索姓名或日期" 
          v-model="searchKeyword"
          @input="handleSearch"
        />
      </view>
    </view>

    <!-- 筛选标签 -->
    <view class="filter-section">
      <view 
        class="filter-tag" 
        :class="{ active: currentFilter === 'all' }"
        @click="setFilter('all')"
      >
        <text>全部</text>
      </view>
      <view 
        class="filter-tag" 
        :class="{ active: currentFilter === 'single' }"
        @click="setFilter('single')"
      >
        <text>单人解码</text>
      </view>
      <view 
        class="filter-tag" 
        :class="{ active: currentFilter === 'double' }"
        @click="setFilter('double')"
      >
        <text>关系解析</text>
      </view>
    </view>

    <!-- 历史记录列表 -->
    <view class="history-list">
      <view 
        class="history-item" 
        v-for="item in filteredHistory" 
        :key="item.id" 
        @click="viewResult(item)"
      >
        <view class="item-header">
          <view class="name-info">
            <text class="name">{{item.name}}</text>
            <text class="type-tag" :class="item.type">{{getTypeText(item.type)}}</text>
          </view>
          <text class="date">{{formatDate(item.date)}}</text>
        </view>
        
        <view class="item-content">
          <text class="summary">{{item.summary}}</text>
        </view>
        
        <view class="item-footer">
          <view class="price-info">
            <text class="price">¥{{item.price}}</text>
            <text class="status" :class="item.status">{{getStatusText(item.status)}}</text>
          </view>
          <view class="action-buttons">
            <button class="action-btn view-btn" @click.stop="viewResult(item)">
              <text>查看</text>
            </button>
            <button class="action-btn share-btn" @click.stop="shareResult(item)">
              <text>分享</text>
            </button>
          </view>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="filteredHistory.length === 0">
      <image src="/static/empty-icon.png" class="empty-icon"></image>
      <text class="empty-text">暂无解码记录</text>
      <text class="empty-desc">开始您的第一次姓名解码吧</text>
    </view>
  </view>
</template>

<style lang="scss">
.container {
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
}

.search-section {
  margin-bottom: 20px;
}

.search-input {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 12px 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.search-input input {
  flex: 1;
  margin-left: 10px;
  font-size: 14px;
  color: #333;
}

.filter-section {
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
}

.filter-tag {
  padding: 8px 16px;
  background: white;
  border-radius: 20px;
  border: 1px solid #eee;
}

.filter-tag.active {
  background: #4a90e2;
  color: white;
  border-color: #4a90e2;
}

.filter-tag text {
  font-size: 14px;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.history-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.name-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.type-tag {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.type-tag.single {
  background: #e3f2fd;
  color: #1976d2;
}

.type-tag.double {
  background: #f3e5f5;
  color: #7b1fa2;
}

.date {
  font-size: 12px;
  color: #999;
}

.item-content {
  margin-bottom: 15px;
}

.summary {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.price {
  font-size: 16px;
  font-weight: bold;
  color: #4a90e2;
}

.status {
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
}

.status.paid {
  background: #d4edda;
  color: #155724;
}

.status.pending {
  background: #fff3cd;
  color: #856404;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  border: none;
}

.view-btn {
  background: #4a90e2;
  color: white;
}

.share-btn {
  background: #f8f9fa;
  color: #666;
  border: 1px solid #ddd;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-text {
  font-size: 16px;
  color: #999;
  margin-bottom: 10px;
}

.empty-desc {
  font-size: 14px;
  color: #ccc;
}
</style>

<script>
export default {
  data() {
    return {
      searchKeyword: '',
      currentFilter: 'all',
      historyList: [],
      filteredHistory: []
    }
  },
  onLoad() {
    this.loadHistory();
  },
  methods: {
    loadHistory() {
      // 模拟数据，实际应该从API获取
      this.historyList = [
        {
          id: 1,
          name: '张三',
          type: 'single',
          date: '2023-12-15 14:30',
          summary: '性格温和，善于沟通，适合团队合作。贵人运旺，事业有成。',
          price: 19.9,
          status: 'paid'
        },
        {
          id: 2,
          name: '李四 & 王五',
          type: 'double',
          date: '2023-12-14 16:20',
          summary: '两人性格互补，合作默契。李四是王五的年度贵人，建议加强合作。',
          price: 39.9,
          status: 'paid'
        },
        {
          id: 3,
          name: '赵六',
          type: 'single',
          date: '2023-12-13 09:15',
          summary: '独立性强，有领导才能。感情方面需要更多耐心和包容。',
          price: 9.9,
          status: 'paid'
        }
      ];
      this.filterHistory();
    },
    handleSearch() {
      this.filterHistory();
    },
    setFilter(filter) {
      this.currentFilter = filter;
      this.filterHistory();
    },
    filterHistory() {
      let filtered = this.historyList;
      
      // 按类型筛选
      if (this.currentFilter !== 'all') {
        filtered = filtered.filter(item => item.type === this.currentFilter);
      }
      
      // 按关键词搜索
      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase();
        filtered = filtered.filter(item => 
          item.name.toLowerCase().includes(keyword) ||
          item.date.includes(keyword) ||
          item.summary.toLowerCase().includes(keyword)
        );
      }
      
      this.filteredHistory = filtered;
    },
    getTypeText(type) {
      const typeMap = {
        single: '单人解码',
        double: '关系解析'
      };
      return typeMap[type] || '未知';
    },
    getStatusText(status) {
      const statusMap = {
        paid: '已支付',
        pending: '待支付'
      };
      return statusMap[status] || '未知';
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      const now = new Date();
      const diff = now - date;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      if (days === 0) {
        return '今天 ' + date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
      } else if (days === 1) {
        return '昨天 ' + date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
      } else if (days < 7) {
        return `${days}天前`;
      } else {
        return date.toLocaleDateString('zh-CN');
      }
    },
    viewResult(item) {
      // 跳转到结果详情页
      uni.navigateTo({
        url: `/pages/decrypt/result?id=${item.id}&type=${item.type}`
      });
    },
    shareResult(item) {
      // 分享功能
      uni.share({
        provider: 'weixin',
        scene: 'WXSceneSession',
        type: 0,
        href: `https://your-domain.com/result?id=${item.id}`,
        title: `${item.name}的姓名解码结果`,
        summary: item.summary,
        imageUrl: '/static/share-image.png',
        success: function (res) {
          console.log('分享成功');
        },
        fail: function (err) {
          console.log('分享失败', err);
        }
      });
    }
  }
}
</script>
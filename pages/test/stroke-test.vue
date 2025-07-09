<template>
  <view class="container">
    <text class="title">康熙字典笔画查询测试</text>
    
    <!-- 输入区域 -->
    <view class="input-section">
      <text class="section-title">输入姓名测试</text>
      <input 
        v-model="testName" 
        placeholder="请输入姓名（如：张三）" 
        class="name-input"
        @input="onNameInput"
      />
      <button @click="testStrokeQuery" class="test-btn">查询笔画</button>
    </view>
    
    <!-- 结果显示 -->
    <view class="result-section" v-if="strokeResult.length > 0">
      <text class="section-title">查询结果</text>
      <view class="result-item" v-for="(item, index) in strokeResult" :key="index">
        <text class="char">{{ item.hanzi }}</text>
        <text class="stroke" :class="{ 'unknown': item.stroke === null }">
          {{ item.stroke !== null ? item.stroke + '画' : '未找到' }}
        </text>
      </view>
      
      <view class="summary">
        <text class="summary-text">
          姓名：{{ testName }} | 
          总笔画：{{ totalStrokes }} | 
          可计算：{{ canCalculate ? '是' : '否' }}
        </text>
      </view>
    </view>
    
    <!-- 未知字符提示 -->
    <view class="unknown-section" v-if="unknownChars.length > 0">
      <text class="section-title">未找到的字符</text>
      <text class="unknown-chars">{{ unknownChars.join('、') }}</text>
      <text class="tip">这些字符在字库中未找到，需要补充到康熙字典数据中</text>
    </view>
    
    <!-- 数据统计 -->
    <view class="stats-section">
      <text class="section-title">数据统计</text>
      <view class="stats-item">
        <text class="stats-label">总字符数：</text>
        <text class="stats-value">{{ dataStats.totalChars }}</text>
      </view>
      <view class="stats-item">
        <text class="stats-label">笔画范围：</text>
        <text class="stats-value">{{ dataStats.minStroke }} - {{ dataStats.maxStroke }}画</text>
      </view>
    </view>
    
    <!-- 快速测试按钮 -->
    <view class="quick-test">
      <text class="section-title">快速测试</text>
      <view class="quick-buttons">
        <button @click="quickTest('张三')" class="quick-btn">张三</button>
        <button @click="quickTest('李四')" class="quick-btn">李四</button>
        <button @click="quickTest('王五')" class="quick-btn">王五</button>
        <button @click="quickTest('赵六')" class="quick-btn">赵六</button>
      </view>
    </view>
  </view>
</template>

<script>
import { 
  getStrokeCount, 
  getNameStrokes, 
  canCalculateName, 
  getUnknownChars,
  getDataStats 
} from '../../static/js/kxz-stroke-utils.js';

export default {
  data() {
    return {
      testName: '',
      strokeResult: [],
      totalStrokes: 0,
      canCalculate: false,
      unknownChars: [],
      dataStats: {
        totalChars: 0,
        minStroke: 0,
        maxStroke: 0
      }
    }
  },
  onLoad() {
    this.loadDataStats();
  },
  methods: {
    onNameInput() {
      // 实时查询
      if (this.testName.trim()) {
        this.queryStrokes();
      } else {
        this.strokeResult = [];
        this.totalStrokes = 0;
        this.canCalculate = false;
        this.unknownChars = [];
      }
    },
    
    testStrokeQuery() {
      if (!this.testName.trim()) {
        uni.showToast({
          title: '请输入姓名',
          icon: 'none'
        });
        return;
      }
      this.queryStrokes();
    },
    
    queryStrokes() {
      try {
        // 查询笔画
        this.strokeResult = getNameStrokes(this.testName);
        
        // 计算总笔画
        this.totalStrokes = this.strokeResult
          .filter(item => item.stroke !== null)
          .reduce((sum, item) => sum + item.stroke, 0);
        
        // 检查是否可计算
        this.canCalculate = canCalculateName(this.testName);
        
        // 获取未知字符
        this.unknownChars = getUnknownChars(this.testName);
        
        console.log('笔画查询结果:', {
          name: this.testName,
          strokes: this.strokeResult,
          total: this.totalStrokes,
          canCalculate: this.canCalculate,
          unknown: this.unknownChars
        });
        
      } catch (error) {
        console.error('笔画查询错误:', error);
        uni.showToast({
          title: '查询失败',
          icon: 'none'
        });
      }
    },
    
    quickTest(name) {
      this.testName = name;
      this.queryStrokes();
    },
    
    loadDataStats() {
      try {
        this.dataStats = getDataStats();
        console.log('数据统计:', this.dataStats);
      } catch (error) {
        console.error('加载数据统计失败:', error);
      }
    }
  }
}
</script>

<style lang="scss">
.container {
  padding: 20px;
  background: #F5F5DC;
  min-height: 100vh;
}

.title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
  display: block;
}

.input-section {
  background: #FEFEF8;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.name-input {
  width: 100%;
  height: 44px;
  border: 1px solid #E8E4C9;
  border-radius: 8px;
  padding: 0 15px;
  margin-bottom: 15px;
  background: white;
  font-size: 16px;
}

.test-btn {
  background: linear-gradient(135deg, #4a90e2, #357abd);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
  width: 100%;
}

.result-section {
  background: #FEFEF8;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #E8E4C9;
}

.result-item:last-child {
  border-bottom: none;
}

.char {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.stroke {
  font-size: 16px;
  color: #4a90e2;
  font-weight: bold;
}

.stroke.unknown {
  color: #e74c3c;
}

.summary {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #E8E4C9;
}

.summary-text {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.unknown-section {
  background: #fff3cd;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  border: 1px solid #ffeaa7;
}

.unknown-chars {
  font-size: 16px;
  color: #e74c3c;
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
}

.tip {
  font-size: 12px;
  color: #856404;
  line-height: 1.4;
}

.stats-section {
  background: #FEFEF8;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.stats-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.stats-label {
  font-size: 14px;
  color: #666;
}

.stats-value {
  font-size: 14px;
  color: #333;
  font-weight: bold;
}

.quick-test {
  background: #FEFEF8;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.quick-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.quick-btn {
  background: #E8E4C9;
  color: #333;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  flex: 1;
  min-width: 60px;
}

.quick-btn:active {
  background: #d4cfb8;
}
</style> 
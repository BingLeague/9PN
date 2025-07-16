<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="header">
      <text class="title">深度解读</text>
      <text class="subtitle">姓名五行命盘详细分析</text>
    </view>

    <!-- 基本信息 -->
    <view class="info-section" v-if="analysisData">
      <view class="info-card">
        <text class="info-title">基本信息</text>
        <view class="info-item">
          <text class="label">姓名：</text>
          <text class="value">{{ analysisData.name }}</text>
        </view>
        <view class="info-item">
          <text class="label">出生日期：</text>
          <text class="value">{{ analysisData.birthday }}</text>
        </view>
        <view class="info-item">
          <text class="label">九宫年龄：</text>
          <text class="value">{{ analysisData.age.toFixed(1) }}岁</text>
        </view>

      </view>
    </view>



        <!-- 九宫命盘 -->
    <view class="palace-section" v-if="analysisData && analysisData.palaceInfo">
      <view class="info-card">
        <text class="info-title">姓名五行命盘</text>
        <view class="palace-list">
          <view class="palace-item">
            <text class="palace-label">父母宫</text>
            <text class="palace-num">{{ analysisData.palaceInfo.fumu.num }}</text>
            <text class="palace-wuxing">五行: {{ analysisData.palaceInfo.fumu.wuxing }}</text>
            <text class="palace-qihua">气化: {{ analysisData.palaceInfo.fumu.qihuaNum }} ({{ analysisData.palaceInfo.fumu.qihuaWuxing }})</text>
          </view>
          <view class="palace-item">
            <text class="palace-label">疾恶宫</text>
            <text class="palace-num">{{ analysisData.palaceInfo.jiee.num }}</text>
            <text class="palace-wuxing">五行: {{ analysisData.palaceInfo.jiee.wuxing }}</text>
            <text class="palace-qihua">气化: {{ analysisData.palaceInfo.jiee.qihuaNum }} ({{ analysisData.palaceInfo.jiee.qihuaWuxing }})</text>
          </view>
          <view class="palace-item">
            <text class="palace-label">奴仆宫</text>
            <text class="palace-num">{{ analysisData.palaceInfo.nupu.num }}</text>
            <text class="palace-wuxing">五行: {{ analysisData.palaceInfo.nupu.wuxing }}</text>
            <text class="palace-qihua">气化: {{ analysisData.palaceInfo.nupu.qihuaNum }} ({{ analysisData.palaceInfo.nupu.qihuaWuxing }})</text>
          </view>
        </view>
        <view class="palace-list">
          <view class="palace-item">
            <text class="palace-label">迁移宫</text>
            <text class="palace-num">{{ analysisData.palaceInfo.qianyi.num }}</text>
          </view>
          <view class="palace-item">
            <text class="palace-label">命宫</text>
            <text class="palace-num">{{ analysisData.palaceInfo.ming.num }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 五行生克关系 -->
    <view class="shengke-section" v-if="analysisData && analysisData.palaceInfo">
      <view class="info-card">
        <text class="info-title">五行生克关系</text>
                 <view class="shengke-list">
           <view class="shengke-item" v-if="analysisData.palaceInfo.shengke">
             <text class="shengke-text">
               父母宫与疾恶宫：{{ analysisData.palaceInfo.fumu.wuxing }} - {{ analysisData.palaceInfo.jiee.wuxing }}
               <text v-if="analysisData.palaceInfo.shengke.fumu_jiee" class="shengke-relation">
                 （{{ analysisData.palaceInfo.shengke.fumu_jiee }}）
               </text>
             </text>
           </view>
           <view class="shengke-item" v-if="analysisData.palaceInfo.shengke">
             <text class="shengke-text">
               疾恶宫与奴仆宫：{{ analysisData.palaceInfo.jiee.wuxing }} - {{ analysisData.palaceInfo.nupu.wuxing }}
               <text v-if="analysisData.palaceInfo.shengke.jiee_nupu" class="shengke-relation">
                 （{{ analysisData.palaceInfo.shengke.jiee_nupu }}）
               </text>
             </text>
           </view>
           <view class="shengke-item" v-if="analysisData.palaceInfo.shengke">
             <text class="shengke-text">
               气化五行（夫妻宫）：{{ analysisData.palaceInfo.jiee.qihuaWuxing }} - {{ analysisData.palaceInfo.nupu.qihuaWuxing }}
               <text v-if="analysisData.palaceInfo.shengke.qihua_jiee_nupu" class="shengke-relation">
                 （{{ analysisData.palaceInfo.shengke.qihua_jiee_nupu }}）
               </text>
             </text>
           </view>
         </view>
      </view>
    </view>

    <!-- 返回按钮 -->
    <view class="back-section">
      <button @click="goBack" class="back-btn">
        返回重新分析
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      analysisData: null
    }
  },
  onLoad() {
    // 从本地存储获取分析数据
    const data = uni.getStorageSync('currentAnalysis');
    if (data) {
      this.analysisData = data;
      console.log('Loaded analysis data:', data);
      console.log('Palace info:', data.palaceInfo);
      if (data.palaceInfo) {
        console.log('Fumu palace:', data.palaceInfo.fumu);
        console.log('Jiee palace:', data.palaceInfo.jiee);
        console.log('Nupu palace:', data.palaceInfo.nupu);
        console.log('Ming palace:', data.palaceInfo.ming);
        console.log('Qianyi palace:', data.palaceInfo.qianyi);
        console.log('Shengke info:', data.palaceInfo.shengke);
      }
    } else {
      console.error('No analysis data found');
      uni.showToast({
        title: '未找到分析数据',
        icon: 'none'
      });
      // 如果没有数据，返回上一页
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
    }
  },
  methods: {
    goBack() {
      uni.navigateBack();
    }
  }
}
</script>

<style lang="scss">
.container {
  padding: 20px;
  background: linear-gradient(135deg, #F5F5DC 0%, #E8E4C9 100%);
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding-top: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 14px;
  color: #666;
}

.info-section, .palace-section, .shengke-section {
  margin-bottom: 25px;
}

.info-card {
  background: #FEFEF8;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.info-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  display: block;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.label {
  font-size: 16px;
  color: #666;
}

.value {
  font-size: 16px;
  color: #333;
  font-weight: bold;
}





.palace-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
}

.palace-item {
  flex: 1 1 28%;
  min-width: 90px;
  background: #fff;
  border-radius: 8px;
  padding: 10px 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.palace-label {
  font-size: 13px;
  color: #888;
}

.palace-num {
  font-size: 18px;
  font-weight: bold;
  color: #4a90e2;
}

.palace-wuxing, .palace-qihua {
  font-size: 13px;
  color: #666;
}

.shengke-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.shengke-item {
  background: #eaf2f8;
  border-radius: 8px;
  padding: 12px;
}

.shengke-text {
  font-size: 14px;
  color: #357abd;
  line-height: 1.4;
}

.shengke-relation {
  color: #e74c3c;
  font-weight: bold;
}

.back-section {
  margin-top: 30px;
}

.back-btn {
  width: 100%;
  height: 50px;
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.back-btn:active {
  transform: scale(0.98);
}
</style> 
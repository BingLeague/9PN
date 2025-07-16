<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="header">
      <text class="title">姓名解码</text>
      <text class="subtitle">解析姓名中的能量密码</text>
    </view>

    <!-- 输入表单 -->
    <view class="form-section">
      <view class="form-item">
        <text class="label">姓名</text>
        <input 
          v-model="formData.name" 
          placeholder="请输入姓名（如：刘德华）" 
          class="input"
          maxlength="10"
          @input="onNameInput"
        />
        <text class="tip">支持2-4个汉字</text>
      </view>

      <view class="form-item">
        <text class="label">出生日期</text>
        <picker 
          mode="date" 
          :value="formData.birthday" 
          @change="onBirthdayChange"
          class="picker"
        >
          <view class="picker-text" :class="{ 'placeholder': !formData.birthday }">
            {{ formData.birthday || '请选择出生日期' }}
          </view>
        </picker>
      </view>

      <button @click="calculateStrokes" class="submit-btn" :disabled="!canSubmit">
        开始解码
      </button>
    </view>

    <!-- 笔画结果显示 -->
    <view class="result-section" v-if="strokeResult.length > 0">
      <text class="section-title">笔画数据分析</text>
      
      <!-- 姓名笔画 -->
      <view class="stroke-detail">
        <text class="detail-title">姓名笔画</text>
        <view class="stroke-list">
          <view class="stroke-item" v-for="(item, index) in strokeResult" :key="index">
            <text class="char">{{ item.hanzi }}</text>
            <text class="stroke-count" :class="{ 'unknown': item.stroke === null }">
              {{ item.stroke !== null ? item.stroke + '画' : '未找到' }}
            </text>
          </view>
        </view>
        <!-- 删除总笔画及其蓝色大按钮 -->
        <!-- <view class="total-strokes">
          <text class="total-label">总笔画：</text>
          <text class="total-value">{{ totalStrokes }}画</text>
        </view> -->
      </view>
      <!-- 九宫核心信息 -->
      <view class="palace-section" v-if="palaceAnalysis">
        <text class="detail-title">姓名五行命盘</text>
        <view class="palace-list">
          <view class="palace-item">
            <text class="palace-label">父母宫</text>
            <text class="palace-num">{{ palaceAnalysis.fumu.num }}</text>
            <text class="palace-wuxing">五行: {{ palaceAnalysis.fumu.wuxing }}</text>
            <text class="palace-qihua">气化: {{ palaceAnalysis.fumu.qihuaNum }} ({{ palaceAnalysis.fumu.qihuaWuxing }})</text>
          </view>
          <view class="palace-item">
            <text class="palace-label">疾恶宫</text>
            <text class="palace-num">{{ palaceAnalysis.jiee.num }}</text>
            <text class="palace-wuxing">五行: {{ palaceAnalysis.jiee.wuxing }}</text>
            <text class="palace-qihua">气化: {{ palaceAnalysis.jiee.qihuaNum }} ({{ palaceAnalysis.jiee.qihuaWuxing }})</text>
          </view>
          <view class="palace-item">
            <text class="palace-label">奴仆宫</text>
            <text class="palace-num">{{ palaceAnalysis.nupu.num }}</text>
            <text class="palace-wuxing">五行: {{ palaceAnalysis.nupu.wuxing }}</text>
            <text class="palace-qihua">气化: {{ palaceAnalysis.nupu.qihuaNum }} ({{ palaceAnalysis.nupu.qihuaWuxing }})</text>
          </view>
        </view>
        <view class="palace-list">
          <view class="palace-item">
            <text class="palace-label">迁移宫</text>
            <text class="palace-num">{{ palaceAnalysis.qianyi.num }}</text>
          </view>
          <view class="palace-item">
            <text class="palace-label">命宫</text>
            <text class="palace-num">{{ palaceAnalysis.ming.num }}</text>
          </view>
        </view>
      </view>

      <!-- 生日信息 -->
      <view class="birthday-detail" v-if="formData.birthday">
        <text class="detail-title">生日信息</text>
        <view class="birthday-info">
          <text class="birthday-text">出生日期：{{ formData.birthday }}</text>
          <text class="age-text">九宫年龄：{{ calculatedAge.toFixed(1) }}岁</text>
          <text class="age-tip">（按九宫姓名学理论，人在出生前0.5年即为人，故年龄+0.5）</text>
        </view>
      </view>

      <!-- 可计算性提示 -->
      <view class="calculation-status">
        <view class="status-item" :class="{ 'success': canCalculate, 'error': !canCalculate }">
          <text class="status-icon">{{ canCalculate ? '✓' : '✗' }}</text>
          <text class="status-text">
            {{ canCalculate ? '可以计算九宫命盘' : '无法计算九宫命盘' }}
          </text>
        </view>
      </view>

      <!-- 未知字符提示 -->
      <view class="unknown-section" v-if="unknownChars.length > 0">
        <text class="unknown-title">未找到的字符</text>
        <text class="unknown-chars">{{ unknownChars.join('、') }}</text>
        <text class="unknown-tip">这些字符在字库中未找到，需要补充数据</text>
      </view>
    </view>

    <!-- 下一步按钮 -->
    <view class="next-section" v-if="canCalculate && strokeResult.length > 0">
      <button @click="goToNinePalace" class="next-btn">
        19.9元深度解读
      </button>
    </view>
  </view>
  <!-- uni-pay 组件 -->
  <uni-pay ref="payRef" v-if="showPayPopup" @success="onPaySuccess" @fail="onPayFail" @cancel="onPayCancel" />
</template>

<script>
import { 
  getNameStrokes, 
  canCalculateName, 
  getUnknownChars,
  getNamePalaceAnalysis
} from '../../static/js/kxz-stroke-utils.js';
import uniPay from 'uni_modules/uni-pay/components/uni-pay/uni-pay.vue';

// 五行分配通用规则
const wuxingMap = [
  '水', // 0
  '木', // 1
  '木', // 2
  '火', // 3
  '火', // 4
  '土', // 5
  '土', // 6
  '金', // 7
  '金', // 8
  '水'  // 9
];

// 五行生克关系
const shengMap = {
  '木': '火',
  '火': '土',
  '土': '金',
  '金': '水',
  '水': '木'
};
const keMap = {
  '木': '土',
  '火': '金',
  '土': '水',
  '金': '木',
  '水': '火'
};

export default {
  components: {
    uniPay
  },
  data() {
    return {
      formData: {
        name: '',
        birthday: ''
      },
      strokeResult: [],
      totalStrokes: 0,
      canCalculate: false,
      unknownChars: [],
      calculatedAge: 0,
      palaceAnalysis: null,
      showPayPopup: false, // 仍用于控制弹窗显示
      payOptions: {
        // 按 uni-pay 组件参数格式
        total_fee: 1990, // 单位分，19.9元
        title: '姓名五行命盘深度解读', // 商品名称
        order_no: '', // 订单号（建议后端生成，前端可用时间戳+随机数临时生成）
        // provider: 'wxpay', // uni-pay 可自动选择渠道
        // 其它参数可按uni-pay文档补充
      },

    }
  },
  computed: {
    canSubmit() {
      return this.formData.name.trim() && this.formData.birthday;
    }
  },
  methods: {
    onNameInput() {
      if (this.formData.name.trim()) {
        this.queryStrokes();
      } else {
        this.clearResults();
      }
    },
    onBirthdayChange(e) {
      this.formData.birthday = e.detail.value;
      this.calculateAge();
    },
    queryStrokes() {
      try {
        this.strokeResult = getNameStrokes(this.formData.name);
        this.totalStrokes = this.strokeResult
          .filter(item => item.stroke !== null)
          .reduce((sum, item) => sum + item.stroke, 0);
        this.canCalculate = canCalculateName(this.formData.name);
        this.unknownChars = getUnknownChars(this.formData.name);
        this.calcPalaceAnalysis();
      } catch (error) {
        console.error('笔画查询错误:', error);
        uni.showToast({
          title: '查询失败',
          icon: 'none'
        });
      }
    },
    calcPalaceAnalysis() {
      this.palaceAnalysis = getNamePalaceAnalysis(this.strokeResult);
    },
    calculateStrokes() {
      if (!this.canSubmit) {
        uni.showToast({
          title: '请填写完整信息',
          icon: 'none'
        });
        return;
      }
      this.queryStrokes();
      if (this.canCalculate) {
        uni.showToast({
          title: '笔画计算完成',
          icon: 'success'
        });
      } else {
        uni.showToast({
          title: '存在未知字符',
          icon: 'none'
        });
      }
    },
    calculateAge() {
      if (!this.formData.birthday) {
        this.calculatedAge = 0;
        return;
      }
      
      const birthDate = new Date(this.formData.birthday);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
            // 根据九宫姓名学理论，年龄加上0.5岁（人在出生前0.5年即为人）
      this.calculatedAge = age + 0.5;
    },
    clearResults() {
      this.strokeResult = [];
      this.totalStrokes = 0;
      this.canCalculate = false;
      this.unknownChars = [];
      this.palaceAnalysis = null;
    },
    goToNinePalace() {
      console.log('goToNinePalace called');
      // 保存数据到本地存储，供深度解读页面使用
      const analysisData = {
        name: this.formData.name,
        birthday: this.formData.birthday,
        strokes: this.strokeResult,
        totalStrokes: this.totalStrokes,
        age: this.calculatedAge, // 九宫年龄
        palaceInfo: this.palaceAnalysis,
        timestamp: Date.now()
      };
      uni.setStorageSync('currentAnalysis', analysisData);
      
      // 先尝试直接跳转到深度解读页面（临时方案）
      console.log('Attempting to navigate to deep page');
      uni.navigateTo({ 
        url: '/pages/decrypt/deep',
        success: () => {
          console.log('Navigation successful');
        },
        fail: (err) => {
          console.error('Navigation failed:', err);
          // 如果跳转失败，尝试支付流程
          this.showPayPopup = true;
          this.$nextTick(() => {
            if (this.$refs.payRef) {
              console.log('Opening payment popup');
              this.$refs.payRef.open(this.payOptions);
            } else {
              console.error('payRef not found');
              uni.showToast({
                title: '支付组件未找到',
                icon: 'none'
              });
            }
          });
        }
      });
    },
    // uni-pay 组件事件名通常为 success/fail/cancel
    onPaySuccess(res) {
      this.showPayPopup = false;
      uni.showToast({ title: '支付成功', icon: 'success' });
      uni.navigateTo({ url: '/pages/decrypt/deep' });
    },
    onPayFail(err) {
      this.showPayPopup = false;
      uni.showToast({ title: '支付失败', icon: 'none' });
    },
    onPayCancel(err) {
      this.showPayPopup = false;
      uni.showToast({ title: '已取消支付', icon: 'none' });
    },
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

.form-section {
  background: #FEFEF8;
  padding: 25px;
  border-radius: 16px;
  margin-bottom: 25px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.form-item {
  margin-bottom: 20px;
}

.label {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  display: block;
}

.input {
  width: 100%;
  height: 48px;
  border: 2px solid #E8E4C9;
  border-radius: 8px;
  padding: 0 15px;
  font-size: 16px;
  background: white;
  transition: border-color 0.3s ease;
}

.input:focus {
  border-color: #4a90e2;
}

.tip {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
  display: block;
}

.picker {
  width: 100%;
}

.picker-text {
  width: 100%;
  height: 48px;
  border: 2px solid #E8E4C9;
  border-radius: 8px;
  padding: 0 15px;
  font-size: 16px;
  background: white;
  display: flex;
  align-items: center;
  color: #333;
}

.picker-text.placeholder {
  color: #999;
}

.submit-btn {
  width: 100%;
  height: 50px;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  transition: all 0.3s ease;
}

.submit-btn:disabled {
  background: #ccc;
  opacity: 0.6;
}

.submit-btn:active {
  transform: scale(0.98);
}

.result-section {
  background: #FEFEF8;
  padding: 25px;
  border-radius: 16px;
  margin-bottom: 25px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  display: block;
}

.stroke-detail, .birthday-detail {
  margin-bottom: 20px;
}

.detail-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
  display: block;
}

.stroke-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 15px;
}

.stroke-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  min-width: 60px;
}

.char {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.stroke-count {
  font-size: 14px;
  color: #4a90e2;
  font-weight: bold;
}

.stroke-count.unknown {
  color: #e74c3c;
}

.total-strokes {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  border-radius: 8px;
  color: white;
}

.total-label {
  font-size: 16px;
}

.total-value {
  font-size: 20px;
  font-weight: bold;
}

.birthday-info {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.birthday-text {
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
  display: block;
}

.age-text {
  font-size: 14px;
  color: #666;
  font-weight: bold;
}

.age-tip {
  font-size: 12px;
  color: #999;
  display: block;
  margin-top: 3px;
}



.calculation-status {
  margin-bottom: 20px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.status-item.success {
  border-left: 4px solid #27ae60;
}

.status-item.error {
  border-left: 4px solid #e74c3c;
}

.status-icon {
  font-size: 18px;
  font-weight: bold;
}

.status-item.success .status-icon {
  color: #27ae60;
}

.status-item.error .status-icon {
  color: #e74c3c;
}

.status-text {
  font-size: 14px;
  color: #333;
}

.unknown-section {
  background: #fff3cd;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ffeaa7;
}

.unknown-title {
  font-size: 14px;
  font-weight: bold;
  color: #856404;
  margin-bottom: 8px;
  display: block;
}

.unknown-chars {
  font-size: 16px;
  color: #e74c3c;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

.unknown-tip {
  font-size: 12px;
  color: #856404;
  line-height: 1.4;
}

.next-section {
  margin-top: 20px;
}

.next-btn {
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

.next-btn:active {
  transform: scale(0.98);
}

.palace-section {
  background: #f8f6e8;
  border-radius: 12px;
  padding: 18px;
  margin: 18px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
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

</style> 
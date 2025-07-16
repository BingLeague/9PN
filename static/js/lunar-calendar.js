/**
 * 阴历阳历转换工具
 * 基于农历数据实现阴历和阳历的相互转换
 */

// 农历数据表 (1900-2100)
// 数据格式：年份, 闰月月份, 闰月天数, 正月天数, 二月天数, ..., 十二月天数
const LUNAR_INFO = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
  0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0
];

// 天干
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 地支
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 生肖
const ZODIAC = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

// 农历月份
const LUNAR_MONTHS = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];

// 农历日期
const LUNAR_DAYS = [
  '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'
];

/**
 * 获取农历年的总天数
 * @param {number} year 农历年
 * @returns {number} 总天数
 */
function getLunarYearDays(year) {
  let sum = 348;
  for (let i = 0x8000; i > 0x8; i >>= 1) {
    sum += (LUNAR_INFO[year - 1900] & i) ? 1 : 0;
  }
  return sum + leapDays(year);
}

/**
 * 获取农历年闰月的天数
 * @param {number} year 农历年
 * @returns {number} 闰月天数
 */
function leapDays(year) {
  if (leapMonth(year)) {
    return (LUNAR_INFO[year - 1900] & 0x10000) ? 30 : 29;
  }
  return 0;
}

/**
 * 获取农历年哪个月是闰月
 * @param {number} year 农历年
 * @returns {number} 闰月月份，0表示没有闰月
 */
function leapMonth(year) {
  return LUNAR_INFO[year - 1900] & 0xf;
}

/**
 * 获取农历年某月的总天数
 * @param {number} year 农历年
 * @param {number} month 农历月
 * @returns {number} 该月总天数
 */
function monthDays(year, month) {
  return (LUNAR_INFO[year - 1900] & (0x10000 >> month)) ? 30 : 29;
}

/**
 * 阳历转阴历
 * @param {Date} date 阳历日期
 * @returns {object} 阴历信息
 */
export function solarToLunar(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // 计算距离1900年1月31日的天数
  let offset = Math.floor((date - new Date(1900, 0, 31)) / 86400000);
  
  // 用offset减去每农历年的天数，计算当前农历年份
  let lunarYear = 1900;
  let temp = 0;
  for (lunarYear = 1900; lunarYear < 2100 && offset > 0; lunarYear++) {
    temp = getLunarYearDays(lunarYear);
    offset -= temp;
  }
  if (offset < 0) {
    offset += temp;
    lunarYear--;
  }
  
  // 农历年
  const yearCyl = lunarYear - 1900 + 36;
  
  // 闰哪个月
  const leap = leapMonth(lunarYear);
  let isLeap = false;
  
  // 效验闰月
  let lunarMonth = 1;
  for (let i = 1; i < 13 && offset > 0; i++) {
    // 闰月
    if (leap > 0 && i === leap + 1 && !isLeap) {
      --i;
      isLeap = true;
      temp = leapDays(lunarYear); // 计算农历闰月天数
    } else {
      temp = monthDays(lunarYear, i); // 计算农历普通月天数
    }
    // 解除闰月
    if (isLeap && i === leap + 1) {
      isLeap = false;
    }
    offset -= temp;
    lunarMonth = i;
  }
  
  if (offset === 0 && leap > 0 && lunarMonth === leap + 1) {
    if (isLeap) {
      isLeap = false;
    } else {
      isLeap = true;
      --lunarMonth;
    }
  }
  if (offset < 0) {
    offset += temp;
    --lunarMonth;
  }
  const lunarDay = offset + 1;
  
  // 天干地支年
  const cylYear = lunarYear;
  const yearGanIndex = (cylYear - 4) % 10;
  const yearZhiIndex = (cylYear - 4) % 12;
  const yearGan = HEAVENLY_STEMS[yearGanIndex];
  const yearZhi = EARTHLY_BRANCHES[yearZhiIndex];
  
  // 天干地支月
  const cylMonth = lunarYear * 12 + lunarMonth;
  const monthGanIndex = (cylMonth - 4) % 10;
  const monthZhiIndex = (lunarMonth - 1) % 12;
  const monthGan = HEAVENLY_STEMS[monthGanIndex];
  const monthZhi = EARTHLY_BRANCHES[monthZhiIndex];
  
  // 天干地支日
  const cylDay = Math.floor((date - new Date(1900, 0, 31)) / 86400000) + 25567 + 10;
  const dayGanIndex = (cylDay - 1) % 10;
  const dayZhiIndex = (cylDay - 1) % 12;
  const dayGan = HEAVENLY_STEMS[dayGanIndex];
  const dayZhi = EARTHLY_BRANCHES[dayZhiIndex];
  
  // 生肖
  const zodiac = ZODIAC[yearZhiIndex];
  
  return {
    lunarYear,
    lunarMonth,
    lunarDay,
    isLeap,
    yearGan,
    yearZhi,
    monthGan,
    monthZhi,
    dayGan,
    dayZhi,
    zodiac,
    yearCyl,
    monthCyl: cylMonth,
    dayCyl: cylDay
  };
}

/**
 * 阴历转阳历
 * @param {number} lunarYear 农历年
 * @param {number} lunarMonth 农历月
 * @param {number} lunarDay 农历日
 * @param {boolean} isLeap 是否闰月
 * @returns {Date} 阳历日期
 */
export function lunarToSolar(lunarYear, lunarMonth, lunarDay, isLeap = false) {
  // 验证输入
  if (lunarYear < 1900 || lunarYear > 2100) {
    throw new Error('农历年份必须在1900-2100之间');
  }
  
  if (lunarMonth < 1 || lunarMonth > 12) {
    throw new Error('农历月份必须在1-12之间');
  }
  
  if (lunarDay < 1 || lunarDay > 30) {
    throw new Error('农历日期必须在1-30之间');
  }
  
  // 计算距离1900年1月31日的天数
  let offset = 0;
  
  // 计算年份差
  for (let year = 1900; year < lunarYear; year++) {
    offset += getLunarYearDays(year);
  }
  
  // 计算月份差
  const leap = leapMonth(lunarYear);
  for (let month = 1; month < lunarMonth; month++) {
    if (leap > 0 && month === leap + 1 && !isLeap) {
      // 闰月
      offset += leapDays(lunarYear);
      isLeap = true;
    } else {
      offset += monthDays(lunarYear, month);
    }
  }
  
  // 处理闰月
  if (leap > 0 && lunarMonth === leap + 1) {
    if (!isLeap) {
      offset += monthDays(lunarYear, lunarMonth - 1);
    }
  }
  
  // 加上当月天数
  offset += lunarDay - 1;
  
  // 转换为阳历日期
  const solarDate = new Date(1900, 0, 31);
  solarDate.setDate(solarDate.getDate() + offset);
  
  return solarDate;
}

/**
 * 格式化阴历日期
 * @param {object} lunar 阴历信息
 * @returns {string} 格式化的阴历日期字符串
 */
export function formatLunarDate(lunar) {
  const monthStr = lunar.isLeap ? '闰' + LUNAR_MONTHS[lunar.lunarMonth - 1] + '月' : LUNAR_MONTHS[lunar.lunarMonth - 1] + '月';
  const dayStr = LUNAR_DAYS[lunar.lunarDay - 1];
  return `${lunar.yearGan}${lunar.yearZhi}年 ${monthStr} ${dayStr}`;
}

/**
 * 获取农历年的生肖
 * @param {number} year 农历年
 * @returns {string} 生肖
 */
export function getZodiac(year) {
  return ZODIAC[(year - 4) % 12];
}

/**
 * 获取天干地支年
 * @param {number} year 农历年
 * @returns {string} 天干地支年
 */
export function getYearGanZhi(year) {
  const ganIndex = (year - 4) % 10;
  const zhiIndex = (year - 4) % 12;
  return HEAVENLY_STEMS[ganIndex] + EARTHLY_BRANCHES[zhiIndex];
} 
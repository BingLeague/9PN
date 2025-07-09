/**
 * 康熙字典笔画查询工具
 * 用于查询汉字的康熙字典笔画数
 */

// 导入笔画数据
import strokeData from '../data/kxz_stroke_dict.json';

/**
 * 查询单个汉字的康熙字典笔画数
 * @param {string} hanzi 汉字
 * @returns {number|null} 笔画数，如果查不到返回null
 */
export function getStrokeCount(hanzi) {
  if (!hanzi || typeof hanzi !== 'string') {
    return null;
  }
  
  // 遍历所有笔画分组
  for (const [stroke, chars] of Object.entries(strokeData.data)) {
    if (chars.includes(hanzi)) {
      return parseInt(stroke);
    }
  }
  
  return null;
}

/**
 * 批量查询汉字的康熙字典笔画数
 * @param {string[]} hanziArray 汉字数组
 * @returns {Array<{hanzi: string, stroke: number|null}>} 结果数组
 */
export function getStrokeCountBatch(hanziArray) {
  if (!Array.isArray(hanziArray)) {
    return [];
  }
  
  return hanziArray.map(hanzi => ({
    hanzi: hanzi,
    stroke: getStrokeCount(hanzi)
  }));
}

/**
 * 查询姓名的笔画数
 * @param {string} name 姓名
 * @returns {Array<{hanzi: string, stroke: number|null}>} 结果数组
 */
export function getNameStrokes(name) {
  if (!name || typeof name !== 'string') {
    return [];
  }
  
  // 将姓名拆分为单个字符
  const chars = name.split('').filter(char => char.trim() !== '');
  return getStrokeCountBatch(chars);
}

/**
 * 检查姓名是否所有字都能查到笔画数
 * @param {string} name 姓名
 * @returns {boolean} 是否所有字都能查到
 */
export function canCalculateName(name) {
  const strokes = getNameStrokes(name);
  return strokes.every(item => item.stroke !== null);
}

/**
 * 获取查不到笔画数的字符
 * @param {string} name 姓名
 * @returns {string[]} 查不到笔画数的字符数组
 */
export function getUnknownChars(name) {
  const strokes = getNameStrokes(name);
  return strokes
    .filter(item => item.stroke === null)
    .map(item => item.hanzi);
}

/**
 * 获取所有可用的汉字列表
 * @returns {string[]} 所有可用汉字
 */
export function getAllAvailableChars() {
  const allChars = [];
  for (const chars of Object.values(strokeData.data)) {
    allChars.push(...chars);
  }
  return allChars;
}

/**
 * 获取指定笔画数的所有汉字
 * @param {number} stroke 笔画数
 * @returns {string[]} 指定笔画数的汉字数组
 */
export function getCharsByStroke(stroke) {
  return strokeData.data[stroke.toString()] || [];
}

/**
 * 获取数据统计信息
 * @returns {object} 统计信息
 */
export function getDataStats() {
  const stats = {
    totalChars: 0,
    strokeRanges: {},
    maxStroke: 0,
    minStroke: 0
  };
  
  const strokes = Object.keys(strokeData.data).map(Number);
  stats.maxStroke = Math.max(...strokes);
  stats.minStroke = Math.min(...strokes);
  
  for (const [stroke, chars] of Object.entries(strokeData.data)) {
    stats.totalChars += chars.length;
    stats.strokeRanges[stroke] = chars.length;
  }
  
  return stats;
}

/**
 * 姓名命盘排盘分析（按自定义九宫规则）
 * @param {Array<{hanzi: string, stroke: number|null}>} strokeArr 姓名笔画数组
 * @returns {object|null} 命盘分析结构，查不到笔画返回null
 */
export function getNamePalaceAnalysis(strokeArr) {
  if (!Array.isArray(strokeArr) || strokeArr.length < 2 || strokeArr.length > 4) return null;
  // 检查有无未知字
  if (strokeArr.some(item => item.stroke == null)) return null;
  // 五行映射
  const wuxingMap = ['水','木','木','火','火','土','土','金','金','水'];
  // 生克
  const shengMap = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
  const keMap = { '木': '土', '火': '金', '土': '水', '金': '木', '水': '火' };
  // 相拼数字
  function getQihuaNum(num) {
    let n = Math.abs(num);
    while (n >= 10) {
      n = n.toString().split('').reduce((a, b) => a + Number(b), 0);
    }
    return n;
  }
  // 取个位五行
  function getWuxing(num) {
    return wuxingMap[Math.abs(num) % 10];
  }
  // 取生克
  function getShengKe(w1, w2) {
    if (shengMap[w1] === w2) return '生';
    if (keMap[w1] === w2) return '克';
    if (w1 === w2) return '平';
    return '';
  }
  // 取笔画
  const strokes = strokeArr.map(item => item.stroke);
  let A = strokes[0], B = strokes[1], C = strokes[2] || null, D = strokes[3] || null;
  let palace = {};
  if (strokes.length === 2) {
    // 2字名
    palace = {
      fumu: A + 1,
      jiee: A + B,
      nupu: B + 1,
      ming: A + B,
      qianyi: 2
    };
  } else if (strokes.length === 3) {
    palace = {
      fumu: A + 1,
      jiee: A + B,
      nupu: B + C,
      ming: A + B + C,
      qianyi: C + 1
    };
  } else if (strokes.length === 4) {
    palace = {
      fumu: A + B,
      jiee: A + B + C,
      nupu: C + D,
      ming: A + B + C + D,
      qianyi: D + 1
    };
  }
  // 组装分析结构
  const fumuWuxing = getWuxing(palace.fumu);
  const jieeWuxing = getWuxing(palace.jiee);
  const nupuWuxing = getWuxing(palace.nupu);
  const fumuQihua = getQihuaNum(palace.fumu);
  const jieeQihua = getQihuaNum(palace.jiee);
  const nupuQihua = getQihuaNum(palace.nupu);
  const fumuQihuaWuxing = getWuxing(fumuQihua);
  const jieeQihuaWuxing = getWuxing(jieeQihua);
  const nupuQihuaWuxing = getWuxing(nupuQihua);
  // 生克
  const fumu_jiee_shengke = getShengKe(fumuWuxing, jieeWuxing);
  const jiee_nupu_shengke = getShengKe(jieeWuxing, nupuWuxing);
  const qihua_jiee_nupu_shengke = getShengKe(jieeQihuaWuxing, nupuQihuaWuxing);
  return {
    fumu: { num: palace.fumu, wuxing: fumuWuxing, qihuaNum: fumuQihua, qihuaWuxing: fumuQihuaWuxing },
    jiee: { num: palace.jiee, wuxing: jieeWuxing, qihuaNum: jieeQihua, qihuaWuxing: jieeQihuaWuxing },
    nupu: { num: palace.nupu, wuxing: nupuWuxing, qihuaNum: nupuQihua, qihuaWuxing: nupuQihuaWuxing },
    ming: { num: palace.ming },
    qianyi: { num: palace.qianyi },
    shengke: {
      fumu_jiee: fumu_jiee_shengke,
      jiee_nupu: jiee_nupu_shengke,
      qihua_jiee_nupu: qihua_jiee_nupu_shengke
    }
  };
}

// 导出笔画数据（只读）
export const STROKE_DATA = strokeData; 
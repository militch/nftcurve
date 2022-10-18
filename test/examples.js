import CurveCalculator, {
  LinearCurve,
  ExponentCurve,
} from '../src/index.js';

import {
  getTestObj,
  assertEquals,
} from './utils.js';

// 构造线性曲线
const linearCurve = new LinearCurve();
// 构造指数曲线
const exponentCurve = new ExponentCurve();

// 构造线性曲线计算器
const linearCalculator = new CurveCalculator({
  // 配置项 - 曲线类型: 线性曲线
  curve: linearCurve,
  // 配置项 - 通证小数位数
  tokenDecimals: 18
});

// 构造指数曲线计算器
const exponentCalculator = new CurveCalculator({
  // 配置项 - 曲线类型: 指数曲线
  curve: exponentCurve,
  // 配置项 - 通证小数位数
  tokenDecimals: 18
});

// 测试获取线性曲线卖出价
export function testGetLinearSellingPrice() {
  // 获取测试对象
  const testObj = getTestObj('getLinearSellingPrice');
  // 解构测试对象参数
  const {input: { delta, spotPrice, amount }, expResult} = testObj;
  const calculator = linearCalculator;
  // 获取卖出价
  const gotPrice = calculator.getSellingPrice(delta, spotPrice, amount);
  // 校验预期结果
  assertEquals(gotPrice, expResult, 'getSellingPrice');
}

// 测试获取线性曲线买入价
export function testGetLinearBuyingPrice() {
  // 获取测试对象
  const testObj = getTestObj('getLinearBuyingPrice');
  // 解构测试对象参数
  const {input: { delta, spotPrice, amount }, expResult} = testObj;
  const calculator = linearCalculator;
  // 获取买入价
  const gotPrice = calculator.getBuyingPrice(delta, spotPrice, amount);
  // 校验预期结果
  assertEquals(gotPrice, expResult, 'getBuyingPrice');
}

// 测试获取指数曲线卖出价
export function testGetExponentSellingPrice() {
  // 获取测试对象
  const testObj = getTestObj('getExponentSellingPrice');
  // 解构测试对象参数
  const {input: { delta, spotPrice, amount }, expResult} = testObj;
  const calculator = exponentCalculator;
  // 获取卖出价
  const gotPrice = calculator.getSellingPrice(
    delta, spotPrice, amount);
  // 校验预期结果
  assertEquals(gotPrice, expResult, 'getSellingPrice');
}

// 测试获取指数曲线买入价
export function testGetExponentBuyingPrice() {
  // 获取测试对象
  const testObj = getTestObj('getExponentBuyingPrice');
  // 解构测试对象参数
  const {input: { delta, spotPrice, amount }, expResult} = testObj;
  const calculator = exponentCalculator;
  // 获取买入价
  const gotPrice = calculator.getBuyingPrice(
    delta, spotPrice, amount);
  // 校验预期结果
  assertEquals(gotPrice, expResult, 'getBuyingPrice');
}

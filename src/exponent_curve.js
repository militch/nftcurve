import Decimal from 'decimal.js';

import {
  BIG_ONE,
} from './decimals.js';

/**
* 指数曲线
* 曲线定义类，需要结合曲线计算器上下文实例
*/
export default class ExponentCurve {
  /**
  * 获取买入价
  * calculator: 计算器上下文实例
  * delta: 计算因子
  * spotPrice: 现货价格
  * amount: 买入数量
  */
  getBuyingPrice(calculator, delta, spotPrice, amount){
    if (!delta || isNaN(delta) || delta <= 0) {
      // delta 不能小于 0
      throw new Error('delta must be > 0');
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      // amount 不能小于 0
      throw new Error('amount must be > 0');
    }
    if (!spotPrice || isNaN(spotPrice) || spotPrice <= 0) {
      // spotPrice 不能小于 0
      throw new Error('spotPrice must be > 0');
    }
    // 将现货价格(spotPrice)转换为计算精度
    const spotPriceBig = calculator.scaleBaseToTokenAmount(spotPrice);
    // 将 amount 构造为 Decimal 类型，方便后面精度计算
    let amountBig = new Decimal(amount);
    // 将 delta 构造为 Decimal 类型
    const deltaBig = new Decimal(delta);
    // m = (deltaBig^amountBig) - 1;
    let m = deltaBig.pow(amountBig);
    m = m.sub(BIG_ONE);
    // tokenAmount = m / (deltaBig - 1)
    let tokenAmount = deltaBig.sub(BIG_ONE);
    tokenAmount = m.div(tokenAmount);
    // price = spotPriceBig * deltaBig
    const price = spotPriceBig.mul(deltaBig);
    // tokenAmount = price * tokenAmount
    tokenAmount = price.mul(tokenAmount);
    const tokenBase = calculator.scaleTokenAmountToBase(tokenAmount);
    return tokenBase.toString();
  }

  /**
  * 获取卖出价
  * calculator: 计算器上下文实例
  * delta: 计算因子
  * spotPrice: 现货价格
  * amount: 卖出数量
  */
  getSellingPrice(calculator, delta, spotPrice, amount){
    if (!delta || isNaN(delta) || delta <= 0) {
      // delta 不能小于 0
      throw new Error('delta must be > 0');
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      // amount 不能小于 0
      throw new Error('amount must be > 0');
    }
    if (!spotPrice || isNaN(spotPrice) || spotPrice <= 0) {
      // spotPrice 不能小于 0
      throw new Error('spotPrice must be > 0');
    }
    // 将 amount 构造为 Decimal 类型，方便后面精度计算
    let amountBig = new Decimal(amount);
    // 将 delta 构造为 Decimal 类型
    const deltaBig = new Decimal(delta);
    // 将现货价格(spotPrice)转换为计算精度
    const spotPriceBig = calculator.scaleBaseToTokenAmount(spotPrice);
    const invDelta = BIG_ONE.div(deltaBig);
    const m = invDelta.pow(amountBig);
    let tokenAmount = BIG_ONE.sub(invDelta);
    const n = BIG_ONE.sub(m);
    tokenAmount = n.div(tokenAmount);
    tokenAmount = spotPriceBig.mul(tokenAmount);
    // 将计算结果转换为业务精度(x/(10^n))
    const tokenBase = calculator.scaleTokenAmountToBase(tokenAmount);
    return tokenBase.toString();
  }
}

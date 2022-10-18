import Decimal from 'decimal.js';

import {
  BIG_ONE,
  BIG_TWO,
} from './decimals.js';

/**
* 线性曲线
* 曲线定义类，需要结合曲线计算器上下文实例
*/
export default class LinearCurve {

  /**
  * 获取买入价
  * calculator: 计算器上下文实例
  * delta: 计算因子
  * spotPrice: 现货价格
  * amount: 数量
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
    // 将 delta 转换为计算精度 (x*(10^n))
    const deltaBig = calculator.scaleBaseToTokenAmount(delta);
    // 将现货价格(spotPrice)转换为计算精度
    const spotPriceBig = calculator.scaleBaseToTokenAmount(spotPrice);
    // 将 amount 构造为 Decimal 类型，方便后面精度计算
    let amountBig = new Decimal(amount);

    // tmp = ((amountBig - 1) * deltaBig / 2) * amountBig 
    let tmp = amountBig.sub(BIG_ONE);
    tmp = tmp.mul(deltaBig).div(BIG_TWO);
    tmp = tmp.mul(amountBig);
    // price = ((spotPriceBig + deltaBig) * amountBig) + tmp
    let price = spotPriceBig.add(deltaBig);
    price = price.mul(amountBig).add(tmp);
    // 将计算结果转换为业务精度(x/(10^n))
    const tokenBase = calculator.scaleTokenAmountToBase(price);
    return tokenBase.toString();
  }

  /**
  * 获取卖出价
  * calculator: 计算器上下文实例
  * delta: 计算因子
  * spotPrice: 现货价格
  * amount: 数量
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
    // 将 delta 转换为计算精度 (x*(10^n))
    const deltaBig = calculator.scaleBaseToTokenAmount(delta);
    // totalBig = amountBig * deltaBig
    const totalBig = amountBig.mul(deltaBig);
    // 将现货价格(spotPrice)转换为计算精度
    const spotPriceBig = calculator.scaleBaseToTokenAmount(spotPrice);
    // let price = BIG_ZERO;
    if (spotPriceBig.cmp(totalBig) < 0) {
      // 若现货价格小于totalBig:
      // amountBig = (spotPriceBig / deltaBig) + 1
      amountBig = spotPriceBig.div(deltaBig);
      amountBig = amountBig.add(BIG_ONE);
    }else {
      // 否则: price = spotPriceBig - totalBig
      // price = spotPriceBig.sub(totalBig);
    }
    let tokens = amountBig.mul(spotPriceBig);
    let tmp = amountBig.sub(BIG_ONE).mul(deltaBig).div(BIG_TWO);
    tmp = amountBig.mul(tmp);
    tokens = tokens.sub(tmp);
    // 将计算结果转换为业务精度(x/(10^n))
    //const priceBase = this.scaleTokenAmountToBase(price); 
    const tokenBase = calculator.scaleTokenAmountToBase(tokens);
    return tokenBase.toString();
  }
}

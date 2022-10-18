
import Decimal from 'decimal.js';

import {
  BIG_ZERO,
  BIG_TEN,
} from './decimals.js';

import LinearCurve from './linear_curve.js'; 

const defaultCurve = new LinearCurve();

/**
* 默认选项
*/
const defaultOpts = {
  // 通证小数位数
  tokenDecimals: 18,
  // 曲线类型
  curve: defaultCurve,
};


/**
* 曲线计算器
*/
export default class CurveCalculator {

  constructor(opts){
    // 解构合并选项参数
    this.opts = {
      ...defaultOpts,
      ...(opts||{}),
    };
  }

  /**
  * 转换通证数量（由业务精度转计算精度）
  * 根据通证小数精度转换为计算精度
  * amount: 通证数量（业务精度）
  * return: 通证数量（计算精度）
  */
  scaleBaseToTokenAmount(amount){
    // amount 值校验, 默认返回0
    if (!amount || isNaN(amount) || amount <= 0){
      return BIG_ZERO;
    }
    // 将 amount 构造为 Decimal 类型方便后面精度计算
    const amountBig = new Decimal(amount);
    // 获取配置项
    const {tokenDecimals} = this.opts;
    // 精度换算（x*(10^n)）并返回
    return amountBig.mul(BIG_TEN.pow(new Decimal(tokenDecimals)));
  }

  /**
  * 转换通证数量（由计算精度转业务精度）
  * 根据通证小数精度转换为业务精度
  * amount: 通证数量（计算精度）
  * return: 通证数量（业务精度）
  */
  scaleTokenAmountToBase(amount){
    // amount 值校验, 默认返回0
    if (!amount || !Decimal.isDecimal(amount)){
      return BIG_ZERO;
    }
    // 获取配置项
    const {tokenDecimals} = this.opts;
    // 精度换算（x/(10^n)）并返回
    return amount.div(BIG_TEN.pow(new Decimal(tokenDecimals)));
  }

  /**
  * 获取卖出价返回通证数量（业务精度）
  * delta: 影响因子
  * spotPrice: 现货价格
  * amount: NFT 数量
  * return: 通证数量 
  */
  getSellingPrice(delta, spotPrice, amount){
    const {curve} = this.opts;
    return curve?.getSellingPrice(
      this, delta, spotPrice, amount);
  }

  /**
  * 获取买入价返回通证数量（业务精度）
  * delta: 影响因子
  * spotPrice: 现货价格
  * amount: NFT 数量
  * return: 通证数量 
  */
  getBuyingPrice(delta, spotPrice, amount){
    const {curve} = this.opts;
    return curve?.getBuyingPrice(
      this, delta, spotPrice, amount);
  }
}


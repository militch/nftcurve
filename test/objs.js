const testObjs = [
  {
    // 测试对象: 获取线性曲线卖出价
    id: 'getLinearSellingPrice',
    input: {
      delta: 0.25,
      spotPrice: 5,
      amount: 20,
    },
    // 预期结果
    expResult: '52.5',
  },
  {
    // 测试对象: 获取线性曲线买入价
    id: 'getLinearBuyingPrice',
    input: {
      delta: 0.25,
      spotPrice: 5,
      amount: 20,
    },
    // 预期结果
    expResult: '152.5',
  },
  {
    // 测试对象: 获取指数曲线卖出价
    id: 'getExponentSellingPrice',
    input: {
      delta: 1.05,
      spotPrice: 10,
      amount: 20,
    },
    // 预期结果
    expResult: '130.85320859666985247',
  },
  {
    // 测试对象: 获取指数曲线买入价
    id: 'getExponentBuyingPrice',
    input: {
      delta: 1.05,
      spotPrice: 10,
      amount: 20,
    },
    // 预期结果
    expResult: '347.19251808032822812',
  }
];
export {
  testObjs,
};

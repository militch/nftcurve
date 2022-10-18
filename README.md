# NFT 曲线计算器

下载安装:

```
npm install --save nftcurve.js
```

使用方法:

```javascript
import CurveCalculator, {
  LinearCurve,
  ExponentCurve,
} from 'nftcurve.js';

// 线性曲线
const linearCurve = new LinearCurve();
// 指数曲线
const exponentCurve = new ExponentCurve();

// 线性曲线计算器
const linearCalcualator = new CurveCalculator({
  curve: linearCurve,
});

// 指数曲线计算器
const exponentCalcualator = new CurveCalculator({
  curve: exponentCurve,
});
```

更多使用示例参考 [test/examples.js](./test/examples.js) 文件:

```
npm install
node test/main.js
```

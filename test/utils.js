import {testObjs} from './objs.js';

// 获取测试对象
export function getTestObj(id){
  const results = testObjs.filter((item)=> {
    return item?.id === id;
  });
  return results[0];
}

// 断言匹配
export function assertEquals(got, want, id){
  if (got !== want){
    const errMsg = `${id??'unknow'}() = ${got}, but want: ${want}`;
    throw new Error(errMsg);
    //console.error(errMsg);
  }
}

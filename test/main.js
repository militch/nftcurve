import * as examples from './examples.js';

const testfns = {
  ...examples,
};

try {
  const fnkeys = Object.keys(testfns);
  for (let i=0; i < fnkeys.length; i++){
    const fnkey = fnkeys[i];
    const testfn = testfns[fnkey];
    console.log(`-- ${fnkey}`);
    testfn();
  }
}catch(e) {
  console.error('Error: ' + e.message);
}

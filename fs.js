//setTimeout和setImmediate按照执行线程的长短决定谁快谁慢
let stime=Date.now()
let fs = require('fs');
setTimeout(function () {
    console.log('setTimeout'+(Date.now()-stime))
}, 0); // ->4
setImmediate(function () {
    console.log('setImmediate'+(Date.now()-stime))
});
fs.readFile('./evenloop/.gitignore', function (data) { // io的下一个事件队列是check阶段
    console.log(data+(Date.now()-stime))
    
    setImmediate(function () {
        console.log('fssetImmediate'+(Date.now()-stime))
    });
    setTimeout(function () {
        console.log('fssetTimeout'+(Date.now()-stime))
    }, 0);
})

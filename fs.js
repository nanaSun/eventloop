//setTimeout和setImmediate按照执行线程的长短决定谁快谁慢
let stime=new Date().getTime()
let fs = require('fs');
setTimeout(function () {
    console.log('setTimeout'+(new Date().getTime()-stime))
}, 0); // ->4
setImmediate(function () {
    console.log('setImmediate'+(new Date().getTime()-stime))
});
fs.readFile('./evenloop/.gitignore', function (data) { // io的下一个事件队列是check阶段
    console.log(data+(new Date().getTime()-stime))
    
    setImmediate(function () {
        console.log('fssetImmediate'+(new Date().getTime()-stime))
    });
    setTimeout(function () {
        console.log('fssetTimeout'+(new Date().getTime()-stime))
    }, 0);
})

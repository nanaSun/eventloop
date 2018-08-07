let step=0,microStep=0,macroStep=0
function getMacroStep(){
    step++
    macroStep++
    return step+":我是macro "+macroStep+"号"
}
function getMicroStep(){
    step++;
    microStep++;
    return step+":我是micro "+microStep+"号"
}
console.log(getMacroStep()+"startconsole")
//setTimeout的callback被push到下一个宏任务中
setTimeout(()=>{
    console.log(getMacroStep()+"setTimeout")
},0)


setTimeout(()=>{
    console.log(getMacroStep()+"setTimeout")
},0)


process.nextTick(()=>{
    setTimeout(()=>{
        console.log(getMacroStep()+"setTimeout1")
    },0)
    console.log(getMicroStep()+"nextTick4")
})

//Promise的then是微任务，所以当前宏任务结束后优先运行
Promise.resolve().then(function() {
    console.log(getMicroStep()+"promise1")
})
process.nextTick(()=>{
    console.log(getMicroStep()+"nextTick1")
})

process.nextTick(()=>{
    Promise.resolve().then(function() {
        console.log(getMicroStep()+"promise2")
    })
    console.log(getMicroStep()+"nextTick2")
})

Promise.resolve().then(function() {
    process.nextTick(()=>{
        console.log(getMicroStep()+"nextTick3")
    })
    console.log(getMicroStep()+"promise3")
})

console.log(getMacroStep()+"endconsole")
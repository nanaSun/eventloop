let step=0,microStep=0,macroStep=0,tasks=[],microTasks=[]
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
tasks.push(macroStep)

setTimeout(()=>{
    console.log(getMacroStep()+"setTimeout2")
},0)
tasks.push(macroStep)

process.nextTick(()=>{
    setTimeout(()=>{
        console.log(getMacroStep()+"setTimeout1")
    },0)
    tasks.push(macroStep)
    console.log(getMicroStep()+"nextTick4")
})
microTasks.push(microStep)


//Promise的then是微任务，所以当前宏任务结束后优先运行
Promise.resolve().then(function() {
    console.log(getMicroStep()+"promise1")
})
microTasks.push("Promise"+microStep)

process.nextTick(()=>{
    console.log(getMicroStep()+"nextTick1")
})
microTasks.push("process"+microStep)

process.nextTick(()=>{
    Promise.resolve().then(function() {
        console.log(getMicroStep()+"promise2")
    })
    microTasks.push("Promise"+microStep)
    console.log(getMicroStep()+"nextTick2")
})
microTasks.push("process"+microStep)

Promise.resolve().then(function() {
    process.nextTick(()=>{
        console.log(getMicroStep()+"nextTick3")
    })
    microTasks.push("process"+microStep)
    console.log(getMicroStep()+"promise3")
})
microTasks.push("Promise"+microStep)

console.log(getMacroStep()+"endconsole")

setTimeout(()=>{
    console.log(microTasks,tasks);
},0)

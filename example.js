function print(data){
    console.log(data)
}
function startOne(){
    print("one")
}
function startTwo(){
    startOne()
    print("two")
}
function startThree(){
    startTwo()
    print("three")
}
function start(){
    startThree()
    console.log("start")
}
/**
 * 打印结果
 * stack演示
 * one,two,three,start
 */
start()
/**
 * macro任务,timer队列
 */
setTimeout(()=>{
    console.log("timeout-1")
})
/**
 * micro任务上线，poll队列
 */
Promise.resolve().then(()=>{
    print("promise-1") 
})
/**
 * check队列
 */
setImmediate(()=>{
    print("Immediate-1") 
})
/**
 * micro另一个例子，poll队列
 */
process.nextTick(()=>{
    print("process-1") 
})
/**
 * 
 */
setImmediate(()=>{
    setTimeout(()=>{
        print("Immediate2-Timeout2") 
    })
    print("Immediate-2") 
})
setTimeout(()=>{
    process.nextTick(()=>{
        print("timeout-3-process-2") 
    })
    setImmediate(()=>{
        print("timeout-3-Immediate-3") 
    })   
    print("timeout-3") 
},100)
setTimeout(()=>{
    process.nextTick(()=>{
        print("timeout-4-process-3") 
    })
    setImmediate(()=>{
        print("timeout-4-Immediate-4") 
    })   
    print("timeout-4") 
})
process.nextTick(()=>{
    print("process-4") 
})
print("end")
class nextTick{
    constructor(){
        console.log("constructor")
        this.arr=[]
        //等待所有代码结束后再执行
        process.nextTick(()=>{
            console.log(this.arr)
        })
    }
    add(val){
        console.log("push"+val)
        this.arr.push(val)
    }
}
let tmp=new nextTick()
tmp.add(123)
tmp.add(456)

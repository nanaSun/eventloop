class Queue{
    constructor(){
        this.arr=[]
    }
    addItem(val){
        this.arr.push(val)
    }
    removeItem(){
        this.arr.shift()
    }
    printItem(){
        console.log(this.arr) 
    }
}
export default Queue
let arr=new Queue()
arr.addItem("aaa")
arr.printItem()
arr.addItem("bbb")
arr.printItem()
arr.addItem("ccc")
arr.printItem()
arr.removeItem()
arr.printItem()
arr.addItem("ddd")
arr.printItem()
arr.removeItem()
arr.printItem()
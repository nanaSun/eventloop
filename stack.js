class Stack{
    constructor(){
        this.arr=[]
    }
    addItem(val){
        this.arr.push(val)
    }
    removeItem(){
        this.arr.pop()
    }
    printItem(){
        console.log(this.arr) 
    }
}
export default Stack
let arr=new Stack()
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
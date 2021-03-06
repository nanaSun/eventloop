# 我已经迷失在事件环(event-loop)中了【小黑框篇】

我第一次看到他事件环（event-loop）的时候，我是一脸懵，这是什么鬼，是什么循环吗，为什么event还要loop，不是都是一次性的吗？

浏览器中和nodejs环境中的事件环是有一些区别的，这里我只研究了nodejs环境，小黑框情况下的事件环。

这里的事件环并不是指单独一件事件的循环，而是我们写的很多很多的事件按照一定地规则排着队去执行，然后队列清空后继续排队，就是事件环。

事件环很复杂，这里我只有能力解释事件环中的几个点：

* [node.js中对于事件环的解释](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
* 宏任务（macro-task），微任务（micro-task）

## node.js中对于事件环的解释

nodejs中将eventloop分成了:
* timers: 定时器setTimeout执行，将callback加入队列中。
* pending callbacks: 一些I/O的callback，推迟到下一次循环中执行。
* idle, prepare: 内部的一些事件。
* poll: 定时器的callback执行，setImmediate执行，微任务执行。
* check: setImmediate的callback执行。
* close callbacks: 一些callbacks的关闭，如socket。

这边我们专注于timers、poll和check这三个阶段。其他的我们用的不多。

## timers、poll、check阶段

* timers

这个阶段，只执行setTimeout和setInterval，但是他们的callback不会执行，而是推到宏任务的队列之中。

* poll

这个阶段，会先执行符合条件的微任务，比如Promise的异步完成，如果是setImmediate，则只会执行，不执行他的callback，然后执行定时器的callback，比如timeout。这里会适当得暂停一会，看看会不会有新任务进入队列。如果有setImmediate的callback则进入check 阶段，否则回到timer继续新一轮循环。

* check

当poll阶段的队列完成，则会轮到check，这时会执行setImmediate的callback。如果没有需要关闭callbacks，那么就回到timer继续新一轮的循环。

## 宏任务 vs 微任务

* 宏任务
    
从我的角度理解，就是一个正常的task，本来在一个线程中可以毫无波折地一个接着一个运行到最后，奈何每个宏任务执行之后都有可能产生一些微任务，因此很不幸，这些宏任务就要排在这些微任务之后了。

宏任务代表：script(整体代码),setTimeout,setImmediate。

```
/**
output:
我先走一步
你太慢了，我插个队
老司机，等等我
*/
setTimeout(()=>{
    console.log("我先走一步") 
})
setTimeout(()=>{
    console.log("老司机，等等我")
},10)
setImmediate(()=>{
    console.log("你太慢了，我插个队")
})
```

划重点

setTimeout和setImmediate，触发的阶段不同，因此callback执行时间也不同。但是如果setTimeout的时间过长，那么系统会先执行setImmediate，然后等下一轮询中，如果setTimeout到时间了，那么就运行setTimeout的callbacks。

* 微任务

就是宏任务执行时，产生的新的小任务，比如异步，此类任务称之为微任务，一般在当前宏任务执行完之后“插队”执行。

微任务代表：process.nextTick, Promise(原生)。

划重点

虽然process.nextTick和Promise都是微任务，但是他们的执行的先后顺序是不一样的。无论谁的代码先执行，等到了poll阶段，两者都是可运行的状态时，都是nextTick先于Promise执行。

```
/**
output:
本宫始终是你望成莫及的
总有一日，我会上位
*/
Promise.resolve().then(()=>{
    console.log("总有一日，我会上位") 
})
process.nextTick(()=>{
    console.log("本宫始终是你望成莫及的") 
})
```

后记：
我只写了我对于eventloop的理解，但是还有很多云里雾里的地方，写出来的只是我理解的。
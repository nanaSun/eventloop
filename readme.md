# eventloop

我第一次看到他事件环（event-loop）的时候，我是一脸懵，这是什么鬼，是什么循环吗，为什么event还要loop，不是都是一次性的吗？

这里的事件环并不是指单独一件事件的循环，而是我们写的很多很多的事件按照一定地规则排着队去执行，这个排队的过程就是事件环。

在了解事件环之前，有几个知识点我们需要科普下：

* 宏任务（macro-task），微任务（micro-task）
* 队列（queue），栈（stack）

### 宏任务 vs 微任务

宏任务：从我的角度理解，就是一个正常的task，本来在一个线程中可以毫无波折地一个接着一个运行到最后，奈何每个宏任务执行之后都有可能产生一些微任务，因此很不幸，这些宏任务就要排在这些微任务之后了。
代表代码：script(整体代码),setTimeout,setImmediate,I/O,UI rendering。

微任务：就是宏任务执行时，产生的新的小任务，比如异步，此类任务称之为微任务，一般在当前宏任务执行完之后“插队”执行。
代表代码：process.nextTick, Promise(原生)，Object.observe，MutationObserver。





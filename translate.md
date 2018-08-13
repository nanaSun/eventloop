# Node.js事件环，定时器，和`process.nextTick()`

## 什么是事件环

事件环就是让Node.js可以执行非阻塞I/O操作——尽管Javascript是单线程——只要有可能就从系统内核之中卸载操作。
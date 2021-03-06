---
layout: post
title: 《重构》Refactoring
tags: [software,SE,软件工程,重构]
category: Read
---

![Refactoring](/img/post/refactoring.jpg)以前上学的时候其实大概读过这本书，但是那时没有什么项目经验，对于重构还很难理解其意义，最近因为又读了一遍这本书，发现确实是很棒的一本书，虽然现在写javascript，而这本书是以java为基础的，但仍然有很多值得参考的地方，尤其是一些常见的重构手法，让人看的时就会觉得对对对，确实经常这么干，比如Extract method还有Replace array with object等等都可以应用到其他环境中。

阅读这本书最重要的首先是需要理解的是什么是重构，以前也自诩会定期重构代码，但现在想想，其实真正算作重构的时候并不多，大部分时候我们其实只是在重写，只是因为项目规模较小，所以许多问题并没有暴露出来罢了。

先看看重构的定义：“*对软件内部结构的一种调整，目的是在***不改变软件可观察行为***的前提下，提高其可理解性，降低其修改成本*”
<!-- more -->
也许有时候可以用一下午的时间把整个程序重写一边，但在它们臃肿到你可能需要更长时间甚至无法理解时，重写变的越来越遥不可及，最后只会更加臃肿不堪。所以重构与重写最大的区别，我认为应该是不改变软件可观察行为这一要素。另外它的目的或者说动机也就是要解决程序的无限膨胀，让程序变得更有可读性。

重构手法不一定是在重构的时候使用，或者说重构无处不在，有时它也像是一种指导原则，比如什么时候应该使用继承，什么时候应该合并继承。它是动态的，重构手法的运用必须结合实际情况，所以有Pull up method 也有Push down method。情况在变化，代码也必须跟上这种变化。

所以其实Javascript或者说前端开发是很需要重构的，因为前端开发的需求变化是最频繁的，情况也是各种各样。尤其是Javascript过于松散，只能靠代码规范去加强结构和可读性。但是书中很多重构手法仅限于面向对象的开发，还有一些Java的特性，比如Replace conditional with polymorphism，在Javascript中类似多态的机制就是用条件语句判断参数类型实现的。


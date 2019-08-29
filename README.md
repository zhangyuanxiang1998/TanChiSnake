# 贪吃蛇

## 功能实现

### 搭建页面
放一个容器盛放游戏场景 div#map，设置样式

### 分析对象

* 食物对象
* 蛇对象
* 游戏对象

### 创建食物对象
* Food
  * 属性
    * x
    * y
    * width
    * height
    * color
  * 方法
    * render   随机创建一个食物对象，并渲染到map上
### 创建蛇对象
* Snake
  * 属性
    * width 蛇节的宽度
    * height 蛇节的高度
    * body 数组，蛇的头部和身体，第一个位置是蛇头
    * direction 蛇运动的方向
  * 方法
    * render   把蛇渲染到map上
    * move   控制蛇在map上移动
### 创建游戏对象
* Game
  * 属性
    * food 食物对象
    * snake 蛇对象
    * map 地图
  * 方法
    * start   开始游戏（绘制所有游戏对象）

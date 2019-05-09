// 设定广场的位置
var BASE_X_POINT = 200;
var BASE_Y_POINT = 200;

// 宽高系数
var XLEN = 20;
var YLEN = 20;

// 方块宽度
var SQUAREWIDTH = 20;


// 基类
function Square(x, y, width, height, dom) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.viewContent = dom || document.createElement('div');
}
Square.prototype.touch = function() {
  console.log('touch');
}
Square.prototype.update = function(x, y) {
  this.x = x;
  this.y = y;
}

// 地板方块 橙色
var Floor = tool.extend(Square);

// 障碍物 黑色
var Stone = tool.extend(Square);

// 食物 绿色
var Food = tool.single(Square);

// 蛇头 红色
var SnakeHead = tool.single(Square);

// 蛇头 蓝色
var SnakeBody = tool.extend(Square);

// 广场
var Ground = tool.single(Square);

// 逻辑单例
var Snake = tool.single();
var Game = tool.single();

var DIRECTIONS = {
  LEFT: {
    x: -1,
    y: 0
  },
  RIGHT: {
    x: 1,
    y: 0
  },
  UP: {
    x: 0,
    y: -1
  },
  DOWN: {
    x: 0,
    y: 1
  }
}

var STRATEGIES = {
  move: 'MOVE',
  eat: 'EAT',
  die: 'DIE'
}
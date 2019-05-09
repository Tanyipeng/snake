function SquareFactory() {

}

SquareFactory.create = function(type, x, y, color) {
  if(typeof SquareFactory.prototype[type] !== 'function') {
    throw 'no this type: ' + type;
  }

  if(SquareFactory.prototype[type].prototype.__proto__ !== SquareFactory.prototype) {
    SquareFactory.prototype[type].prototype = SquareFactory.prototype;
  }

  var newSquare = new SquareFactory.prototype[type](x, y, color);
  return newSquare;
}

SquareFactory.prototype.init = function(square, color, touchType) {
  square.viewContent.style.position = 'absolute';
  square.viewContent.style.left = square.x * square.width + 'px';
  square.viewContent.style.top = square.y * square.height + 'px';
  square.viewContent.style.width = square.width + 'px';
  square.viewContent.style.height = square.height + 'px';
  square.viewContent.style.backgroundColor = color;
  
  square.touch = function() {
    return touchType;
  }
}

SquareFactory.prototype.Floor = function (x, y, color) {
  var floor = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH);
  this.init(floor, color, STRATEGIES.move);
  return floor;
}

SquareFactory.prototype.Stone = function (x, y, color) {
  var stone = new Stone(x, y, SQUAREWIDTH, SQUAREWIDTH);
  this.init(stone, color, STRATEGIES.die);
  return stone;
}

SquareFactory.prototype.Food = function (x, y, color) {
  var food = new Food(x, y, SQUAREWIDTH, SQUAREWIDTH);
  food.update(x, y);
  this.init(food, color, STRATEGIES.eat);
  return food;
}

SquareFactory.prototype.SnakeHead = function (x, y, color) {
  var snh = new SnakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH);
  snh.update(x, y);
  this.init(snh, color, STRATEGIES.die);
  return snh;
}

SquareFactory.prototype.SnakeBody = function (x, y, color) {
  var snb = new SnakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH);
  this.init(snb, color, STRATEGIES.die);
  return snb;
}
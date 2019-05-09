var snake = new Snake();

snake.init = function () {
  var snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'red');
  var snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'blue');
  var snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'blue');
  this.head = snakeHead;
  this.tail = snakeBody2;
  this.direction = DIRECTIONS.RIGHT;

  snakeHead.prev = null;
  snakeHead.next = snakeBody1;
  snakeBody1.prev = snakeHead;
  snakeBody1.next = snakeBody2;
  snakeBody2.prev = snakeBody1;
  snakeBody2.next = null;

  oG.remove(3, 1);
  oG.append(snakeHead);

  oG.remove(2, 1);
  oG.append(snakeBody1);

  oG.remove(1, 1);
  oG.append(snakeBody2);
}

snake.strategies = {
  MOVE: function (nextSquare, snake, oG, eat) {
    var newSnakeBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'blue');
    newSnakeBody.next = snake.head.next;
    newSnakeBody.next.prev = newSnakeBody;
    newSnakeBody.prev = snake.head;
    snake.head.next = newSnakeBody;
    oG.remove(snake.head.x, snake.head.y);
    oG.append(newSnakeBody);
    // 更新位置
    SquareFactory.create('SnakeHead', nextSquare.x, nextSquare.y, 'red');
    oG.remove(nextSquare.x, nextSquare.y);
    oG.append(snake.head);

    if (!eat) {
      var tail = snake.tail.prev;
      var newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'orange');
      oG.remove(snake.tail.x, snake.tail.y);
      oG.append(newFloor);
      snake.tail = tail;
    }
  },
  EAT: function (nextSquare, snake, oG) {
    this.MOVE(nextSquare, snake, oG, true);
    oG.createFood();
    oGame.progress.add();
    oGame.progress.render();
  },
  DIE: function () {
    oGame.over();
    alert('over');
    oGame.init();
  }
}

snake.move = function (oG) {
  var nextSquare = oG.SquareTable[this.head.x + this.direction.x][this.head.y + this.direction.y]
  this.strategies[nextSquare.touch()](nextSquare, snake, oG);
}

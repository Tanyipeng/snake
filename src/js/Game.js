var oGame = new Game();

oGame.progress = {
  el: document.getElementsByClassName('score')[0],
  score: 0,
  init: function () {
    this.score = 0;
    this.render();
  },
  add: function () {
    this.score++;
  },
  render: function () {
    this.el.innerText = this.score;
  }
};
oGame.snake = snake;
oGame.oGround = oG;
oGame.timer = null;
oGame.interval = 200;
oGame.judgeDir = function (e) {
  var dir = e.which;
  if (dir === 37 && self.snake.direction !== DIRECTIONS.RIGHT) {
    self.snake.direction = DIRECTIONS.LEFT;
  } else if (dir === 38 && self.snake.direction !== DIRECTIONS.DOWN) {
    self.snake.direction = DIRECTIONS.UP;
  } else if (dir === 39 && self.snake.direction !== DIRECTIONS.LEFT) {
    self.snake.direction = DIRECTIONS.RIGHT;
  } else if (dir === 40 && self.snake.direction !== DIRECTIONS.UP) {
    self.snake.direction = DIRECTIONS.DOWN;
  } else {
    return;
  }
}
oGame.keydown = tool.throttle(oGame.judgeDir, 150);

oGame.init = function () {
  document.onkeydown = function (e) {
    // left 37 up 38 right 39 down 40
    oGame.keydown(e);
  }
  this.oGround.init();
  this.snake.init();
  this.progress.init();;
  this.oGround.createFood();
  this.start();
}

oGame.start = function () {
  var self = this;
  this.timer && clearInterval(this.timer);
  this.timer = setInterval(function () {
    self.snake.move(self.oGround);
  }, this.interval);
}

oGame.over = function () {
  this.timer && clearInterval(this.timer);
}

oGame.init();

oG.createFood = (function () {
  var freeFloorArr = [];
  function getFreeArr(oG, snake) {
    var SquareTable = oG.SquareTable;
    var snakeHead = snake.head;
    var snakeNode = snakeHead;
    var _freeFloorArr = [];
    var snakeArr = [];
    while (snakeNode) {
      snakeArr.push(snakeNode);
      snakeNode = snakeNode.next;
    };
    SquareTable.forEach(function (col, i) {
      if(i !== 0 && i !== XLEN - 1) {
        col.forEach(function (item, j) {
          if (j !== 0 && j !== YLEN - 1 && snakeArr.indexOf(item) === -1) {
            _freeFloorArr.push(item);
          }
        })
      }
    });
    return _freeFloorArr;
  }
  return function () {
    freeFloorArr = getFreeArr(oG, snake);
    var len = freeFloorArr.length;
    var randomNum = Math.floor(Math.random() * len);
    var floorSquare = freeFloorArr[randomNum];
    var foodSquare = SquareFactory.create('Food', floorSquare.x, floorSquare.y, 'green');
    this.remove(floorSquare.x, floorSquare.y);
    this.append(foodSquare);
  }
})()

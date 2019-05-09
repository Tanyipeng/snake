var oG = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUAREWIDTH, YLEN * SQUAREWIDTH);

oG.init = function() {
  this.viewContent.style.position = 'absolute';
  this.viewContent.style.backgroundColor = '#ff0';
  this.viewContent.style.left = this.x + 'px';
  this.viewContent.style.top = this.y + 'px';
  this.viewContent.style.width = this.width + 'px';
  this.viewContent.style.height = this.height + 'px';

  this.SquareTable = [];
  var newSquare = null;
  // 列
  for(var i = 0; i < XLEN; i ++) {
    this.SquareTable[i] = new Array(YLEN);
    // 行
    for(var j = 0; j < YLEN; j ++) {
      if(i === 0 || i === XLEN - 1 || j === 0 || j === YLEN - 1) {
        newSquare = SquareFactory.create('Stone', i, j, 'black');
      }else {
        newSquare = SquareFactory.create('Floor', i, j, 'orange');
      }
      this.SquareTable[i][j] = newSquare;
      this.viewContent.appendChild(newSquare.viewContent);
    }
  }
  document.body.appendChild(this.viewContent);
}

oG.remove = function(x, y) {
  var curSquare = oG.SquareTable[x][y];
  oG.viewContent.removeChild(curSquare.viewContent);
  oG.SquareTable[x][y] = null;
}

oG.append = function(square) {
  oG.SquareTable[square.x][square.y] = square;
  oG.viewContent.appendChild(square.viewContent);
}

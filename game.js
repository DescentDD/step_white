//给以下代码添加中文注释

document.addEventListener('DOMContentLoaded', function() {
  // 获取游戏板元素
  const gameBoard = document.getElementById('game-board');
  // 初始化分数
  let score = 0;
  // 游戏结束标志
  let isGameOver = false;

  // 创建一个div元素
  function createGameRow() {
    // 创建一个div元素
    const gameRow = document.createElement('div');
    // 添加div元素的class属性
    gameRow.classList.add('game-row');
    
    //j=random(0,3),i mean,j=0,1,2,3,one of them
    // 随机生成一个0-3的整数
    const j = Math.floor(Math.random() * 4);
    for (let i = 0; i < 4; i++) {
      // 创建一个div元素
      const gameTile = document.createElement('div');
      // 添加div元素的class属性
      gameTile.classList.add('game-tile');
      //if i=j,then add black class
      // 如果i等于j，则添加black类
      if (i === j) {
        gameTile.classList.add('black');
      }
      gameRow.appendChild(gameTile);
    }
    gameBoard.insertBefore(gameRow, gameBoard.firstChild);
  }


  function updateGameBoard() {
    
    const gameRows = document.querySelectorAll('.game-row');
      createGameRow();
      //if gameRows out the window,then remove the last one
      // 如果gameRows超出窗口，则移除最后一个
      if (gameRows.length > 5) {
        gameBoard.removeChild(gameRows[gameRows.length - 1]);
      }


  }


  function handleTileClick(event) {
    // 如果游戏结束，则不执行任何操作
    if (isGameOver) {
      return;
    }
    // 获取点击的div元素
    const clickedTile = event.target;
    // 如果点击的div元素有黑色像素，则移除黑色像素，添加灰色像素，并计算分数
    if (clickedTile.classList.contains('black')) {
      clickedTile.classList.remove('black');
      clickedTile.classList.add('gray');
      score++;
      // 获取id为score的元素，将score的innerHTML设置为'分数：score'
      const scoreElement = document.getElementById('score');
      scoreElement.innerHTML = '分数：' + score;
      // 调用updateGameBoard函数
      updateGameBoard();
    } else {
      // 如果点击的div元素没有黑色像素，则游戏结束，弹出提示框，并计算分数
      //把点击到的div元素变成红色
      clickedTile.classList.add('red');
      isGameOver = true;
    }
  }

  // 开始游戏
  function startGame() {
    // 监听点击游戏板元素时触发的事件
    gameBoard.addEventListener('click', handleTileClick);
    // 循环调用createGameRow函数10次
    for (let i = 0; i < 10; i++) {
      createGameRow();
    }
    //添加一个计时器，倒计时20秒，并且将倒计时的时间赋值为time。获取id为time的元素，将time的innerHTML设置为'剩余时间：time'。当isGameOver = true;时，清除计时器。
    let time = 20;
    const timer = setInterval(function(){
      const timeElement = document.getElementById('time');
      timeElement.innerHTML = '剩余时间：' + time;
      time--;
      if (time < 0) {
        isGameOver = true;
      }
      if (isGameOver) {
        timeElement.innerHTML ='死了啦都怪你啦！'
        //把time的字体大小改成50px
        timeElement.style.fontSize = '50px';
        //在画面中间添加按钮，显示为“重新开始”，点击后刷新页面，重新执行startGame
        const restartButton = document.createElement('button');
        restartButton.innerHTML = '重新开始';
        restartButton.addEventListener('click', function() {
          window.location.reload();
        });
        document.body.appendChild(restartButton);
        //清除计时器
        clearInterval(timer);
      }
    }
    ,1000);
    
  }


  // 当点击startgame按钮是开始游戏，并且隐藏startgame按钮
  const startButton = document.getElementById('startgame');
  startButton.addEventListener('click', function() {
    startGame();
    startButton.style.display = 'none';
  }
  );
  
});
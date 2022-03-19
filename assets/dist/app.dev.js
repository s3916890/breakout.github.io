"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// JAVASCRIPT 

/**
 * @param [0]: x-Axis
 * @param [1]: y-Axis
 */
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document); // create block

var Block = function Block(xAxis, yAxis) {
  _classCallCheck(this, Block);

  // Width Of Block
  this.bottomLeft = [xAxis, yAxis];
  this.bottomRight = [xAxis + blockWidth, yAxis]; // Height Of Block

  this.topLeft = [xAxis, yAxis + blockHeight];
  this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
};

var scoreDisplay = $('.score');
var grid = $('.grid');
var blockWidth = 100;
var blockHeight = 20;
var ballDiameter = 20;
var timeID;
var xDirection = 2;
var yDirection = 2;
var score = 0;
var userStart = [230, 10];
var currentPosition = userStart;
var ballStart = [270, 40];
var ballCurrentPosition = ballStart;
var boardWidth = 600;
var boardHeight = 300;
var blocks = [new Block(10, 270), new Block(120, 270), new Block(230, 270), new Block(340, 270), new Block(450, 270), new Block(10, 240), new Block(120, 240), new Block(230, 240), new Block(340, 240), new Block(450, 240), new Block(10, 210), new Block(120, 210), new Block(230, 210), new Block(340, 210), new Block(450, 210)]; // console.log(blocks)
// add block

function addBlock() {
  for (var i = 0; i < blocks.length; i++) {
    var block = document.createElement('div');
    block.classList.add('block');
    block.style.left = blocks[i].bottomLeft[0] + 'px';
    block.style.bottom = blocks[i].bottomLeft[1] + 'px';
    grid.appendChild(block);
  }
} // Run addBlock()


addBlock(); // Add user 

var user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user); // draw the user 

function drawUser() {
  user.style.left = currentPosition[0] + 'px';
  user.style.bottom = currentPosition[1] + 'px';
} // draw the ball 


function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px';
  ball.style.bottom = ballCurrentPosition[1] + 'px'; // console.log(ballCurrentPosition[0])
  // console.log(ballCurrentPosition[1])
} // move user 


function moveUser(event) {
  switch (event.key) {
    case 'ArrowLeft':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        console.log(currentPosition[0]);
        drawUser();
      }

      break;

    case 'ArrowRight':
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        console.log(currentPosition[0]);
        drawUser();
      }

      break;
  }
} // when user key down, the userControlKeyboard will execute


function userControlKeyBoard(callback) {
  document.addEventListener('keydown', callback);
}

userControlKeyBoard(moveUser);
var ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

timeID = setInterval(moveBall, 30); // Check for collisions

function checkForCollisions() {
  // check for BLOCK collisions 
  for (var i = 0; i < blocks.length; i++) {
    if (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0] && ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]) {
      // console.log(ballDiameter);
      // console.log(blocks[i].bottomLeft[0]);
      // console.log(blocks[i].bottomRight[0]);
      // console.log(blocks[i].topLeft[1]);
      // console.log(ballCurrentPosition[0]);
      // console.log(ballCurrentPosition[1]);
      var allBlocks = Array.from($$('.block')); // console.log(allBlocks);

      allBlocks[i].classList.remove('block'); // REMOVE ONLY 1 ITEM

      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.textContent = score;
      scoreDisplay.style.visibility = 'visible'; // console.log(score)
    }
  } // check for WALL collisions if the ball overflow the wall including left,right,top,bottom


  if (ballCurrentPosition[0] >= boardWidth - ballDiameter || ballCurrentPosition[1] >= boardHeight - ballDiameter || ballCurrentPosition[0] <= 0) {
    // console.log(boardWidth - ballDiameter);
    changeDirection();
  } // Check for USER collisions


  if ( // ballCurrentPosition[0] > currentPosition[0] : set arrange only in blocks along with her's width
  // ballCurrentPosition[0] < currentPosition[0] + blockWidth : Prevent the overflow of the ball
  ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth && ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight) {
    // console.log(ballCurrentPosition[0]);
    // console.log(currentPosition[0]);
    // console.log(currentPosition[0] + blockWidth);
    // console.log(ballCurrentPosition[1]);
    // console.log(currentPosition[1]);
    // console.log(currentPosition[1] + blockHeight);
    changeDirection();
  } // check for win 


  if (blocks.length === 0) {
    clearInterval(timeID);
    scoreDisplay.innerHTML = 'Congratulation !!!!! You won ❤️';
    document.removeEventListener('keydown', moveUser);
  } // check for game over


  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timeID);
    scoreDisplay.innerHTML = 'Sorry, you lose 😭. Better luck next time ❤️';
    document.removeEventListener('keydown', moveUser);
  }
} // Change the direction of the ball


function changeDirection() {
  // The ball will be changed the direction as well as the CYCLE 
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }

  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }

  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }

  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
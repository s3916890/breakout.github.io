// JAVASCRIPT 
/**
 * @param [0]: x-Axis
 * @param [1]: y-Axis
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// create block
class Block{
    constructor(xAxis, yAxis){
        // Width Of Block
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        // Height Of Block
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

const scoreDisplay = $('.score');
const grid = $('.grid');

const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;

let timeID;

let xDirection = 2;
let yDirection = 2;

let score = 0;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

const boardWidth = 600;
const boardHeight = 300;


const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),

]

// console.log(blocks)

// add block
function addBlock(){
    for (let i = 0 ; i < blocks.length ; i++){
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        
        grid.appendChild(block);
    }
}
// Run addBlock()
addBlock();

// Add user 
const user = document.createElement('div');
user.classList.add('user');
drawUser()
grid.appendChild(user);

// draw the user 
function drawUser(){
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

// draw the ball 
function drawBall(){
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';

    // console.log(ballCurrentPosition[0])
    // console.log(ballCurrentPosition[1])
}
// move user 
function moveUser(event){
    switch(event.key){
        case 'ArrowLeft':
            if (currentPosition[0] > 0){
                currentPosition[0] -= 10; 
                console.log(currentPosition[0]);
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth){
                currentPosition[0] += 10;
                console.log(currentPosition[0])
                drawUser()
            }
            break;
    }
}
// when user key down, the userControlKeyboard will execute
function userControlKeyBoard(callback){
    document.addEventListener('keydown', callback);
}

userControlKeyBoard(moveUser);

const ball = document.createElement('div');
ball.classList.add('ball');
drawBall()
grid.appendChild(ball);

function moveBall(){
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall()
    checkForCollisions()
}

timeID = setInterval(moveBall, 30);

// Check for collisions
function checkForCollisions(){
    // check for BLOCK collisions 
    for (let i = 0 ; i < blocks.length ; i++){
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) 
            &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        )
        {
            // console.log(ballDiameter);
            // console.log(blocks[i].bottomLeft[0]);
            // console.log(blocks[i].bottomRight[0]);
            // console.log(blocks[i].topLeft[1]);

            // console.log(ballCurrentPosition[0]);
            // console.log(ballCurrentPosition[1]);
            const allBlocks = Array.from($$('.block'));
            // console.log(allBlocks);
            allBlocks[i].classList.remove('block');
            // REMOVE ONLY 1 ITEM
            blocks.splice(i, 1);
            changeDirection();
            score++;
            scoreDisplay.textContent = score;
            scoreDisplay.style.visibility = 'visible';
            // console.log(score)
        }
    }
    // check for WALL collisions if the ball overflow the wall including left,right,top,bottom
    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) || 
        ballCurrentPosition[0] <= 0
        ){
        // console.log(boardWidth - ballDiameter);
        changeDirection()
    }

    // Check for USER collisions
    if (
        // ballCurrentPosition[0] > currentPosition[0] : set arrange only in blocks along with her's width
        // ballCurrentPosition[0] < currentPosition[0] + blockWidth : Prevent the overflow of the ball
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth)
        &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    )
    {   
        // console.log(ballCurrentPosition[0]);
        // console.log(currentPosition[0]);
        // console.log(currentPosition[0] + blockWidth);

        // console.log(ballCurrentPosition[1]);
        // console.log(currentPosition[1]);
        // console.log(currentPosition[1] + blockHeight);

        changeDirection();
    }

    // check for win 
    if (blocks.length === 0){
        clearInterval(timeID);
        scoreDisplay.innerHTML = 'Congratulation !!!!! You won ❤️';
        document.removeEventListener('keydown', moveUser);
    }
    // check for game over
    if (ballCurrentPosition[1] <= 0){
        clearInterval(timeID);
        scoreDisplay.innerHTML = 'Sorry, you lose 😭. Better luck next time ❤️';
        document.removeEventListener('keydown', moveUser);
    }
}

// Change the direction of the ball
function changeDirection(){
    // The ball will be changed the direction as well as the CYCLE 
    if (xDirection === 2 && yDirection === 2){
        yDirection = -2;
        return 
    }
    if (xDirection === 2 && yDirection === -2){
        xDirection = -2;
        return 
    }
    if (xDirection === -2 && yDirection === -2){
        yDirection = 2;
        return 
    }
    if (xDirection === -2 && yDirection === 2){
        xDirection = 2;
        return 
    }

}

//to be able to adequately understand how this snake game works, first off the canvax allows for graphical activities to be performed in the scripts as things could be drawn there. and so its more like a graph sheet with rows(X) and cols(Y) axis where y stands for the top and the bottom and then x stands for left and right. now y downward is +ive while Y upwards is -ive. also x left is +ive and x right is -ive. so here we are specifying our boxsize to be 25 across ie for instance in a graph sheet each unit be 25.the getContext is an object used in styling the canvax and it includes in it fonts,and some other basic graphics styles. the fillStyle and the FillRect goes hand in hand because the FillStyle specifies the color while the fllRect specifies wherethis colors should apply.Also important to note is that the fillrect has four values (the x&y cordinates and the width and height cordinates//
//once we math.random(math.floor) food X&Y, then we this we could then remove the specific value that we have allocated to foodX and foodY  since it would now be working on random numbers now. it is also very important to note that you then have to place the placeFood () before the update() to aviod placefood from going behind sha and then we could go on and create a placFood function

// the keyup listens for activities within the arrowup,down,left or right.





//for Board
let oneUnit = 24;
let rows = 20;
let cols = 20;
let board;
let context;

//Snake
let snakeX = oneUnit * 5;
let snakeY = oneUnit * 5;
//for snake movement 
let velocityX = 0;
let velocityY = 0;

//snakegrowth is an array
let snakeBody = []

//food
let foodX;
let foodY;
// let foodX = oneUnit * 10;
// let foodY = oneUnit * 10;

let gameOver = false;

window.onload = function () {
    board = document.getElementById("board")
    board.height = rows * oneUnit;
    board.width = cols * oneUnit;
    context = board.getContext("2d")

    placeFood()
    document.addEventListener("keyup", changeDirection);
    // update()
    setInterval(update, 1000 / 10);//100ms

}
function update() {
    if (gameOver) {
        return;
    }
    context.fillStyle = "black"
    context.fillRect(0, 0, board.width, board.height)

    context.fillStyle = "red"
    context.fillRect(foodX, foodY, oneUnit, oneUnit)
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood()
    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];

    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    //the if statement above is used to allow something happen when the snake eats the food thats when snake and food is in the same square and the for kind of starts from the bottom so that it could adjust to carry the other part of the snake sha.And the second if statement concludes this additions, it means that if snakebody is growing it is growing with the head. which is [snakeX, snakeY] 
    //which ever element we add first behaves like a Zindex kind of 
    context.fillStyle = "lime"
    snakeX += velocityX * oneUnit;
    snakeY += velocityY * oneUnit;
    context.fillRect(snakeX, snakeY, oneUnit, oneUnit)
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], oneUnit, oneUnit)

    }
    //gameOver conditions
    if (snakeX < 0 || snakeX > cols * oneUnit || snakeY < 0 || snakeY > rows * oneUnit) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }

    }
}
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }

    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}
// Also given that the velocity! would check to see that the snake cannot go back and forth  
//given that the food would be randomly placed it is important that we create a function that would randomly chose locations for this food.
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * oneUnit;
    foodY = Math.floor(Math.random() * rows) * oneUnit;

}
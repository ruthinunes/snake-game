const canvasElement = document.querySelector("#game-board");
const context = canvasElement.getContext("2d");
const snakeSize = 5;
const gridSize = 6;

let snake = [];
let food = {};
let score = 0;
let direction = '';
let gameLoopInterval = '';

function startGame() {

    direction = "right";
    document.addEventListener("keydown", changeDirection);
    gameLoopInterval = setInterval(gameLoop, 1000 / 10);
    gameLoop();
};

function createSnake() {

    // starts snake from the center
    const centerX = Math.floor(canvasElement.width / gridSize / 2);
    const centerY = Math.floor(canvasElement.height / gridSize / 2);

    for (let i = 0; i < snakeSize; i++) {
        snake.push({ x: centerX - i, y: centerY });
    };
};

function createFood() {
    food = {
        x: Math.floor(Math.random() * (canvasElement.width / gridSize)),
        y: Math.floor(Math.random() * (canvasElement.height / gridSize)),
    };
};

function drawSnake() {
    snake.forEach(function (segment) {
        context.fillStyle = '#d0e392';
        context.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
};

function drawFood() {
    context.fillStyle = "#f6c8c4";
    context.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
};

function changeDirection(e) {
    const downKeyCode = 40;
    const upKeyCode = 38;
    const rightKeyCode = 39;
    const leftKeyCode = 37;

    if (e.keyCode === leftKeyCode && direction !== "right") {
        direction = "left";
    } else if (e.keyCode === upKeyCode && direction !== "down") {
        direction = "up";
    } else if (e.keyCode === rightKeyCode && direction !== "left") {
        direction = "right";
    } else if (e.keyCode === downKeyCode && direction !== "up") {
        direction = "down";
    };
};

function clearCanvas() {
    context.clearRect(0, 0, canvasElement.width, canvasElement.height);
};

// Move the snake's head according to the direction and add it to the front of the snake array.
function moveSnake() {
    const head = {
        x: snake[0].x + (direction === "right" ? 1 : direction === "left" ? -1 : 0),
        y: snake[0].y + (direction === "down" ? 1 : direction === "up" ? -1 : 0),
    };

    snake.unshift(head);
    // Check if snake has eaten food or pop last segment
    if (head.x === food.x && head.y === food.y) {
        score += 5;
        createFood();
    } else {
        snake.pop();
    }
};

function gameLoop() {
    moveSnake();
    clearCanvas();
    checkCollision();
    drawSnake();
    drawFood();
};

function checkCollision() {
    if (snake[0].x < 0 || snake[0].x >= canvasElement.width / gridSize || snake[0].y < 0 || snake[0].y >= canvasElement.height / gridSize) {
        clearInterval(gameLoopInterval);
        alert(`Game over! You scored ${score} points.`);
    };

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            clearInterval(gameLoopInterval);
            alert(`Game over! You scored ${score} points.`);
        };
    };
};

function pauseGame() {
    clearInterval(gameLoopInterval);
};

function resetGame() {
    snake = [];
    food = {};
    score = 0;
    direction = '';
    gameLoopInterval = '';

    clearCanvas();
    createSnake();
    createFood();
};

document.querySelector('#play').addEventListener('click', startGame);
document.querySelector('#pause').addEventListener('click', pauseGame);
document.querySelector('#reset').addEventListener('click', resetGame);

window.addEventListener('DOMContentLoaded', function () {
    createSnake();
    createFood();
    drawSnake();
    drawFood();
});
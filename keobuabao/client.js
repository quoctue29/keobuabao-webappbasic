// client.js
import { drawRoundedRect, drawMenu, drawComputerGame, drawMultiplayerGame } from './drawFunctions.js';
import { calculateResult, handlePlayAgainOrBack, handleClickMultiplayer, handleClick } from './gameLogic.js';
import { connectToServer } from './socket.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameMode = { mode: '' };
let playerScore = { score: 0 };
let opponentScore = { score: 0 };
let isTransitioning = false;

// canvas.addEventListener('click', (event) => handlePlayAgainOrBack(event, ctx, canvas, drawMenu, drawComputerGame, playerScore, opponentScore));
canvas.addEventListener('click', function(event) {
    if (isTransitioning) return;

    const x = event.offsetX;
    const y = event.offsetY;

    if (gameMode.mode === '') {
        if (x > 100 && x < 300 && y > 200 && y < 250) {
            drawMenu(ctx, 'play');
            gameMode.mode = 'computer';
            isTransitioning = true;
            setTimeout(() => {
                drawComputerGame(ctx, playerScore.score, opponentScore.score);
                isTransitioning = false;
            }, 600);
        } else if (x > 100 && x < 300 && y > 300 && y < 350) {
            drawMenu(ctx, 'multiplayer');
            isTransitioning = true;
            setTimeout(() => {
                connectToServer(gameMode, startMultiplayerGame, drawMenu, canvas, ctx, playerScore, opponentScore);
                isTransitioning = false;
            }, 600);
        }
    } else if (gameMode.mode === 'computer') {
        handleClick(event, ctx, canvas, playerScore, opponentScore, gameMode);
    } else if (gameMode.mode === 'multiplayer') {
        handleClickMultiplayer(event, ctx, canvas);
    }
});

function startMultiplayerGame() {
    drawMultiplayerGame(ctx, playerScore.score, opponentScore.score);
    canvas.addEventListener('click', (event) => handleClickMultiplayer(event, ctx, canvas));
}

drawMenu(ctx);

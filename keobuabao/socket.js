// socket.js
import { drawRoundedRect } from './drawFunctions.js';
import { handlePlayAgainOrBack } from './gameLogic.js'; 

let socket;

export function connectToServer(gameMode, startMultiplayerGame, drawMenu, canvas, ctx, playerScore, opponentScore) {
    socket = new WebSocket('ws://localhost:8080');

    socket.onopen = function() {
        console.log('Connected to server');
        gameMode.mode = 'multiplayer';  
        gameMode.playerChoice = null;
        gameMode.opponentChoice = null;
        playerScore.score = 0;
        opponentScore.score = 0;
    };

    socket.onmessage = function(event) {
        handleMessage(event, startMultiplayerGame, drawMenu, canvas, ctx, playerScore, opponentScore, gameMode);
    };

    socket.onclose = function() {
        console.log('Disconnected from server');
    };

    socket.onerror = function(error) {
        console.error('WebSocket Error: ' + error);
    };
}

function handleMessage(event, startMultiplayerGame, drawMenu, canvas, ctx, playerScore, opponentScore, gameMode) {
    const data = JSON.parse(event.data);

    if (data.type === 'startGame') {
        console.log('Game starting!');
        startMultiplayerGame();
    }

    if (data.type === 'result') {
        const { playerChoice, opponentChoice, result } = data;

        gameMode.playerChoice = playerChoice;
        gameMode.opponentChoice = opponentChoice;
        
        if (result === 'Win') {
            playerScore.score++;
        } else if (result === 'Lose') {
            opponentScore.score++;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ff8c00';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Score: You: ${playerScore.score} - Opponent: ${opponentScore.score}`, canvas.width / 2, 50);
        ctx.fillText(`Bạn chọn: ${playerChoice}`, canvas.width / 2, 100);
        ctx.fillText(`Đối thủ chọn: ${opponentChoice}`, canvas.width / 2, 150);
        ctx.fillText(result, canvas.width / 2, 200);

        drawRoundedRect(ctx, 10, 500, 200, 50, 15, '#0f0', '#000');
        ctx.fillStyle = '#fff';
        ctx.fillText('Play Again', 110, 525);
        
        drawRoundedRect(ctx, 220, 500, 100, 50, 15, '#f00', '#000');
        ctx.fillStyle = '#fff';
        ctx.fillText('Back', 270, 525);

        canvas.removeEventListener('click', handlePlayAgainOrBack);
        canvas.addEventListener('click', (event) => handlePlayAgainOrBack(event, canvas, ctx, gameMode, playerScore, opponentScore, startMultiplayerGame));
    }
}

export function sendPlayerMove(choice) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'move', choice }));
    }
}

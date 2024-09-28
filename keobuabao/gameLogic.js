// gameLogic.js
import { drawComputerGame, drawMenu, drawRoundedRect, highlightChoice } from './drawFunctions.js';
import { sendPlayerMove } from './socket.js';

export function calculateResult(playerChoice, computerChoice) {
    const outcomes = {
        'Keo': { 'Keo': 'Draw', 'Bua': 'Lose', 'Bao': 'Win' },
        'Bua': { 'Keo': 'Win', 'Bua': 'Draw', 'Bao': 'Lose' },
        'Bao': { 'Keo': 'Lose', 'Bua': 'Win', 'Bao': 'Draw' }
    };
    return outcomes[playerChoice][computerChoice];
}
export function handleClick(event, ctx, canvas, playerScore, opponentScore, gameMode) {
    const x = event.offsetX;
    const y = event.offsetY;
    let playerChoice = '';

    if (x > 100 && x < 300 && y > 200 && y < 250) {
        playerChoice = 'Keo';
        highlightChoice(ctx, 100, 200, 200, 50);
    } else if (x > 100 && x < 300 && y > 300 && y < 350) {
        playerChoice = 'Bua';
        highlightChoice(ctx, 100, 300, 200, 50);
    } else if (x > 100 && x < 300 && y > 400 && y < 450) {
        playerChoice = 'Bao';
        highlightChoice(ctx, 100, 400, 200, 50);
    }

    if (playerChoice !== '') {
        setTimeout(() => {
            const choices = ['Keo', 'Bua', 'Bao'];
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            const result = calculateResult(playerChoice, computerChoice);

            // Hiển thị kết quả
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillText(`Bạn chọn: ${playerChoice}`, canvas.width / 2, 100);
            ctx.fillText(`Máy chọn: ${computerChoice}`, canvas.width / 2, 150);
            ctx.fillText(result, canvas.width / 2, 200);

            if (result === 'Win') {
                playerScore.score++;
            } else if (result === 'Lose') {
                opponentScore.score++;
            }

            drawRoundedRect(ctx, 10, 500, 200, 50, 15, '#0f0', '#000');
            ctx.fillStyle = '#fff';
            ctx.fillText('Play Again', 110, 525);

            drawRoundedRect(ctx, 220, 500, 100, 50, 15, '#f00', '#000');
            ctx.fillStyle = '#fff';
            ctx.fillText('Back', 270, 525);

            canvas.addEventListener('click', (e) => handlePlayAgainOrBack(e, canvas, ctx, gameMode, playerScore, opponentScore));
        }, 300);
    }
}

export function handlePlayAgainOrBack(event, canvas, ctx, gameMode, playerScore, opponentScore, startMultiplayerGame) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (x > 10 && x < 210 && y > 500 && y < 550) {
        canvas.removeEventListener('click', handlePlayAgainOrBack);
        if (gameMode.mode === 'multiplayer') {
            startMultiplayerGame();
        } else if (gameMode.mode === 'computer') {
            drawComputerGame(ctx, playerScore.score, opponentScore.score);
        }
    } else if (x > 220 && x < 320 && y > 500 && y < 550) {
        gameMode.mode = ''; 
        playerScore.score = 0;
        opponentScore.score = 0;
        gameMode.playerChoice = null;
        gameMode.opponentChoice = null;

        canvas.removeEventListener('click', handlePlayAgainOrBack);
        drawMenu(ctx); 
    }
}

export function handleClickMultiplayer(event, ctx, canvas) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (x > 100 && x < 300 && y > 200 && y < 250) {
        highlightChoice(ctx, 100, 200, 200, 50);
        sendPlayerMove('Keo');
    } else if (x > 100 && x < 300 && y > 300 && y < 350) {
        highlightChoice(ctx, 100, 300, 200, 50);
        sendPlayerMove('Bua');
    } else if (x > 100 && x < 300 && y > 400 && y < 450) {
        highlightChoice(ctx, 100, 400, 200, 50);
        sendPlayerMove('Bao');
    }
}

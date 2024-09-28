export function drawRoundedRect(ctx, x, y, width, height, radius, fillColor, strokeColor) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    ctx.fillStyle = fillColor;
    ctx.fill();

    if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
    }
}

export function drawMenu(ctx, clickedButton) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#000';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Kéo Búa Bao', ctx.canvas.width / 2, 100);

    const defaultButtonColor = '#ff4500';
    const clickColor = '#ed8058';

    const playButtonColor = clickedButton === 'play' ? clickColor : defaultButtonColor;
    drawRoundedRect(ctx, 100, 200, 200, 50, 15, playButtonColor, '#000');
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.textBaseline = 'middle';
    ctx.fillText('Play with Computer', 200, 225);

    const multiplayerButtonColor = clickedButton === 'multiplayer' ? clickColor : defaultButtonColor;
    drawRoundedRect(ctx, 100, 300, 200, 50, 15, multiplayerButtonColor, '#000');
    ctx.fillStyle = '#fff';
    ctx.fillText('Multiplayer', 200, 325);
}

export function drawComputerGame(ctx, playerScore, opponentScore) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillText(`Score: ${playerScore} - Computer: ${opponentScore}`, ctx.canvas.width / 2, 50);

    drawRoundedRect(ctx, 100, 200, 200, 50, 15, '#00f', '#000');
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.textBaseline = 'middle';
    ctx.fillText('Kéo', 200, 225);

    drawRoundedRect(ctx, 100, 300, 200, 50, 15, '#00f', '#000');
    ctx.fillStyle = '#fff';
    ctx.fillText('Búa', 200, 325);

    drawRoundedRect(ctx, 100, 400, 200, 50, 15, '#00f', '#000');
    ctx.fillStyle = '#fff';
    ctx.fillText('Bao', 200, 425);

    drawRoundedRect(ctx, 10, 500, 100, 50, 15, '#f00', '#000');
    ctx.fillStyle = '#fff';
    ctx.fillText('Back', 60, 525);
}

export function drawMultiplayerGame(ctx, playerScore, opponentScore) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#000';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Score: You: ${playerScore} - Opponent: ${opponentScore}`, ctx.canvas.width / 2, 50);

    drawRoundedRect(ctx, 100, 200, 200, 50, 15, '#00f', '#000');
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.textBaseline = 'middle';
    ctx.fillText('Kéo', 200, 225);

    drawRoundedRect(ctx, 100, 300, 200, 50, 15, '#00f', '#000');
    ctx.fillStyle = '#fff';
    ctx.fillText('Búa', 200, 325);

    drawRoundedRect(ctx, 100, 400, 200, 50, 15, '#00f', '#000');
    ctx.fillStyle = '#fff';
    ctx.fillText('Bao', 200, 425);
}

export function highlightChoice(ctx, x, y, width, height, radius = 15) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    ctx.fillStyle = 'rgba(235, 145, 94, 0.5)'; 
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const textX = x + width / 2;
    const textY = y + height / 2;

    if (y === 200) {
        ctx.fillText('Kéo', textX, textY);
    } else if (y === 300) {
        ctx.fillText('Búa', textX, textY);
    } else if (y === 400) {
        ctx.fillText('Bao', textX, textY);
    }
}
// export function drawTitleAndScore(ctx, playerScore, opponentScore) {
//     // Vẽ tiêu đề
//     ctx.fillStyle = '#ff4500'; 
//     ctx.font = '40px Arial Bold'; 
//     ctx.textAlign = 'center';
//     ctx.fillText('Rock, Paper, Scissors', ctx.canvas.width / 2, 80);
//     // Vẽ bảng điểm
//     ctx.fillStyle = '#000'; // Màu nổi bật cho bảng điểm
//     ctx.font = '30px Arial'; // Font chữ lớn
//     ctx.fillText(`Score: You: ${playerScore} - Opponent: ${opponentScore}`, ctx.canvas.width / 2, 150);
// }
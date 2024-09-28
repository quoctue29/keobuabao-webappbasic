const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

let clients = [];
let choices = {}; // Lưu lựa chọn của từng người chơi

server.on('connection', (socket) => {
    clients.push(socket);
    console.log('New player connected');
    
    // Kiểm tra nếu đã đủ 2 người chơi
    if (clients.length === 2) {
        console.log('Game starting!');
        clients.forEach(client => {
            client.send(JSON.stringify({ type: 'startGame' }));  // Gửi tín hiệu bắt đầu trò chơi
        });
    }

    // Lắng nghe tin nhắn từ client
    socket.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'move') {
            const playerIndex = clients.indexOf(socket); // Xác định người chơi
            choices[playerIndex] = data.choice;  // Lưu lựa chọn của người chơi

            // Kiểm tra nếu cả hai người chơi đều đã chọn
            if (choices[0] && choices[1]) {
                const result = calculateResult(choices[0], choices[1]);

                // Gửi kết quả cho cả hai người chơi
                clients.forEach((client, index) => {
                    client.send(JSON.stringify({ 
                        type: 'result', 
                        result: result[index], 
                        playerChoice: choices[index],   
                        opponentChoice: choices[1 - index] 
                    }));
                });

                // Không xóa lựa chọn, cho phép chơi nhiều ván
                choices = {}; // Bắt đầu vòng mới
            }
        }
    });

    socket.on('close', () => {
        clients = clients.filter(client => client !== socket);
        console.log('Player disconnected');
    });
});

// Hàm tính toán kết quả
function calculateResult(choice1, choice2) {
    const outcomes = {
        'Keo': { 'Keo': 'Draw', 'Bua': 'Lose', 'Bao': 'Win' },
        'Bua': { 'Keo': 'Win', 'Bua': 'Draw', 'Bao': 'Lose' },
        'Bao': { 'Keo': 'Lose', 'Bua': 'Win', 'Bao': 'Draw' }
    };

    const result1 = outcomes[choice1][choice2];  // Kết quả của người chơi 1
    const result2 = outcomes[choice2][choice1];  // Kết quả của người chơi 2 (ngược lại)

    return [result1, result2];
}

console.log('Server is running on ws://localhost:8080');

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8088});

wss.on("connection", ws => {
    ws.on("message", data => {
        console.log(data);
        const receivedMessage = data.toString('utf8');
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN){
                client.send(receivedMessage);
            }
        })
        console.log("message received", receivedMessage);
    });
});

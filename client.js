let uniqueName;

const entryPage = document.getElementById('entry-page');
const chatContainer = document.getElementById('chat-container');
const msgContainer = document.getElementById('msg-container');
const msgInput = document.getElementById('msg-input-elem');
const sendButton = document.getElementById('send-message-button');
const nameButton = document.getElementById('name-entry-button');
const nameInput = document.getElementById('name-input');

nameButton.addEventListener('click', () => {
    uniqueName = nameInput.value;
    entryPage.style.display = 'none';
    chatContainer.style.display = 'flex';
})
const socket = new WebSocket('ws://192.168.1.3:8088');
socket.addEventListener('open', () => {
    console.log('connected');
});
socket.addEventListener('message', (message) => {
    console.log(message);
    message = JSON.parse(message.data);
    const msgDiv = document.createElement('div');
    const senderDiv = document.createElement('div');
    senderDiv.className = 'chat-sender';
    msgDiv.className = 'chat-messages';
    msgDiv.innerHTML = message.message;
    senderDiv.innerHTML = message.sender;
    msgContainer.append(senderDiv, msgDiv);
})
sendButton.addEventListener('click', () => {
    const msg = msgInput.value;
    msgInput.value = '';
    const div = document.createElement('div');
    div.className = 'chat-messages self-messages';
    div.innerHTML = msg;
    msgContainer.append(div);
    socket.send(JSON.stringify({sender: uniqueName, message: msg}));
})

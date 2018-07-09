var ws = new WebSocket('ws://localhost:5000');
var messageList = document.querySelector('.message-list');
var newMessageForm = document.querySelector('[data-new-message-form]');


var renderMessage = function(message) {
    var li = document.createElement('li');
    li.textContent = message;
    messageList.appendChild(li);
}

ws.addEventListener('message', event => {
    console.log(event.data);
    renderMessage(event.data);
})

newMessageForm.addEventListener('submit', event => {
    event.preventDefault();
    let message = newMessageForm.content.value;
    ws.send(message);
    newMessageForm.reset();
})
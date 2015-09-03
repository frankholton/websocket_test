var ws = new WebSocket('ws://192.168.1.20:8080');
ws.onopen = function(event) {
    send();
};

ws.onmessage = function(message) {
    $('#value').text(message.data);
};

function send() {
 ws.send($('#value').text());   
}
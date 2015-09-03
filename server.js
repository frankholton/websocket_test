var WebsocketServer = require('ws').Server;
var wss = new WebsocketServer({ port: 8080});
var fs = require('fs');
// var index = fs.readFileSync('index.html');

var connect = require('connect');
var serveStatic = require('serve-static')
connect().use(serveStatic('static')).listen(8090);

var value = 0;

function sendUpdate(ws, repeat) {
    value += 1;
    try {
        ws.send(value.toString());
        if (repeat) {
            setTimeout(sendUpdate, 500, ws, true);
        }
    }
    catch(err) {
        console.log(err);
    }
        
}

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        sendUpdate(ws);        
    });
    setTimeout(sendUpdate, 500, ws, true);
});
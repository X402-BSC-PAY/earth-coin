const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// 存储邀请码
const invites = {};

io.on('connection', socket => {
    socket.on('message', data => {
        io.emit('message', { user: data.user, text: data.text, lang: 'EN' });
    });
});

app.post('/invite', express.json(), (req, res) => {
    const { pubkey, code } = req.body;
    invites[code] = pubkey;
    res.send('邀请码记录成功');
});

app.get('/invites', (req, res) => {
    res.json(invites);
});

server.listen(process.env.PORT || 3000);

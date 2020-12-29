const _ = require('lodash');

function getUsers(clients) {
    const connected = clients.connected;
    const listOfUsers = [];

    for (const [key, value] of Object.entries(connected)) {
        listOfUsers.push(value.username)
    }

    return _.compact(listOfUsers);
}

module.exports = function(server) {
    const io = require('socket.io')(server);

    io.on('connection', socket => {
        socket.on('message', msg => {
            io.emit('message', {
                message: msg.message,
                username: socket.username,
                time: msg.time,
            });
        });

        socket.on('add-user', username => {
            socket.username = username;

            socket.broadcast.emit('user-joined', { username: username });
            socket.emit('get-list-of-users');
        });

        socket.on('disconnect', () => {
            if (!socket.username) return;
            socket.emit('user-left', {
                username: socket.username,
            });
        });

        socket.on('get-list-of-users', () => {
            const clients = io.sockets.clients();
            const listOfUsers = getUsers(clients)

            io.emit('list-of-users', listOfUsers);
        });
    });
}

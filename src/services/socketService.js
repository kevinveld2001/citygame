import io from 'socket.io-client';

export function socketInit(userId) {
    const socket = io("ws://" + window.location.host + "/socket.io",{
        transports: ['websocket'],
        query: {userId}
    });
    socket.connect();
    socket.on('test', (data) => {
        console.log("test");
        console.log("test => " + data);
    });
}

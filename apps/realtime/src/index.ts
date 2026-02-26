import { Server } from 'socket.io';
import { createClient } from 'redis';

const io = new Server(3001, { cors: { origin: '*' } });
const redis = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });

(async () => {
    await redis.connect();
    console.log('Realtime service started on port 3001');
})();

io.on('connection', (socket) => {
    console.log('New client connected', socket.id);
});

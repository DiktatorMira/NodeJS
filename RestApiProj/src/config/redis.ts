import { createClient } from 'redis';
import "dotenv/config";

const redisUrl = process.env.REDIS_URL || 'redis://localhost:3600';
export const redisClient = createClient({ url: redisUrl });
redisClient.on('error', (err) => { console.error('Ошибка Redis: ', err); });
(async () => {
    try {
        await redisClient.connect();
        console.log('Подключение к Redis успешно!');
    } catch (err) {
        console.error('Ошибка при подключении к Redis: ', err);
    }
})();
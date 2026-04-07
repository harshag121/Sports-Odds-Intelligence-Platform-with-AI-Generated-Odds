import { createClient } from 'redis';
import { env } from './env.js';

let redisClient: ReturnType<typeof createClient> | null = null;

export function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({ url: env.REDIS_URL });
    redisClient.on('error', () => {
      redisClient = null;
    });
  }

  return redisClient;
}

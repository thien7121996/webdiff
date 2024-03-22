import Redis from 'ioredis';

// Thay thế 'red-cnkk16acn0vc73d770v0:6379' bằng thông tin thực của Redis URI
const redis = new Redis(
  'rediss://red-cnkk16acn0vc73d770v0:wAXaTZIew2tkj0tqBUA2FhVWq80agchy@singapore-redis.render.com:6379'
);

export default redis;

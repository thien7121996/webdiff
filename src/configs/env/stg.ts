import { Config } from '@/types/config';
const config: Config = {
  client: {
    origin: 'http://localhost:4001',
  },
  api: {
    origin: 'http://localhost:4001/api',
  },
  queueServer: { origin: 'https://socket-queue.onrender.com' },
  cookie: {
    domain: '',
  },
};

export default config;

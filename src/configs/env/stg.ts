import { Config } from '@/types/config';
const config: Config = {
  client: {
    origin: 'https://webdiff-lovat.vercel.app',
  },
  api: {
    origin: 'https://webdiff-lovat.vercel.app/api',
  },
  queueServer: { origin: 'https://socket-queue.onrender.com' },
  cookie: {
    domain: '',
  },
};

export default config;

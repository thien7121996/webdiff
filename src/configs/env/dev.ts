import { Config } from '@/types/config';
const config: Config = {
  client: {
    origin: 'http://localhost:3000',
  },
  api: {
    origin: 'http://localhost:3000/api',
  },
  queueServer: { origin: 'http://localhost:3001' },
  cookie: {
    domain: '',
  },
};

export default config;

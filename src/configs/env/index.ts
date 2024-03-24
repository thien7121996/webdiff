import dev from './dev';
import stg from './stg';

const config = () => {
  const env = process.env.ENV;

  switch (env) {
    case 'staging':
      return stg;

    case 'production':
      return {
        client: { origin: 'http://localhost:3000' },
        api: {
          origin: 'http://localhost:3000/api',
        },
        queueServer: { origin: 'http://localhost:3001' },
      };

    default:
      return dev;
  }
};

export default config();

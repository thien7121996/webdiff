import dev from './dev';
import stg from './stg';

const config = () => {
  const env = process.env.ENV;

  switch (env) {
    case 'staging':
      return stg;

    case 'production':
      return {
        client: { origin: 'http://localhost:4001' },
        api: {
          origin: 'http://localhost:4001/api',
        },
        queueServer: { origin: '' },
      };

    default:
      return dev;
  }
};

export default config();

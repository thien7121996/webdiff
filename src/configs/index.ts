import { Config } from '@/types/config';
import dev from './env/dev';

const env = process.env.NEXT_PUBLIC_ENV || 'dev';

const getConfig = (): Config => {
	if (env === 'local') {
		return dev;
	}

	return dev;
};

export default getConfig();

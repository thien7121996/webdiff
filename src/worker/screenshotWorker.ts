import redis from '@/lib/redis';
import { screenShotWorker } from '@/services/screenShot';
import { Worker } from 'bullmq';

const screenshotWorker = new Worker(
	'screenshotQueue',
	async job => {
		const { url } = job.data;

		try {
			// Sử dụng hàm processScreenshot để xử lý việc chụp hình và lưu
			const screenshotResult = await screenShotWorker(url);
		} catch (error) {
			throw error;
		}
	},
	{ connection: redis }
);

export default screenshotWorker;

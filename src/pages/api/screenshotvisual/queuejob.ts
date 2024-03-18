import redis from '@/lib/redis';
import { Queue } from 'bullmq';
import type { NextApiRequest, NextApiResponse } from 'next';
type ResponseData = {
	data?: any;
	message: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if (req.method !== 'GET') {
		res.setHeader('Allow', ['GET']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
	const queue = new Queue('screenshotQueue', { connection: redis });

	try {
		const jobs = await queue.getJobs([
			'wait',
			'active',
			'completed',
			'failed',
			'delayed',
		]);

		res.status(200).json({
			message: 'List Job',
			data: jobs,
		});
	} catch (e) {
		res.status(200).json({ message: 'Something went wrong' });
	}
}

import db from '@/configs/firebase';
import redis from '@/lib/redis';
import { Queue } from 'bullmq';
import { collection, getDocs } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
type ResponseData = {
	data?: any;
	message: string;
};
const queue = new Queue('screenshotQueue', { connection: redis });
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if (req.method !== 'GET') {
		res.setHeader('Allow', ['GET']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	const { projectid } = req.query;

	if (!projectid) {
		res.status(400).json({ message: 'Missing projectId' });
		return;
	}

	try {
		const querySnapshot = await getDocs(
			collection(db, `projects/${projectid}/pageSnapShot`)
		);
		querySnapshot.docs.forEach(async doc => {
			await queue.add(
				'screenshotTask',
				{ url: doc.data().url, idPage: doc.id },
				{
					jobId: doc.id,
					removeOnComplete: true,
					removeOnFail: true,
					attempts: 3,
					backoff: 1000,
					delay: 1000,
					lifo: true,
					priority: 1,
					timestamp: 123456789,
					repeat: { every: 5000 },
				}
			);
		});
		res.status(200).json({
			message: 'Create project success',
			data: querySnapshot.docs.map(doc => doc.data()),
		});
	} catch (e) {
		res.status(200).json({ message: 'Something went wrong' });
	}
}

import redis from '@/lib/redis';
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

	try {
		redis.set('key', 'sssss');
		const value = await redis.get('key');
		res.status(200).json({ message: 'Something went wrong', data: value });
	} catch (e) {
		res.status(200).json({ message: 'Something went wrong' });
	}
}

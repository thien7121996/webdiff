import getConfig from '@/configs';
import db from '@/configs/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
	data?: any;
	message: string;
	id?: string;
};
const nameCollection = 'projects';
const childCollection = 'pageSnapShot';
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if (req.method !== 'GET') {
		res.setHeader('Allow', ['GET']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	const projectId = new URL(req.url!, getConfig.client.origin).searchParams.get(
		'projectid'
	);
	const pageSnapShotId = new URL(
		req.url!,
		getConfig.client.origin
	).searchParams.get('pagesnapshotid');

	// Check if userId or name is not present or is empty
	if (!projectId || !pageSnapShotId) {
		res
			.status(400)
			.json({ message: 'Missing or empty projectId or pageSnapShotId' });
		return; // Stop execution after sending the error response
	}

	try {
		const pagesnapshottDoc = doc(
			db,
			'/projects/' + projectId + '/pageSnapShot/' + pageSnapShotId
		);
		await deleteDoc(pagesnapshottDoc);
		res.status(200).json({
			message: 'Delete pagesnapshot success',
		});
	} catch (e) {
		res.status(200).json({ message: 'Something went wrong' });
	}
}

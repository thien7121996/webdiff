import db from '@/configs/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
	data?: any;
	message: string;
	id?: string;
};
const nameCollection = 'projects';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	const { projectId } = req.body;
	// Check if userId or name is not present or is empty
	if (!projectId) {
		res.status(400).json({ message: 'Missing or empty userId or name' });
		return; // Stop execution after sending the error response
	}

	try {
		const projectDoc = doc(db, nameCollection, projectId);
		await deleteDoc(projectDoc);
		res.status(200).json({
			message: 'Delete project success',
		});
	} catch (e) {
		res.status(200).json({ message: 'Something went wrong' });
	}
}

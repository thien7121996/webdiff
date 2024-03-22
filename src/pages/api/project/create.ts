import db from '@/configs/firebase';
import { getDateCurrent } from '@/utils/getDateCurrent';
import { addDoc, collection } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
	data?: any;
	message: string;
	id?: string;
};
const nameCollection = 'projects';
const projectsCollectionRef = collection(db, nameCollection);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	const {
		userId,
		name,
		hasPageLogin,
		urlLogin,
		userNameLogin,
		passwordLogin,
		hasBasicAuth,
		userNameBasicAuth,
		passwordBasicAuth,
	} = req.body;
	// Check if userId or name is not present or is empty
	if (!userId && !name) {
		res.status(400).json({ message: 'Missing or empty userId or name' });
		return; // Stop execution after sending the error response
	}

	try {
		const project = {
			userId,
			name,
			hasPageLogin,
			urlLogin,
			userNameLogin,
			passwordLogin,
			hasBasicAuth,
			userNameBasicAuth,
			passwordBasicAuth,
			createdAt: getDateCurrent(),
		};
		const projectRef = await addDoc(projectsCollectionRef, project);
		res.status(200).json({
			message: 'Create project success',
			data: projectRef,
			id: projectRef.id,
		});
	} catch (e) {
		res.status(200).json({ message: 'Something went wrong' });
	}
}

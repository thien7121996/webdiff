import db from '@/configs/firebase';

import { collection, getDocs } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	if (req.method !== 'GET') {
		res.setHeader('Allow', ['GET']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	const projectsRef = collection(db, '/projects');
	const projectsSnap = await getDocs(projectsRef);

	const projects = projectsSnap.docs.map(projectSnap => {
		const snap = projectSnap.data();
		return {
			id: projectSnap.id,
			name: snap.name,
			createAt: snap.createAt,
			updateAt: snap.updateAt,
			userId: snap.userId,
		};
	});

	res
		.status(200)
		.json({ message: 'Get project list successfully', data: projects });
}

import db from '@/configs/firebase';
import { GetVisualSnapshotsResponse } from '@/models/GetVisualSnapshotsType';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<GetVisualSnapshotsResponse>
) {
	if (req.method !== 'GET') {
		res.setHeader('Allow', ['GET']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	const { projectId, pageSnapshotId } = req.query;
	const { uuid } = req.cookies;

	if (!uuid) {
		res.status(401).end('Please login');
		return;
	}

	if (typeof projectId !== 'string' || typeof pageSnapshotId !== 'string') {
		res.status(400).end('Missing or empty info');
		return;
	}

	try {
		const isBelongTo = await handleIsProjectBelongToUser(projectId, uuid);

		if (!isBelongTo) {
			res.status(400).end(`You don't have permission`);
			return;
		}

		const visualSnapshots = await handleGetVisuals(projectId, pageSnapshotId);
		res.status(200).json({
			message: 'Get page visual snapshot successfully',
			data: visualSnapshots,
		});
	} catch (error) {
		res.status(500).end('Some error occurred');
	}
}

const handleIsProjectBelongToUser = async (
	projectId: string,
	userId: string
) => {
	try {
		const projectRef = doc(db, `/projects/${projectId}`);
		const project = (await getDoc(projectRef)).data();
		return project?.userId === userId;
	} catch (error) {
		return false;
	}
};

const handleGetVisuals = async (projectId: string, pageSnapshotId: string) => {
	try {
		const visualSnapshotRef = collection(
			db,
			`/projects/${projectId}/pageSnapShot/${pageSnapshotId}/pageVisualSnapShot`
		);

		const visualSnapshotSnap = await getDocs(visualSnapshotRef);

		const visualSnapshotData = visualSnapshotSnap.docs.map(doc => {
			const data = doc.data();
			return {
				id: doc.id,
				path: data.path,
				status: data.status,
				createAt: data.createAt,
				updateAt: data.updateAt,
				reference: data.reference,
			};
		});

		return visualSnapshotData;
	} catch (error) {
		return [];
	}
};

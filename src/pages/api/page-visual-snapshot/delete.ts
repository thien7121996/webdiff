import db from '@/configs/firebase';
import {
	DocumentData,
	DocumentReference,
	deleteDoc,
	doc,
	getDoc,
} from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

type BodyType = {
	projectId: string;
	pageSnapshotId: string;
	visualSnapshotId: string;
};

type ResponseType = {
	message: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	if (req.method !== 'DELETE') {
		res.setHeader('Allow', ['DELETE']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	const { projectId, pageSnapshotId, visualSnapshotId }: BodyType = req.body;
	const { uuid } = req.cookies;

	if (!projectId || !pageSnapshotId || !visualSnapshotId || !uuid) {
		res.status(400).end('Bad request');
		return;
	}

	const isProjectBelongToUser = await checkProjectBelongToUser(uuid, projectId);

	if (!isProjectBelongToUser) {
		res
			.status(400)
			.end('Can not delete because this project not belong to you');
		return;
	}

	const deleteResult = await deleteVisualSnapshot(
		projectId,
		pageSnapshotId,
		visualSnapshotId
	);

	if (deleteResult) {
		res.status(200).json({ message: 'Delete visual snapshot successfully' });
	} else {
		res.status(400).json({ message: 'Delete failed' });
	}
}

const checkProjectBelongToUser = async (uuid: string, projectId: string) => {
	const projectDocRef = doc(db, `/projects/${projectId}`);
	const userId = (await getDoc(projectDocRef)).data()?.userId;
	return userId === uuid;
};

const deleteVisualSnapshot = async (
	projectId: string,
	pageSnapShotId: string,
	visualSnapshotId: string
) => {
	try {
		const visualSnapshotRef = doc(
			db,
			`/projects/${projectId}/pageSnapShot/${pageSnapShotId}/pageVisualSnapShot/${visualSnapshotId}`
		);

		const isReference = await checkVisualSnapshotReference(visualSnapshotRef);

		if (!isReference) {
			await deleteDoc(visualSnapshotRef);
			return true;
		}

		return false;
	} catch (error) {
		return false;
	}
};

const checkVisualSnapshotReference = async (
	visualSnapshotRef: DocumentReference<DocumentData, DocumentData>
) => {
	const visualSnapshot = (await getDoc(visualSnapshotRef)).data();
	return !!visualSnapshot?.reference;
};

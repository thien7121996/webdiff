import db from '@/configs/firebase';
import { GetProjectResponseType } from '@/models/GetProjectType';
import { ProjectType } from '@/models/project.model';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<GetProjectResponseType>
) {
	if (req.method !== 'GET') {
		res.setHeader('Allow', ['GET']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	const { projectId } = req.query;

	if (!projectId) {
		res.status(400).end(`Missing projectId`);
		return;
	}

	const projectRef = doc(db, `/projects/${projectId}`);
	const pageSnapshotsRef = collection(
		db,
		`/projects/${projectId}/pageSnapShot`
	);

	const [projectSnap, pageSnapshotSnap] = await Promise.all([
		getDoc(projectRef),
		getDocs(pageSnapshotsRef),
	]);

	const pageSnapshots = pageSnapshotSnap.docs.map(doc => {
		const data = doc.data();
		return {
			id: doc.id,
			url: data.url,
			path: data.path,
			createAt: data.createAt,
			updateAt: data.updateAt,
		};
	});

	const projectData = projectSnap.data();

	const project: ProjectType = {
		id: projectSnap.id,
		name: projectData?.name,
		userId: projectData?.userId,
		urlLogin: projectData?.urlLogin,
		createdAt: projectData?.createAt,
		updatedAt: projectData?.updateAt,
		hasBasicAuth: projectData?.hasBasicAuth,
		hasPageLogin: projectData?.hasPageLogin,
		passwordLogin: projectData?.passwordLogin,
		userNameLogin: projectData?.userNameLogin,
		passwordBasicAuth: projectData?.passwordBasicAuth,
		userNameBasicAuth: projectData?.userNameBasicAuth,
	};

	const responseData = { ...project, pageSnapshots };

	res
		.status(200)
		.json({ message: 'Get project list successfully', data: responseData });
}

// const handleGetPageVisuals = async (
// 	projectId: string,
// 	pageSnapShotId: string
// ): Promise<PageVisualSnapShot[]> => {
// 	try {
// 		const pageVisualsRef = collection(
// 			db,
// 			`/projects/${projectId}/pageSnapShot/${pageSnapShotId}/pageVisualSnapShot`
// 		);

// 		const pageVisualsSnap = await getDocs(pageVisualsRef);
// 		const pageVisuals = pageVisualsSnap.docs.map(doc => {
// 			const data = doc.data();
// 			return {
// 				id: doc.id,
// 				path: data.path,
// 				status: data.status,
// 				createAt: data.createAt,
// 				updateAt: data.updateAt,
// 				reference: data.reference,
// 			};
// 		});

// 		return pageVisuals;
// 	} catch (error) {
// 		return [];
// 	}
// };

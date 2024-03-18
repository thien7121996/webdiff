import getConfig from '@/configs';
import db from '@/configs/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
	data?: any;
	message: string;
};

type PageVisualSnapShot = {
	id?: string;
	reference?: boolean;
	status?: boolean;
	path?: string;
};

type PageSnapShot = {
	id?: string;
	path?: string;
	url?: string;
	pageVisualSnapShot?: PageVisualSnapShot[];
};

type ProjectData = {
	id?: string;
	name?: string;
	userId?: string;
	pageSnapShot?: PageSnapShot[];
};

const projectCollection = 'projects';
const projectsCollectionRef = collection(db, projectCollection);

const pageSnapShotCollection = 'pageSnapShot';
const pageSnapShotCollectionRef = collection(db, pageSnapShotCollection);

const pageVisualSnapShotCollection = 'pageVisualSnapShot';
const pageVisualSnapShotCollectionRef = collection(
	db,
	pageVisualSnapShotCollection
);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if (req.method !== 'GET') {
		res.setHeader('Allow', ['GET']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
	const userId = new URL(req.url!, getConfig.client.origin).searchParams.get(
		'userid'
	);

	if (!userId) {
		res.status(400).json({ message: 'Missing empty userId' });
		return;
	}

	try {
		const condition = query(
			projectsCollectionRef,
			where('userId', '==', userId)
		);

		const querySnapshot = await getDocs(condition);
		const projectList: ProjectData[] = await Promise.all(
			querySnapshot.docs.map(async projectDoc => {
				const projectData: ProjectData = await getPageSnapShot(projectDoc);
				return projectData;
			})
		);

		res
			.status(200)
			.json({ message: 'Get List Project Success', data: projectList });
	} catch (e) {
		res.status(200).json({ message: 'Something went wrong' });
	}
}

export const getPageSnapShot = async (
	projectDoc: any
): Promise<ProjectData> => {
	const projectData: ProjectData = {
		id: projectDoc.id,
		...projectDoc.data(),
		pageSnapShot: [],
	};
	// Get the child page snapshot collection
	const childCollectionRef = collection(
		db,
		projectCollection,
		projectDoc.id,
		pageSnapShotCollection
	);
	const childCollectionSnapshot = await getDocs(childCollectionRef);

	const childDocuments: PageSnapShot[] = await Promise.all(
		childCollectionSnapshot.docs.map(async childDoc => {
			const pageVisualSnapShotData: PageVisualSnapShot[] =
				await getPageVisualCheck(projectDoc, childDoc);
			return {
				id: childDoc.id,
				path: childDoc.data().path,
				url: childDoc.data().url,
				pageVisualSnapShot: pageVisualSnapShotData,
				updateAt: childDoc.data().updateAt,
			};
		})
	);

	projectData.pageSnapShot = childDocuments;
	return projectData;
};

export const getPageVisualCheck = async (
	projectDoc: any,
	pageSnapshotDoc: any
): Promise<PageVisualSnapShot[]> => {
	const childCollectionRef = collection(
		db,
		projectCollection,
		projectDoc.id,
		pageSnapShotCollection,
		pageSnapshotDoc.id,
		pageVisualSnapShotCollection
	);

	const childCollectionSnapshot = await getDocs(childCollectionRef);
	const childDocuments: PageVisualSnapShot[] = childCollectionSnapshot.docs.map(
		childDoc => {
			return {
				id: childDoc.id,
				reference: childDoc.data().reference,
				status: childDoc.data().status,
				path: childDoc.data().path,
				updateAt: childDoc.data().updateAt,
			};
		}
	);

	return childDocuments;
};

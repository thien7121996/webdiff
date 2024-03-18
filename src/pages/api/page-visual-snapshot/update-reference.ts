// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from '@/configs/firebase';
import {
	pageSnapshotCollection,
	pageVisualSnapshotCollection,
	projectsCollection,
} from '@/constants/collections';
import { getDateCurrent } from '@/utils/getDateCurrent';
import {
	CollectionReference,
	DocumentData,
	DocumentReference,
	QueryDocumentSnapshot,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

const projectsCollectionRef = collection(db, projectsCollection);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	const { projectId, pageSnapShotId, pageVisualSnapShotId } = req.query;

	if (
		typeof projectId !== 'string' ||
		typeof pageSnapShotId !== 'string' ||
		typeof pageVisualSnapShotId !== 'string'
	) {
		res.status(400).end(`Bad request`);
		return;
	}

	try {
		const newVisual = await handleChangeDefaultVisualSnap(
			projectId,
			pageSnapShotId,
			pageVisualSnapShotId
		);

		res.status(200).json({
			message: 'Change visual snapshot reference successfully',
			data: newVisual,
		});
	} catch (error) {
		res.status(404).end(`Not Found`);
	}
}

const handleChangeDefaultVisualSnap = async (
	projectId: string,
	pageSnapShotId: string,
	pageVisualSnapShotId: string
) => {
	const pageSnapShotRef = doc(
		projectsCollectionRef,
		projectId,
		pageSnapshotCollection,
		pageSnapShotId
	);

	const visualSnapshotsRef = collection(
		pageSnapShotRef,
		pageVisualSnapshotCollection
	);

	const referenceTrueCondition = query(
		visualSnapshotsRef,
		where('reference', '==', true)
	);

	const newVisualRef = doc(visualSnapshotsRef, pageVisualSnapShotId);

	const [referenceSnapshotsSnaps, newVisualSnap] = await Promise.all([
		getDocs(referenceTrueCondition),
		getDoc(newVisualRef),
	]);

	const newVisual = newVisualSnap.data();

	if (!newVisual) {
		return { notFound: true };
	}

	handleChangeAllReferenceVisualsToFalse(
		referenceSnapshotsSnaps.docs,
		visualSnapshotsRef
	);

	handleChangeDefaultPath(pageSnapShotRef, newVisual.path);
	const newDefaultVisual = await handleUpdateVisualReferenceTrue(newVisualRef);

	return newDefaultVisual;
};

const handleChangeAllReferenceVisualsToFalse = (
	docs: QueryDocumentSnapshot<DocumentData, DocumentData>[],
	visualSnapshotsRef: CollectionReference<DocumentData, DocumentData>
) => {
	docs.forEach(async document => {
		const visualUpdateAttributes = {
			reference: false,
			updateAt: getDateCurrent(),
		};

		const projectDoc = doc(visualSnapshotsRef, document.id);

		updateDoc(projectDoc, {
			...visualUpdateAttributes,
		});
	});
};

const handleUpdateVisualReferenceTrue = async (
	needUpdateVisualRef: DocumentReference<DocumentData, DocumentData>
) => {
	const visualUpdateAttributes = {
		reference: true,
		updateAt: getDateCurrent(),
	};

	await updateDoc(needUpdateVisualRef, {
		...visualUpdateAttributes,
		id: needUpdateVisualRef.id,
	});

	const newDefaultVisualSnap = await getDoc(needUpdateVisualRef);
	return newDefaultVisualSnap.data();
};

const handleChangeDefaultPath = (
	pageSnapShotRef: DocumentReference<DocumentData, DocumentData>,
	newVisualPath: string
) => {
	const updateAttributes = { id: pageSnapShotRef.id, path: newVisualPath };
	updateDoc(pageSnapShotRef, { ...updateAttributes });
};

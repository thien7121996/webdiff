import db from '@/configs/firebase';
import { useHandleError } from '@/hooks/useHandleError';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	updateDoc,
} from 'firebase/firestore';
import { useState } from 'react';
const nameCollection = 'pageSnapShots';
const pageSnapShotsCollectionRef = collection(db, nameCollection);
export const usePageSnapShot = () => {
	const { handleError } = useHandleError();
	const [response, setResponse] = useState<any>(null);
	const [pageSnapShotList, setPageSnapShotList] = useState<PageSnapShotType[]>(
		[]
	);
	const [pageSnapShotData, setpageSnapShotData] = useState<PageSnapShotType>();
	const [notice, setNotice] = useState('');

	const createpageSnapShot = async (pageSnapShot: PageSnapShotType) => {
		try {
			const pageSnapShotRef = await addDoc(
				pageSnapShotsCollectionRef,
				pageSnapShot
			);
			setResponse(pageSnapShotRef);
		} catch (e) {
			handleError(e);
		}
	};

	const updatepageSnapShot = async (
		pageSnapShotId: string,
		pageSnapShot: PageSnapShotType
	) => {
		const pageSnapShotRef = doc(db, nameCollection, pageSnapShotId);

		try {
			await updateDoc(pageSnapShotRef, {
				...pageSnapShot,
			});
		} catch (e) {
			handleError(e);
		}
	};

	const getListpageSnapShots = async () => {
		try {
			const querySnapshot = await getDocs(pageSnapShotsCollectionRef);
			const pageSnapShotList = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			})) as PageSnapShotType[];
			setPageSnapShotList(pageSnapShotList);
		} catch (e) {
			handleError(e);
		}
	};

	const deletepageSnapShot = async (pageSnapShotId: string) => {
		try {
			await deleteDoc(doc(db, nameCollection, pageSnapShotId));
			setNotice('pageSnapShot deleted successfully');
		} catch (e) {
			handleError(e);
		}
	};

	const getpageSnapShot = async (pageSnapShotId: string) => {
		const pageSnapShotRef = doc(db, nameCollection, pageSnapShotId);
		try {
			const docSnap = await getDoc(pageSnapShotRef);
			if (docSnap.exists()) {
				const pageSnapShotData = {
					id: docSnap.id,
					...docSnap.data(),
				} as PageSnapShotType;
				setpageSnapShotData(pageSnapShotData);
			} else {
				setNotice('No such document!');
			}
		} catch (e) {
			handleError(e);
		}
	};
	return {
		createpageSnapShot,
		updatepageSnapShot,
		getListpageSnapShots,
		deletepageSnapShot,
		getpageSnapShot,
		response,
		pageSnapShotList,
		pageSnapShotData,
		notice,
	};
};

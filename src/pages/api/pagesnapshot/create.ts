import { InfoBaseUrl } from '@/components/pages/ProjectDetailPage/AddNewPageSnapModal/AddNewPageSnapModal';
import db from '@/configs/firebase';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { SCREENSHOT_STATUS_TYPE } from '@/types';
import { getDateCurrent } from '@/utils/getDateCurrent';
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { some } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  data?: any;
  message: string;
  id?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { projectId, baseInfo: newPageSnapBaseUrls } = req.body;

  const userId = req.cookies.uuid;

  if (!userId || !projectId || !newPageSnapBaseUrls.length) {
    res.status(400).end('Missing or empty info');
    return;
  }

  try {
    const conditionArray = [handleIsProjectBelongToThisUser(projectId, userId)];

    newPageSnapBaseUrls.forEach((newPageSnapBaseUrl: InfoBaseUrl) =>
      conditionArray.push(
        handleIsPageSnapshotExist(projectId, newPageSnapBaseUrl.urlBase)
      )
    );

    const [isProjectBelongToThisUser, ...rest] =
      await Promise.all(conditionArray);

    if (rest.some((isExist) => isExist)) {
      res.status(400).end('Error! Url is exist');
      return;
    }

    if (!isProjectBelongToThisUser) {
      res
        .status(400)
        .end('You are not allow to add new page snapshot to this project!');
      return;
    }

    const saveList = newPageSnapBaseUrls.map(
      (newPageSnapBaseUrl: InfoBaseUrl) =>
        handleAddNewPageSnapshot(projectId, newPageSnapBaseUrl)
    );

    const [...saved] = await Promise.all(saveList);

    res.status(200).json({
      message: 'Create page snapshot success',
      data: saved,
    });
  } catch (e) {
    res.status(400).json({ message: 'Something went wrong' });
  }
}

const handleIsPageSnapshotExist = async (
  projectId: string,
  newPageSnapBaseUrl: string
) => {
  const pageSnapShotsRef = collection(
    db,
    `/projects/${projectId}/pageSnapShot`
  );

  try {
    const allPageSnapshotsSnap = await getDocs(pageSnapShotsRef);
    const allPageSnapshots = allPageSnapshotsSnap.docs.map((doc) => doc.data());

    return some(
      allPageSnapshots,
      (snapshot: PageSnapShotType) => snapshot.url === newPageSnapBaseUrl
    );
  } catch (error) {
    return true;
  }
};

export const handleIsProjectBelongToThisUser = async (
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

const handleAddNewPageSnapshot = async (
  projectId: string,
  baseUrl: InfoBaseUrl
) => {
  const pageSnapshotsRef = collection(
    db,
    `/projects/${projectId}/pageSnapShot`
  );

  const oneNew = {
    createdAt: getDateCurrent(),
    url: baseUrl.urlBase,
    isPagePrivate: baseUrl.isPagePrivate,
    screenshotStatus: SCREENSHOT_STATUS_TYPE.doing,
  };

  try {
    const newPageSnapshotSnap = await addDoc(pageSnapshotsRef, oneNew);

    const pageSnapshotRef = doc(
      db,
      `/projects/${projectId}/pageSnapShot/${newPageSnapshotSnap.id}`
    );
    const newPageSnapshotData = await getDoc(pageSnapshotRef);
    return { ...newPageSnapshotData.data(), id: newPageSnapshotData.id };
  } catch (error) {
    // do nothing
  }
};

import getConfig from '@/configs/env';
import db from '@/configs/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
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
  const projectId = new URL(req.url!, getConfig.client.origin).searchParams.get(
    'projectid'
  );

  const pageSnapshotId = new URL(
    req.url!,
    getConfig.client.origin
  ).searchParams.get('pagesnapshotid');

  if (!projectId || !pageSnapshotId) {
    res.status(400).json({ message: 'Missing empty projectId' });
    return;
  }

  try {
    const docRef = doc(
      db,
      'projects',
      projectId,
      'pageSnapShot',
      pageSnapshotId
    );
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      res.status(404).json({ message: 'Page snapshot not found' });
      return;
    }

    const projectData: ProjectData = await getPageSnapShot(docSnap);

    res
      .status(200)
      .json({ message: 'Get snapshot Success', data: projectData });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
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
    childCollectionSnapshot.docs.map(async (childDoc) => {
      const pageVisualSnapShotData: PageVisualSnapShot[] =
        await getPageVisualCheck(projectDoc, childDoc);
      return {
        id: childDoc.id,
        path: childDoc.data().path,
        url: childDoc.data().url,
        pageVisualSnapShot: pageVisualSnapShotData,
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
    (childDoc) => {
      return {
        id: childDoc.id,
        reference: childDoc.data().reference,
        status: childDoc.data().status,
        path: childDoc.data().path,
      };
    }
  );

  return childDocuments;
};

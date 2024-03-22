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
const pageSnapShotCollection = 'pageSnapShot';

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

  if (!projectId) {
    res.status(400).json({ message: 'Missing empty projectId' });
    return;
  }

  try {
    const docRef = doc(db, 'projects', projectId);

    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    const projectData: ProjectData = await getPageSnapShot(docSnap);

    res.status(200).json({ message: 'Get Project Success', data: projectData });
  } catch (e) {
    // console.error(e);
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
    childCollectionSnapshot.docs.map(async (childDoc) => ({
      id: childDoc.id,
      path: childDoc.data().path,
      url: childDoc.data().url,
      ...childDoc.data(),
    }))
  );

  projectData.pageSnapShot = childDocuments;
  return projectData;
};

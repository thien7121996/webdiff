import db from '@/configs/firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  data?: any;
  message: string;
};
const nameCollection = 'pageSnapShots';
const pageSnapShotsCollectionRef = collection(db, nameCollection);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const refCollection = collection(db, 'projects');
    const querySnapshot = await getDocs(refCollection);
    const projectListPromises = querySnapshot.docs.map(async (doc) => {
      const pageSnapShotsRef = collection(
        db,
        `projects/${doc.id}/pageSnapShot`
      );
      const pageSnapShotsQuerySnapshot = await getDocs(pageSnapShotsRef);
      const pageSnapShots = pageSnapShotsQuerySnapshot.docs.map(
        async (docSnapShot) => {
          const pageVisualSnapShotRef = collection(
            db,
            `projects/${doc.id}/pageSnapShot/${docSnapShot.id}/pageVisualSnapShot`
          );
          const pageVisualSnapShotQuerySnapshot = await getDocs(
            pageVisualSnapShotRef
          );
          return {
            id: docSnapShot.id,
            ...docSnapShot.data(),
            pageVisualSnapShot: pageVisualSnapShotQuerySnapshot,
          };
        }
      );
      return {
        id: doc.id,
        ...doc.data(),
        pageSnapShots,
      };
    });
    const projectList = await Promise.all(projectListPromises);
    res
      .status(200)
      .json({ message: 'Get List Project Success', data: projectList });
  } catch (e) {
    res.status(200).json({ message: 'Something went wrong' });
  }
}

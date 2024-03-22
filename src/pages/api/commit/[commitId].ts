import db from '@/configs/firebase';
import { handleIsProjectBelongToThisUser } from '@/pages/api/pagesnapshot/create';
import { deleteDoc, doc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { commitId } = req.query;
  const { projectId } = req.body;
  const { uuid: userId } = req.cookies;
  if (!projectId || !commitId || !userId) {
    res.status(400).end('Bad request');
    return;
  }

  try {
    const isBelong = await handleIsProjectBelongToThisUser(projectId, userId);

    if (!isBelong) {
      res.status(403).end('You are not allow to edit on this project');
      return;
    }

    const commitRef = doc(db, `/visualchecks/${commitId}`);
    await deleteDoc(commitRef);

    res.status(200).json({ message: 'Ok' });
  } catch (error) {}
}

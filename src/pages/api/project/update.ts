import db from '@/configs/firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  data?: any;
  message: string;
  id?: string;
};
const nameCollection = 'projects';
const projectsCollectionRef = collection(db, nameCollection);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { projectId } = req.body;
  // Check if userId or name is not present or is empty
  if (!projectId) {
    res.status(400).json({ message: 'Missing or empty userId or name' });
    return; // Stop execution after sending the error response
  }

  try {
    const project = { projectId };
    const projectDoc = doc(db, nameCollection, projectId);
    const projectRef = await updateDoc(projectDoc, {
      ...project,
    });
    res.status(200).json({
      message: 'Update project success',
      data: projectRef,
    });
  } catch (e) {
    res.status(200).json({ message: 'Something went wrong' });
  }
}

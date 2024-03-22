import db from '@/configs/firebase';
import { addDoc, collection } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  data?: any;
  message: string;
  id?: string;
};
const nameCollection = 'usermeta';
const usermetaCollectionRef = collection(db, nameCollection);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { userId, rule } = req.body;
  // Check if userId or name is not present or is empty
  if (!userId && !rule) {
    res.status(400).json({ message: 'Missing or empty userId or name' });
    return; // Stop execution after sending the error response
  }

  try {
    const userMetaData = { userId, type: 0, rule, status: 1 };
    const userMetatRef = await addDoc(usermetaCollectionRef, userMetaData);
    res.status(200).json({
      message: 'Create user meta success',
      data: userMetatRef,
      id: userMetatRef.id,
    });
  } catch (e) {
    res.status(200).json({ message: 'Something went wrong' });
  }
}

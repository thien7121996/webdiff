import db, { serviceAccountPrivate } from '@/configs/firebase';
import admin from 'firebase-admin';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  data?: any;
  message: string;
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPrivate),
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { token } = req.body;

  try {
    const userInfo = await admin.auth().verifyIdToken(token);
    const userMetaCollectionRef = collection(db, 'usermeta');

    const userMetaCondition = query(
      userMetaCollectionRef,
      where('userId', '==', userInfo.uid)
    );

    const userMeta = await getDocs(userMetaCondition);
    const userInfoData = {
      ...userInfo,
      ...userMeta.docs[0].data(),
    };
    // Token is valid, proceed with your logic
    return res
      .status(200)
      .json({ message: 'Token is valid', data: userInfoData });
  } catch (error) {
    // Handle error if token verification fails
    return res.status(401).json({ message: 'Invalid token', data: token });
  }
}

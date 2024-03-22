import db from '@/configs/firebase';
import { CommitType } from '@/models/GetCommitsType';
import { handleIsProjectBelongToThisUser } from '@/pages/api/pagesnapshot/create';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
  data: CommitType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { projectId } = req.query;
  const { uuid: userId } = req.cookies;

  if (typeof projectId !== 'string' || !userId) {
    res.status(400).end('Bad request');
    return;
  }

  try {
    const isBelong = await handleIsProjectBelongToThisUser(projectId, userId);

    if (!isBelong) {
      res.status(400).end('Not allow');
      return;
    }

    const commits = await handleGetCommits(userId, projectId);

    res.status(200).json({
      message: 'Get commit list successfully',
      data: commits as CommitType[],
    });
  } catch (error) {
    throw error;
  }
}

const handleGetCommits = async (userId: string, projectId: string) => {
  try {
    const commitsRef = collection(db, 'visualchecks');

    const q = query(
      commitsRef,
      where('userId', '==', userId),
      where('projectId', '==', projectId)
    );

    const commitsSnap = await getDocs(q);

    const commits = [];

    for (const doc of commitsSnap.docs) {
      const data = doc.data();

      const pageSnapshots = await getCommitPageSnaps(doc.id);

      commits.push({
        id: doc.id,
        fail: data.fail,
        status: data.status,
        userId: data.userId,
        success: data.success,
        progress: data.progress,
        projectId: data.projectId,
        screenshotingUrl: data.screenshotingUrl,
        pageSnapshots,
      });
    }

    return commits;
  } catch (error) {
    return;
  }
};

const getCommitPageSnaps = async (commitId: string) => {
  try {
    const commitPageSnapsRef = collection(
      db,
      `/visualchecks/${commitId}/pagesnapshots`
    );

    const commitPageSnapsSnap = await getDocs(commitPageSnapsRef);

    return commitPageSnapsSnap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        url: data.url,
        path: data.path,
        diff: data.diff,
        match: data.match,
        createdAt: data.createdAt,
      };
    });
  } catch (error) {
    throw error;
  }
};

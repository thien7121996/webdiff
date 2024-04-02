import config from '@/configs/env';
import { ScreenshotPageResponse } from '@/models/GetScreenshotPage';
import { handleIsProjectBelongToThisUser } from '@/pages/api/pagesnapshot/create';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ScreenshotPageResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { projectId, pageSnapshotId } = req.body;
  const { uuid: userId } = req.cookies;

  if (!projectId || !pageSnapshotId || !userId) {
    res.status(400).json({ message: 'Bad request' });
    return;
  }

  try {
    const isBelongTo = await handleIsProjectBelongToThisUser(projectId, userId);

    if (!isBelongTo) {
      res.status(401).end(`You don't have permission`);
      return;
    }

    const screenshotPath = await axios.post(
      `${config.queueServer.origin}/page-screenshot`,
      {
        projectId,
        pageSnapshotId,
      }
    );

    res.status(200).json({
      message: 'Screenshot taken and uploaded successfully',
      url: screenshotPath.data.url,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.response?.data?.message });
  }
}

import config from '@/configs/env';
import { httpClient } from '@/utils/httpClient';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { uuid: userId } = req.cookies;
  const { projectId, visualCheckId } = req.body;

  if (!userId || !projectId || !visualCheckId) {
    res.status(400).end('Bad request');
    return;
  }

  try {
    await httpClient.post(`${config.queueServer.origin}/run-visual-snapshots`, {
      userId,
      projectId,
      visualCheckId,
    });

    res.status(200).json({ message: 'OK' });
  } catch (error) {
    res.status(400).end('Bad request');
  }
}

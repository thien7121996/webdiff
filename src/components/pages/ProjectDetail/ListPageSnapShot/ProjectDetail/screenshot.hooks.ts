import { useScreenShot } from '@/hooks/screenShot.hook';
import { useNotification } from '@/hooks/useNotification';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { useCallback, useState } from 'react';

type jobQueueProcess = {
	id: string;
	isProccessing: boolean;
};

export const useScreenshot = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [progress, setProgress] = useState<number>(0);
	const [jobQueueProcess, setJobQueueProcess] = useState<jobQueueProcess[]>([]);
	const [isQueueRunning, setIsQueueRunning] = useState(false);
	const { scanScreenShotUrl } = useScreenShot();
	const { setNotification } = useNotification();

	const addJobQueue = (jobScreen: jobQueueProcess) => {
		setJobQueueProcess(prevJobs => [...prevJobs, jobScreen]);
	};

	const handleScreenShot = useCallback(
		async (
			projectId?: string,
			url?: string,
			pageSnapshotId?: string,
			isVisual?: boolean
		) => {
			if (!url || !projectId || !pageSnapshotId || jobQueueProcess.length > 0) {
				return;
			}
			setProgress(0);
			addJobQueue({ id: pageSnapshotId, isProccessing: true });
			let intervalId: NodeJS.Timeout;
			const incrementProgress = () => {
				setProgress(currentProgress => {
					if (currentProgress >= 90) {
						clearInterval(intervalId);
						return currentProgress;
					}
					return currentProgress + 1;
				});
			};

			intervalId = setInterval(incrementProgress, 400);
			try {
				setIsLoading(true);
				const urlPath = await scanScreenShotUrl(
					url,
					projectId,
					pageSnapshotId,
					isVisual ?? false
				);
				setNotification({
					type: 'success',
					message: 'Screen shot success!',
				});
			} catch (e) {
				setNotification({
					type: 'Error',
					message: 'Screen shot success!',
				});
			} finally {
				setIsLoading(false);
				clearInterval(intervalId);
				setProgress(100);
				setJobQueueProcess([]);
			}
		},
		[jobQueueProcess, scanScreenShotUrl, setNotification]
	);
	const handleScreenShotJobQueue = useCallback(
		async (
			projectId: string,
			listUrlScan: PageSnapShotType[],
			isVisual: boolean
		) => {
			if (listUrlScan.length === 0) {
				return;
			}
			setIsQueueRunning(true);
			for (const item of listUrlScan) {
				await handleScreenShot(projectId, item.url, item.id, isVisual);
			}
			setIsQueueRunning(false);
		},
		// eslint-disable-next-line
		[]
	);

	return {
		progress,
		isLoading,
		handleScreenShot,
		jobQueueProcess,
		handleScreenShotJobQueue,
		isQueueRunning,
	};
};

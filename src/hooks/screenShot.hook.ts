import { useHandleError } from '@/hooks/useHandleError';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { ProjectType } from '@/models/project.model';
import { getDetailProject } from '@/services/project';
import { screenShotUrl } from '@/services/screenShot';
import { useState } from 'react';
type dataScreen = {
	url: string;
	project: ProjectType;
	pageSnapShot: PageSnapShotType;
	isCheckVisual: boolean;
};
export const useScreenShot = () => {
	const { handleError } = useHandleError();
	const [urlScreenShot, setUrlScreenShot] = useState<PageSnapShotType[]>([]);

	const scanScreenShotUrl = async (
		url: string,
		projectId: string,
		pageSnapshotId: string,
		isCheckVisual: boolean
	) => {
		try {
			const projectDetail = await getDetailProject(projectId);
			const infoSnapShotID = projectDetail.data.pageSnapShot.find(
				(item: PageSnapShotType) => item.id === pageSnapshotId
			);
			const projectData: ProjectType = projectDetail.data;
			const dataScreen: dataScreen = {
				url,
				project: projectData,
				pageSnapShot: infoSnapShotID,
				isCheckVisual,
			};
			const screenShot = await screenShotUrl(dataScreen);
			setUrlScreenShot(screenShot.url);
		} catch (e) {
			handleError(e);
		}
	};
	return {
		scanScreenShotUrl,
		urlScreenShot,
	};
};

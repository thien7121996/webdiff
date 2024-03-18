import Loader from '@/components/admin/common/Loader';
import { useScreenshot } from '@/components/pages/ProjectDetail/ListPageSnapShot/ProjectDetail/screenshot.hooks';
import { first } from 'lodash';
import { FC } from 'react';
import { CompareImageDetail } from './CompareImageDetail';
import { useProjectDetail } from './projectDetail.hooks';

type Props = {
	projectId: string;
	snapShotId: string;
};

export const CompareImagePage: FC<Props> = ({ projectId, snapShotId }) => {
	const { handleScreenShot } = useScreenshot();

	const { isLoading, pageSnapShotObject } = useProjectDetail(projectId);

	return isLoading ? (
		<Loader />
	) : (
		<CompareImageDetail
			projectId={projectId}
			snapShotId={snapShotId}
			snapShotObject={pageSnapShotObject[snapShotId]}
			snapShotUrl={pageSnapShotObject[snapShotId].url}
			snapShotItemPath={pageSnapShotObject[snapShotId].path}
			newestPageVisualSnapshot={first(
				pageSnapShotObject[snapShotId].pageVisualSnapShot
			)}
		/>
	);
};

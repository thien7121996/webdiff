import Loader from '@/components/admin/common/Loader';
import { getDetailProject } from '@/services/project';
import { first, keyBy } from 'lodash';
import { FC, useEffect, useState } from 'react';
import { CompareImageDetail } from './CompareImageDetail';

type Props = {
	projectId: string;
	snapShotId: string;
};

export const CompareImagePage: FC<Props> = ({ projectId, snapShotId }) => {
	const [pageSnapShotObject, setPageSnapShotObject] = useState<any>();
	const [isLoading, setIsLoading] = useState(true);
	const [snapId, setSnapId] = useState<string>(snapShotId);

	const handleGetDetailProject = async () => {
		try {
			const getProjectDetail = await getDetailProject(projectId);
			const projectDetail = getProjectDetail.data;
			const getPageSnapShotObject = keyBy(projectDetail?.pageSnapShot, 'id');
			setPageSnapShotObject(getPageSnapShotObject);
			setIsLoading(false);
		} catch (error) {}
	};

	useEffect(() => {
		handleGetDetailProject();
		setSnapId(snapShotId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projectId, snapShotId]);

	return isLoading ? (
		<Loader />
	) : (
		pageSnapShotObject && snapId && projectId && (
			<CompareImageDetail
				projectId={projectId}
				snapShotId={snapId}
				snapShotObject={pageSnapShotObject[snapId]}
				snapShotUrl={pageSnapShotObject[snapId].url}
				snapShotItemPath={pageSnapShotObject[snapId].path}
				newestPageVisualSnapshot={first(
					pageSnapShotObject[snapId].pageVisualSnapShot
				)}
			/>
		)
	);
};

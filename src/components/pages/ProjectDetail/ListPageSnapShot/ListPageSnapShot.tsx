import { useBooleanState } from '@/hooks/useBooleanState';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { ProjectType } from '@/models/project.model';
import { getDetailProject } from '@/services/project';
import {
	Dispatch,
	FC,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { AddNewPageSnapModal } from './AddNewPageSnapModal';
import { HistoryCheckModal } from './HistoryCheckModal';
import { ProjectDetail } from './ProjectDetail';

type Props = {
	infoProjectDetail: ProjectType;
	setProjectDetail: Dispatch<SetStateAction<ProjectType>>;
	projectId: string;
};

export const ListPageSnapShot: FC<Props> = ({
	infoProjectDetail,
	setProjectDetail,
	projectId,
}) => {
	const {
		boolean: activeModal,
		toggle: toggleActiveModal,
		setFalse: setCloseModal,
	} = useBooleanState(false);
	const [idProject, setIdProject] = useState<string>();

	const [listPageSnapShot, setListPageSnapShot] = useState<PageSnapShotType[]>(
		[]
	);
	const {
		boolean: isNewPageModalActive,
		setFalse: setNewPageModalClose,
		setTrue: setNewPageModalOpen,
	} = useBooleanState(false);

	const [pageSnapshotCurrent, setPageSnapshotCurrent] =
		useState<PageSnapShotType>();

	const handleGetDetailProject = useCallback(async () => {
		try {
			const getProjectDetail = await getDetailProject(projectId);
			const projectDetail = getProjectDetail.data;

			setListPageSnapShot(getProjectDetail.data.pageSnapShot);
			setProjectDetail(projectDetail);
			setPageSnapshotCurrent(prev => {
				if (!prev) {
					return;
				}

				return projectDetail.pageSnapShot.find(
					(snap: PageSnapShotType) => snap.id === prev.id
				);
			});
		} catch (error) {}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projectId]);

	useEffect(() => {
		handleGetDetailProject();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projectId]);
	return (
		<div>
			<HistoryCheckModal
				activeModal={activeModal}
				setCloseModal={setCloseModal}
				pageSnapshotCurrent={pageSnapshotCurrent}
				handleGetDetailProject={handleGetDetailProject}
			/>
			<AddNewPageSnapModal
				open={isNewPageModalActive}
				onClose={setNewPageModalClose}
				handleGetDetailProject={handleGetDetailProject}
			/>
			{infoProjectDetail && infoProjectDetail.id && (
				<ProjectDetail
					toggleActiveModal={toggleActiveModal}
					setNewPageModalOpen={setNewPageModalOpen}
					infoProjectDetailId={infoProjectDetail.id}
					pageSnapShots={listPageSnapShot}
					infoProjectDetailName={infoProjectDetail.name}
					setPageSnapshotCurrent={setPageSnapshotCurrent}
					handleGetDetailProject={handleGetDetailProject}
				/>
			)}
		</div>
	);
};
ListPageSnapShot.displayName = 'ListPageSnapShot';

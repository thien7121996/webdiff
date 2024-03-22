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
import { ProjectDetail } from './ProjectDetail';
import { useProjectDetail } from './projectDetail.hooks';

type Props = {
  projectId: string;
  infoProjectDetail: ProjectType;
  setProjectDetail: Dispatch<SetStateAction<ProjectType>>;
};

export const ProjectDetailPage: FC<Props> = ({
  infoProjectDetail,
  setProjectDetail,
  projectId,
}) => {
  const {
    boolean: activeModal,
    toggle: toggleActiveModal,
    setFalse: setCloseModal,
  } = useBooleanState(false);

  const {
    boolean: isNewPageModalActive,
    setFalse: setNewPageModalClose,
    setTrue: setNewPageModalOpen,
  } = useBooleanState(false);
  const [idProject, setIdProject] = useState<string>();

  const [listPageSnapShot, setListPageSnapShot] = useState<PageSnapShotType[]>(
    []
  );
  const { isError, isLoading, project, pageSnapshotUrls } =
    useProjectDetail(projectId);
  const [pageSnapshotCurrent, setPageSnapshotCurrent] =
    useState<PageSnapShotType>();

  const handleGetDetailProject = useCallback(async () => {
    try {
      const getProjectDetail = await getDetailProject(projectId);

      if (getProjectDetail.data) {
        setListPageSnapShot(getProjectDetail.data.pageSnapShot);
        setProjectDetail(getProjectDetail.data as ProjectType);
      }
      setPageSnapshotCurrent((prev) => {
        if (!prev) {
          return;
        }

        return getProjectDetail.data?.pageSnapShot.find(
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
    <>
      {isError && <div>Error</div>}
      {isLoading && <div>Loading</div>}
      <AddNewPageSnapModal
        open={isNewPageModalActive}
        onClose={setNewPageModalClose}
        handleGetDetailProject={handleGetDetailProject}
      />
      {project && (
        <ProjectDetail
          infoProjectDetailId={project.id}
          infoProjectDetailName={project.name}
          pageSnapCount={listPageSnapShot.length}
          pageSnapshot={listPageSnapShot}
          urlList={pageSnapshotUrls}
          reloadProject={handleGetDetailProject}
          setNewPageModalOpen={setNewPageModalOpen}
        />
      )}
    </>
  );
};
ProjectDetailPage.displayName = 'ProjectDetailPage';

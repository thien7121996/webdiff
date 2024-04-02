import { useBooleanState } from '@/hooks/useBooleanState';
import { FC } from 'react';
import { AddNewPageSnapModal } from './AddNewPageSnapModal';
import { ProjectDetail } from './ProjectDetail';
import { useProjectDetail } from './projectDetail.hooks';

type Props = {
  projectId: string;
};

export const ProjectDetailPage: FC<Props> = ({ projectId }) => {
  const {
    boolean: isNewPageModalActive,
    setFalse: setNewPageModalClose,
    setTrue: setNewPageModalOpen,
  } = useBooleanState(false);

  const { isError, isLoading, project, pageSnapshotUrls } =
    useProjectDetail(projectId);

  return (
    <>
      {isError && <div>Error</div>}
      {isLoading && <div>Loading</div>}
      <AddNewPageSnapModal
        open={isNewPageModalActive}
        onClose={setNewPageModalClose}
      />
      {!!project && (
        <ProjectDetail
          infoProjectDetailId={project.id}
          infoProjectDetailName={project.name}
          pageSnapCount={project.pageSnapShot?.length ?? 0}
          setNewPageModalOpen={setNewPageModalOpen}
          urlList={pageSnapshotUrls}
        />
      )}
    </>
  );
};
ProjectDetailPage.displayName = 'ProjectDetailPage';

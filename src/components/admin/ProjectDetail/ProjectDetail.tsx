import { SkeletonLoader } from '@/components/admin/common/SkeletonLoader';
import { BarStats } from './BarStats';
import { PageSnapshotList } from './PageSnapshotList';
import { useProjectDetail } from './projectDetail.hooks';

export const ProjectDetail = () => {
  const { isLoading, isError, project } = useProjectDetail();

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return <>Some error occurred</>;
  }

  if (!project) {
    return <>Not found</>;
  }
  // console.log(project);
  return (
    <div>
      <BarStats
        pageSnapshotCount={0}
        projectId={project.id}
        userId={project.userId}
        projectName={project.name}
        hasBasicAuth={project.hasBasicAuth}
        hasPageLogin={project.hasPageLogin}
        passwordBasicAuth={project.passwordBasicAuth}
        passwordLogin={project.passwordLogin}
        urlLogin={project.urlLogin}
        userNameBasicAuth={project.userNameBasicAuth}
        userNameLogin={project.userNameLogin}
      />
      <PageSnapshotList pageSnapshots={project.pageSnapshots} />
    </div>
  );
};

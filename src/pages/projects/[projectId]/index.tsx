import { Layout } from '@/components/layout';
import Breadcrumb from '@/components/pages/Common/Breadcrumb';
import { ProjectDetailPage } from '@/components/pages/ProjectDetailPage';
import { ProjectType } from '@/models/project.model';
import { NextPageWithLayout } from '@/pages/_app';
import { useParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

type Props = {
  infoProjectDetail: ProjectType;
};
const ProjectDetail: NextPageWithLayout<Props> = ({ infoProjectDetail }) => {
  const params = useParams();
  const projectId =
    typeof params?.projectId === 'string' ? params.projectId : '';
  const [projectDetail, setProjectDetail] =
    useState<ProjectType>(infoProjectDetail);

  useEffect(() => {
    setProjectDetail(infoProjectDetail);
  }, [infoProjectDetail]);
  return (
    <>
      <Breadcrumb
        pageName='Page Snapshot'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero.'
      />
      <section className='pb-[120px] pt-[20px]'>
        <div className='container'>
          {projectId ? (
            <ProjectDetailPage
              projectId={projectId}
              infoProjectDetail={projectDetail}
              setProjectDetail={setProjectDetail}
            />
          ) : (
            <div>Loading</div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;

ProjectDetail.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

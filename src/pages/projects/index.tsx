import { Layout } from '@/components/layout';
import Breadcrumb from '@/components/pages/Common/Breadcrumb';
import { ListProject } from '@/components/pages/Project/ListProject';
import { ProjectType } from '@/models/project.model';
import { NextPageWithLayout } from '@/pages/_app';
import { ReactNode } from 'react';

type Props = {
  projecList: ProjectType[];
};

const Projects: NextPageWithLayout<Props> = ({ projecList }) => {
  return (
    <>
      <Breadcrumb
        pageName='Management Projects'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero.'
      />
      <section className='pb-[120px]'>
        <div className='container'>
          <ListProject listProjectData={projecList} />
        </div>
      </section>
    </>
  );
};

export default Projects;

Projects.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

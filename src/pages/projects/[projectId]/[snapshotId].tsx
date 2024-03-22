import { Layout } from '@/components/layout';
import Breadcrumb from '@/components/pages/Common/Breadcrumb';
import { CompareImagePage } from '@/components/pages/CompareImagePage';
import { NextPageWithLayout } from '@/pages/_app';
import { GetServerSideProps } from 'next';
import { ReactNode } from 'react';

type Props = {
  projectId: string;
  snapShotId: string;
};

const ProjectDetailPage: NextPageWithLayout<Props> = ({
  projectId,
  snapShotId,
}) => {
  return (
    <>
      <Breadcrumb
        pageName='Page Snapshot Compare'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero.'
      />
      <section className='pb-[120px] pt-[20px]'>
        <div className='container'>
          <CompareImagePage projectId={projectId} snapShotId={snapShotId} />
        </div>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const projectId = params?.projectId;
  const snapShotId = params?.snapshotId;

  if (!projectId || !snapShotId) {
    return { notFound: true };
  }

  return { props: { projectId, snapShotId } };
};

ProjectDetailPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default ProjectDetailPage;

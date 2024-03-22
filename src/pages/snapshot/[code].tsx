import { Layout } from '@/components/layout';
import { ListPageSnapShot } from '@/components/pages/PageSnapShot/ListPageSnapShot';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Blog Details Page | Free Next.js Template for Startup and SaaS',
  description: 'This is Blog Details Page for Startup Nextjs Template',
  // other metadata
};

const SnapshotPage = () => {
  return (
    <div style={{ paddingTop: 100 }}>
      <ListPageSnapShot />
    </div>
  );
};

export default SnapshotPage;

SnapshotPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

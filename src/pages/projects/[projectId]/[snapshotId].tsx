import { Layout } from '@/components/layout';
import Breadcrumb from '@/components/pages/Common/Breadcrumb';
import { CompareImagePage } from '@/components/pages/CompareImagePage';
import { NextPageWithLayout } from '@/pages/_app';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type Props = {
	projectId: string;
	snapShotId: string;
};

const ProjectDetailPage: NextPageWithLayout = () => {
	const router = useRouter();
	const { projectId, snapshotId } = router.query;

	return (
		<>
			<Breadcrumb
				pageName="Page Snapshot Compare"
				description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
			/>
			<section className="pb-[120px] pt-[20px]">
				<div className="container">
					<CompareImagePage
						projectId={projectId as string}
						snapShotId={snapshotId as string}
					/>
				</div>
			</section>
		</>
	);
};

ProjectDetailPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default ProjectDetailPage;

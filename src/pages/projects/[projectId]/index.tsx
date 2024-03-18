import { Layout } from '@/components/layout';
import Breadcrumb from '@/components/pages/Common/Breadcrumb';
import { ListPageSnapShot } from '@/components/pages/ProjectDetail/ListPageSnapShot';
import { ProjectType } from '@/models/project.model';
import { NextPageWithLayout } from '@/pages/_app';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

type Props = {
	infoProjectDetail: ProjectType;
};

const ProjectDetailPage: NextPageWithLayout<Props> = ({
	infoProjectDetail,
}) => {
	const [projectDetail, setProjectDetail] =
		useState<ProjectType>(infoProjectDetail);
	const router = useRouter();

	const { projectId } = router.query;
	useEffect(() => {
		setProjectDetail(infoProjectDetail);
	}, [infoProjectDetail]);

	return (
		<>
			<Breadcrumb
				pageName="Page Snapshot"
				description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
			/>
			<section className="pb-[120px] pt-[20px]">
				<div className="container">
					<ListPageSnapShot
						projectId={projectId as string}
						infoProjectDetail={projectDetail}
						setProjectDetail={setProjectDetail}
					/>
				</div>
			</section>
		</>
	);
};

export default ProjectDetailPage;

ProjectDetailPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

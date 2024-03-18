import { Layout } from '@/components/layout';
import Breadcrumb from '@/components/pages/Common/Breadcrumb';
import { ListPageSnapShot } from '@/components/pages/ProjectDetail/ListPageSnapShot';
import { ProjectType } from '@/models/project.model';
import { NextPageWithLayout } from '@/pages/_app';
import { getDetailProject } from '@/services/project';
import { uniqueId } from 'lodash';
import { GetServerSideProps } from 'next';
import { ReactNode, useEffect, useState } from 'react';

type Props = {
	infoProjectDetail: ProjectType;
};

const ProjectDetailPage: NextPageWithLayout<Props> = ({
	infoProjectDetail,
}) => {
	const [projectDetail, setProjectDetail] =
		useState<ProjectType>(infoProjectDetail);

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
						infoProjectDetail={projectDetail}
						setProjectDetail={setProjectDetail}
					/>
				</div>
			</section>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const projectId = params?.projectId;

	if (typeof projectId !== 'string') {
		return { notFound: true };
	}

	try {
		const getProjectDetail = await getDetailProject(projectId);
		const infoProjectDetail = getProjectDetail.data;
		const key = uniqueId();

		return {
			props: {
				infoProjectDetail,
				key,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

export default ProjectDetailPage;

ProjectDetailPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

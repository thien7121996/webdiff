import { Layout } from '@/components/layout';
import Breadcrumb from '@/components/pages/Common/Breadcrumb';
import { ListProject } from '@/components/pages/Project/ListProject';
import { ProjectType } from '@/models/project.model';
import { NextPageWithLayout } from '@/pages/_app';
import { getProject } from '@/services/project';
import { parseCookieString } from '@/utils/cookie/getCookies';
import { uniqueId } from 'lodash';
import { GetServerSideProps } from 'next';
import { ReactNode } from 'react';

type Props = {
	projecList: ProjectType[];
};

const Projects: NextPageWithLayout<Props> = ({ projecList }) => {
	return (
		<>
			<Breadcrumb
				pageName="Management Projects"
				description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
			/>
			<section className="pb-[120px]">
				<div className="container">
					<ListProject listProjectData={projecList} />
				</div>
			</section>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const cookieToken = { value: '' };
	const { cookie } = req.headers;
	if (cookie) {
		const cookieObject = parseCookieString(cookie);
		if (cookieObject) {
			cookieToken.value = cookieObject.uuid;
		}
	} else {
		return {
			notFound: true,
		};
	}

	try {
		const getProjectList = await getProject(cookieToken.value);
		const projecList = getProjectList.data;
		const key = uniqueId();

		return {
			props: {
				projecList,
				key,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};
export default Projects;

Projects.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

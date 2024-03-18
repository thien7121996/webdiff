import Breadcrumb from '@/components/admin/Breadcrumbs/Breadcrumb';

import DefaultLayout from '@/components/admin/Layouts/DefaultLayout';
import { Projects } from '@/components/admin/Projects';
import { ReactNode } from 'react';

const ProjectsAdminPage = () => {
	return (
		<>
			<Breadcrumb pageName="Manage Projects" />
			<div className="flex flex-col gap-10">
				<Projects />
			</div>
		</>
	);
};

export default ProjectsAdminPage;

ProjectsAdminPage.getLayout = (children: ReactNode) => (
	<DefaultLayout>{children}</DefaultLayout>
);

import Breadcrumb from '@/components/admin/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout';

import { ProjectDetail } from '@/components/admin/ProjectDetail';
import { ReactNode } from 'react';

const AdminProjectDetailPage = () => {
	return (
		<>
			<Breadcrumb pageName="Project Detail" />
			<div className="flex flex-col gap-10">
				<ProjectDetail />
			</div>
		</>
	);
};

export default AdminProjectDetailPage;

AdminProjectDetailPage.getLayout = (children: ReactNode) => (
	<DefaultLayout>{children}</DefaultLayout>
);

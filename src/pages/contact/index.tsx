import { Layout } from '@/components/layout';
import Breadcrumb from '@/components/pages/Common/Breadcrumb';
import Contact from '@/components/pages/Contact';

import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
	title: 'Contact Page | Free Next.js Template for Startup and SaaS',
	description: 'This is Contact Page for Startup Nextjs Template',
	// other metadata
};

const ContactPage = () => {
	return (
		<>
			<Breadcrumb
				pageName="Contact Page"
				description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
			/>

			<Contact />
		</>
	);
};

export default ContactPage;

ContactPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

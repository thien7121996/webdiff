import { Layout } from '@/components/layout';
import AboutSectionOne from '@/components/pages/About/AboutSectionOne';
import AboutSectionTwo from '@/components/pages/About/AboutSectionTwo';
import Breadcrumb from '@/components/pages/Common/Breadcrumb';

import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
	title: 'About Page | Free Next.js Template for Startup and SaaS',
	description: 'This is About Page for Startup Nextjs Template',
	// other metadata
};

const AboutPage = () => {
	return (
		<>
			<Breadcrumb
				pageName="About Page"
				description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
			/>
			<AboutSectionOne />
			<AboutSectionTwo />
		</>
	);
};

export default AboutPage;

AboutPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

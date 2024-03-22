import ECommerce from '@/components/admin/Dashboard/E-commerce';
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout';
import { rule } from '@/constants/users';
import { getUserInfo } from '@/services/user';
import { parseCookieString } from '@/utils/cookie/getCookies';
import { uniqueId } from 'lodash';

import { GetServerSideProps, Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Contact Page | Free Next.js Template for Startup and SaaS',
  description: 'This is Contact Page for Startup Nextjs Template',
};

const AdminPage = () => {
  return <ECommerce />;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookieToken = { value: '' };
  const { cookie } = req.headers;
  if (cookie) {
    const cookieObject = parseCookieString(cookie);
    if (cookieObject) {
      cookieToken.value = cookieObject.accessToken;
    }
  } else {
    return {
      redirect: {
        destination: '/projects',
        permanent: false,
      },
    };
  }

  try {
    const userInfo = await getUserInfo(cookieToken.value);
    const key = uniqueId();
    if (userInfo.data.rule === rule.ADMIN) {
      return {
        props: {
          userInfo,
          key,
        },
      };
    }

    return {
      redirect: {
        destination: '/projects',
        permanent: false,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/projects',
        permanent: false,
      },
    };
  }
};
export default AdminPage;

AdminPage.getLayout = (children: ReactNode) => (
  <DefaultLayout>{children}</DefaultLayout>
);

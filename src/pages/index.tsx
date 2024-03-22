import { Layout } from '@/components/layout';
import ScrollUp from '@/components/pages/Common/ScrollUp';
import Hero from '@/components/pages/Hero';
import { useAuthenticated } from '@/hooks/auth.hook';
import { parseCookieString } from '@/utils/cookie/getCookies';
import { GetServerSideProps, Metadata } from 'next';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

export const metadata: Metadata = {
  title: 'Free Next.js Template for Startup and SaaS',
  description: 'This is Home for Startup Nextjs Template',
  // other metadata
};

export default function Home() {
  const { push } = useRouter();
  const { user } = useAuthenticated();

  useEffect(() => {
    if (user) {
      push('/projects');
    } else {
      push('/signin');
    }
  }, [push, user]);

  return (
    <>
      <ScrollUp />
      <Hero />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookieToken = { value: '' };
  const { cookie } = req.headers;
  if (cookie) {
    const cookieObject = parseCookieString(cookie);
    if (cookieObject && cookieObject.uuid) {
      return {
        redirect: {
          destination: '/projects',
          permanent: false,
        },
      };
    }
  }

  return {
    redirect: {
      destination: '/signin',
      permanent: false,
    },
  };
};

Home.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

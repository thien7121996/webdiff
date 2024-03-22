import Loader from '@/components/admin/common/Loader';
import Providers from '@/configs/provider';
import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { ReactElement, ReactNode, useEffect, useState } from 'react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const inter = Inter({ subsets: ['latin'] });
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div
      id='main-layout'
      className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}
    >
      {loading ? (
        <Loader />
      ) : (
        <Providers>{getLayout(<Component {...pageProps} />)}</Providers>
      )}
    </div>
  );
}

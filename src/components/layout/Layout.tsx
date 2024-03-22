import { FC, PropsWithChildren } from 'react';
import Footer from './Footer';
import Header from './Header';
import ScrollToTop from './ScrollToTop';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
    </>
  );
};

Layout.displayName = 'Layout';

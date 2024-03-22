'use client';

import { ThemeProvider } from 'next-themes';
import { FC, PropsWithChildren } from 'react';

export const ThemeConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider attribute='class' enableSystem={false} defaultTheme='light'>
      {children}
    </ThemeProvider>
  );
};

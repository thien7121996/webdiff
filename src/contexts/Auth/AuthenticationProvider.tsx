import { auth } from '@/configs/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { FC, useEffect, useState } from 'react';

import { AuthenticationContext } from './Authentication.context';
type Props = {
  children: React.ReactNode;
};

export const AuthenticationProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userInfo = user as any;
        setUser(userInfo);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthenticationContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

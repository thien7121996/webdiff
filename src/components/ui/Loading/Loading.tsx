import React, { FC } from 'react';
import { LoadingComponent, LoadingWrapper } from './styles';

type Props = {
  isComponentLoading?: boolean;
  heightNumber?: string;
};

/** Loading Component */
export const Loading: FC<Props> = ({
  isComponentLoading,
  heightNumber = '200px',
}) => {
  return (
    <LoadingComponent
      isComponentLoading={isComponentLoading}
      heightNumber={heightNumber}
    >
      <LoadingWrapper />
    </LoadingComponent>
  );
};

Loading.displayName = 'Loading';

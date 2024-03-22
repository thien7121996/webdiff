import { CommitType } from '@/models/GetCommitsType';
import { FC } from 'react';
import { Commit } from './Commit';

type Props = {
  commits: CommitType[];
};

export const TableBody: FC<Props> = ({ commits }) => {
  return (
    <tbody>
      {commits.map((commit) => (
        <Commit key={commit.id} commit={commit} />
      ))}
    </tbody>
  );
};

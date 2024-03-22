import { SkeletonLoader } from '@/components/admin/common/SkeletonLoader';
import { Modal } from '@/components/ui/Modal';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { useParams } from 'next/navigation';
import { FC } from 'react';
import { PageVisualSnapshot } from './PageVisualSnapshot';
import { useVisualSnapshots } from './visualSnapshots.hooks';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedPageSnapshot?: Omit<PageSnapShotType, 'pageVisualSnapShot'>;
};

export const VisualSnapshotsModel: FC<Props> = ({
  selectedPageSnapshot,
  onClose,
  isOpen,
}) => {
  const params = useParams();

  const { isError, isLoading, visualSnapshots } = useVisualSnapshots(
    params.projectId as string,
    selectedPageSnapshot?.id as string
  );

  if (!selectedPageSnapshot) {
    return null;
  }

  return (
    <Modal
      widthModal='90%'
      title={'Page visual snapshots'}
      open={isOpen}
      onClose={onClose}
    >
      <div>
        {isError && <div>Error</div>}
        {isLoading && <SkeletonLoader />}
        {visualSnapshots?.map((visualSnapshot, index) => (
          <PageVisualSnapshot
            key={visualSnapshot.id}
            visualId={visualSnapshot.id}
            visualPath={visualSnapshot.path}
            ordinalNumber={index + 1}
            visualReference={visualSnapshot.reference}
            pageSnapshotUrl={selectedPageSnapshot?.url}
          />
        ))}
      </div>
    </Modal>
  );
};

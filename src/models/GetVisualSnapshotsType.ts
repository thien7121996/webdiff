import { PageVisualSnapShot } from './pageVisualSnapshot.model';

export type GetVisualSnapshotsRequest = {
	pageSnapshotId: string;
	projectId: string;
};

export type GetVisualSnapshotsResponse = {
	data: PageVisualSnapShot[];
	message: string;
};

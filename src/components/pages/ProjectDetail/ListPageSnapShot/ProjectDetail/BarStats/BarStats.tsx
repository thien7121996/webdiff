import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { FC } from 'react';

type Props = {
	countPages: number;
	infoProjectDetailId?: string;
	listUrlScan?: PageSnapShotType[];
	handleScreenShotJobQueue: (
		projectId: string,
		listUrlScan: PageSnapShotType[],
		isVisual: boolean
	) => void;
};
export const BarStats: FC<Props> = ({
	countPages,
	infoProjectDetailId,
	listUrlScan,
	handleScreenShotJobQueue,
}) => {
	return (
		<div className="mb-10 flex justify-between gap-x-6 py-5 bg-white p-4 px-4 py-16 ring-1 ring-gray-200 dark:ring-gray-700  drop-shadow-md focus:outline-none rounded-2xl">
			<div className="flex min-w-0 gap-x-4 basis-1/2">
				<div className="min-w-0 flex-auto">
					<p className="mt-1 truncate leading-5 text-gray-500 title-xxl mb-5 font-bold text-gray-900">
						ID PROJECT : {infoProjectDetailId}
					</p>
					<button
						onClick={() => {
							infoProjectDetailId &&
								listUrlScan &&
								handleScreenShotJobQueue(
									infoProjectDetailId,
									listUrlScan,
									false
								);
						}}
						className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-auto mr-2 text-small"
					>
						Screenshot base
					</button>
					<button
						onClick={() => {
							infoProjectDetailId &&
								listUrlScan &&
								handleScreenShotJobQueue(
									infoProjectDetailId,
									listUrlScan,
									true
								);
						}}
						className="bg-emerald-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-auto text-small"
					>
						Screenshot visual check
					</button>
				</div>
			</div>
			<div className="flex flex-nowrap justify-between text-slate-950 basis-1/2">
				<div className="text-center">
					<h6 className="text-3xl font-bold text-deep-purple-accent-400 text-slate-950">
						{countPages}
					</h6>
					<p className="font-bold">Pages</p>
				</div>
				<div className="text-center">
					<h6 className="text-3xl font-bold text-deep-purple-accent-400 text-slate-950">
						0
					</h6>
					<p className="font-bold">Success</p>
				</div>
				<div className="text-center">
					<h6 className="text-3xl font-bold text-deep-purple-accent-400">0</h6>
					<p className="font-bold">Failed</p>
				</div>
				<div className="text-center">
					<h6 className="text-3xl font-bold text-deep-purple-accent-400">0</h6>
					<p className="font-bold">Fnished at</p>
				</div>
			</div>
		</div>
	);
};

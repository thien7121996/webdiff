import { FC } from 'react';

type Props = {
	userId: string;
	urlLogin?: string;
	projectId: string;
	projectName: string;
	hasBasicAuth?: boolean;
	passwordLogin?: string;
	userNameLogin?: string;
	hasPageLogin?: boolean;
	pageSnapshotCount: number;
	passwordBasicAuth?: string;
	userNameBasicAuth?: string;
};

export const BarStats: FC<Props> = ({
	passwordBasicAuth,
	userNameBasicAuth,
	pageSnapshotCount,
	passwordLogin,
	userNameLogin,
	hasBasicAuth,
	hasPageLogin,
	projectName,
	projectId,
	urlLogin,
	userId,
}) => {
	return (
		<div className="mb-10 flex justify-between gap-x-6 py-5 bg-white p-4 px-4 py-16 ring-1 ring-gray-200 dark:ring-gray-700  drop-shadow-md focus:outline-none rounded-2xl">
			<div className="flex min-w-0 gap-x-4 basis-1/2">
				<div className="min-w-0 flex-auto">
					<p className="text-emerald-950 mt-1 truncate leading-5 text-gray-500 title-xxl mb-2 font-bold text-gray-900">
						PROJECT ID: {projectId}
					</p>
					<p className="text-emerald-950 mt-1 truncate leading-5 text-gray-500 title-xxl mb-2 font-bold text-gray-900">
						PROJECT NAME: {projectName}
					</p>
					{hasBasicAuth && (
						<>
							<p className="text-emerald-950 mt-1 truncate leading-5 text-gray-500 title-xxl mb-1 font-bold text-gray-900">
								BASIC AUTH USERNAME: {userNameBasicAuth}
							</p>
							<p className="text-emerald-950 mt-1 truncate leading-5 text-gray-500 title-xxl mb-1 font-bold text-gray-900">
								BASIC AUTH PASSWORD: {passwordBasicAuth}
							</p>
						</>
					)}
					{hasPageLogin && (
						<>
							<p className="text-emerald-950 mt-1 truncate leading-5 text-gray-500 title-xxl mb-1 font-bold text-gray-900">
								LOGIN PASSWORD: {passwordLogin}
							</p>
							<p className="text-emerald-950 mt-1 truncate leading-5 text-gray-500 title-xxl mb-1 font-bold text-gray-900">
								LOGIN USERNAME: {userNameLogin}
							</p>
						</>
					)}
					<p className="text-emerald-950 mt-1 truncate leading-5 text-gray-500 title-xxl mb-1 font-bold text-gray-900">
						LOGIN URL: {urlLogin}
					</p>
				</div>
			</div>
			<div className="flex flex-nowrap justify-between text-slate-950 basis-1/2">
				<div className="text-center flex flex-col justify-center">
					<h6 className="text-3xl font-bold text-deep-purple-accent-400 text-slate-950">
						{pageSnapshotCount}
					</h6>
					<p className="font-bold">Pages</p>
				</div>
				<div className="text-center flex flex-col justify-center">
					<h6 className="text-3xl font-bold text-deep-purple-accent-400 text-slate-950">
						0
					</h6>
					<p className="font-bold">Success</p>
				</div>
				<div className="text-center flex flex-col justify-center">
					<h6 className="text-3xl font-bold text-deep-purple-accent-400">0</h6>
					<p className="font-bold">Failed</p>
				</div>
				<div className="text-center flex flex-col justify-center">
					<h6 className="text-3xl font-bold text-deep-purple-accent-400">0</h6>
					<p className="font-bold">Finished at</p>
				</div>
			</div>
		</div>
	);
};

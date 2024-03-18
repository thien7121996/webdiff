import { ComparePercentType, TOTAL_PERCENT } from '@/hooks/compareImage.hooks';
import { FC } from 'react';

type Props = {
	comparePercent: ComparePercentType;
};

export const ProcessBar: FC<Props> = ({ comparePercent }) => {
	const { diff, match } = comparePercent;

	return (
		<div className="px-10">
			<div className="flex w-full justify-center items-center bg-gray-200 rounded-full h-8 dark:bg-gray-700">
				{diff || match ? (
					<>
						<div
							className={`${TOTAL_PERCENT === match ? 'rounded-full' : 'rounded-l-lg'} overflow-hidden flex justify-center items-center bg-blue-600 h-8 h-4`}
							style={{ width: `${match}%` }}
						>
							{match < 4 ? null : `${match}%`}
						</div>
						<div
							className={`${TOTAL_PERCENT === diff ? 'rounded-full' : 'rounded-r-lg'} overflow-hidden flex justify-center items-center bg-red-600 h-8 h-4`}
							style={{ width: `${diff}%` }}
						>
							{diff < 4 ? null : `${diff}%`}
						</div>
					</>
				) : (
					<div>0%</div>
				)}
			</div>
		</div>
	);
};

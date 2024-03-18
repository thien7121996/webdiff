import Loader from '@/components/admin/common/Loader';
import { FC, RefObject } from 'react';

type Props = {
	imageWrapperRef: RefObject<HTMLTableCellElement>;
	imageACanvasRef: RefObject<HTMLCanvasElement>;
	imageBCanvasRef: RefObject<HTMLCanvasElement>;
	diffRef: RefObject<HTMLCanvasElement>;
	isLoading: boolean;
};

export const DiffImages: FC<Props> = ({
	imageACanvasRef,
	imageBCanvasRef,
	imageWrapperRef,
	isLoading,
	diffRef,
}) => {
	const LoadingComponent = isLoading && <Loader />;

	return (
		<div className="relative overflow-hidden select-none">
			<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							Base Web
						</th>
						<th scope="col" className="px-2 py-2">
							Current Web
						</th>
						<th scope="col" className="px-6 py-3">
							Diff
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 h-full">
						<td className="px-6 py-4 align-top w-1/3" ref={imageWrapperRef}>
							{LoadingComponent}
							{!isLoading && (
								<canvas ref={imageACanvasRef} className="w-full" />
							)}
						</td>
						<td className="px-6 py-4 align-top w-1/3">
							{LoadingComponent}
							{!isLoading && (
								<canvas ref={imageBCanvasRef} className="w-full" />
							)}
						</td>
						<td className="px-6 py-4 align-top w-1/3">
							{LoadingComponent}
							{!isLoading && <canvas ref={diffRef} className="w-full" />}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

DiffImages.displayName = 'DiffImages';

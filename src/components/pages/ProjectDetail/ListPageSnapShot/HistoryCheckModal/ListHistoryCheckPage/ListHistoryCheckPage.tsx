import { useNotification } from '@/hooks/useNotification';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { PageVisualSnapShot } from '@/models/pageVisualSnapshot.model';
import {
	changeVisualReference,
	deleteVisualSnapshot,
} from '@/services/visualSnapshot';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

type Props = {
	pageSnapShot?: PageSnapShotType;
	handleGetDetailProject: () => Promise<void>;
};

export const ListHistoryCheckPage: FC<Props> = ({
	pageSnapShot,
	handleGetDetailProject,
}) => {
	const [listPageVisualCheck, setListPageVisualCheck] = useState<
		PageVisualSnapShot[]
	>([]);
	const [activeDropdown, setActiveDropdown] = useState(false);

	const { setNotification } = useNotification();
	const { projectId } = useParams();
	const pathname = usePathname();

	useEffect(() => {
		if (pageSnapShot?.pageVisualSnapShot) {
			setListPageVisualCheck(pageSnapShot.pageVisualSnapShot);
		}
	}, [pageSnapShot?.pageVisualSnapShot]);

	const handleChangeReference = async (
		projectId: string,
		pageSnapShotId: string,
		pageVisualSnapShotId: string
	) => {
		try {
			await changeVisualReference({
				projectId,
				pageSnapShotId,
				pageVisualSnapShotId,
			});
			handleGetDetailProject();
			setNotification({
				type: 'success',
				message: 'Change reference successfully',
			});
		} catch (error) {
			setNotification({
				type: 'error',
				message: 'Change reference failed',
			});
		}
	};

	const handleDeleteVisual = async (
		projectId: string,
		pageSnapshotId: string,
		visualSnapshotId: string
	) => {
		try {
			await deleteVisualSnapshot({
				projectId,
				pageSnapshotId,
				visualSnapshotId,
			});
			handleGetDetailProject();
			setNotification({
				type: 'success',
				message: 'Delete visual snapshot successfully',
			});
		} catch (error) {
			setNotification({
				type: 'error',
				message: 'Delete visual snapshot failed',
			});
		}
	};

	return (
		<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
			<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" className="p-4">
						<div className="flex items-center">
							<input
								id="checkbox-all"
								type="checkbox"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label htmlFor="checkbox-all" className="sr-only">
								checkbox
							</label>
						</div>
					</th>
					<th scope="col" className="px-6 py-3">
						ID
					</th>
					<th scope="col" className="px-6 py-3">
						Snapshot name
					</th>
					<th scope="col" className="px-6 py-3">
						Status
					</th>
					<th scope="col" className="px-6 py-3">
						Reference
					</th>
					<th scope="col" className="px-6 py-3">
						Action
					</th>
				</tr>
			</thead>
			<tbody>
				{pageSnapShot &&
					listPageVisualCheck.map((snapShotVisualItem, index) => (
						<tr
							key={snapShotVisualItem.id}
							className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
						>
							<td className="w-4 p-4">
								<div className="flex items-center">
									<input
										id="checkbox-table-1"
										type="checkbox"
										className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									/>
									<label htmlFor="checkbox-table-1" className="sr-only">
										checkbox
									</label>
								</div>
							</td>
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
							>
								{snapShotVisualItem.id}
							</th>
							<td className="px-6 py-4">
								#{index + 1}: {pageSnapShot.url}
							</td>
							<td className="px-6 py-4">
								{snapShotVisualItem.path ? 'ScreenShot' : 'Not ScreenShot'}
							</td>
							<td className="px-6 py-4">
								{snapShotVisualItem.reference ? 'Reference' : 'No reference'}
							</td>
							<td className="px-6 py-4 gap-2 flex">
								<div className="relative right-0">
									<button
										id="dropdownInformationButton"
										data-dropdown-toggle="dropdownInformation"
										className="group text-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-left inline-flex items-center"
										type="button"
										onClick={() => setActiveDropdown(!activeDropdown)}
									>
										<svg
											className="w-5 h-5"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 16 3"
										>
											<path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
										</svg>

										<div className="hidden group-hover:block z-10 absolute top-8 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
											<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
												<div>History action</div>
											</div>
											<ul
												className="py-2 text-sm text-gray-700 dark:text-gray-200"
												aria-labelledby="dropdownInformationButton"
											>
												<li>
													<a
														href="#"
														onClick={() =>
															pageSnapShot.id &&
															snapShotVisualItem.id &&
															handleDeleteVisual(
																projectId as string,
																pageSnapShot.id,
																snapShotVisualItem.id
															)
														}
														className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
													>
														Delete
													</a>
												</li>
												<li>
													{pageSnapShot && (
														<Link
															href={`${pathname}/${pageSnapShot.id}`}
															rel="noopener noreferrer"
															target="_blank"
															className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
														>
															View Check Visual
														</Link>
													)}
												</li>
												<li>
													{!snapShotVisualItem.reference && (
														<button
															onClick={() =>
																pageSnapShot.id &&
																snapShotVisualItem.id &&
																handleChangeReference(
																	projectId as string,
																	pageSnapShot.id,
																	snapShotVisualItem.id
																)
															}
															className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
														>
															Change Reference
														</button>
													)}
												</li>
											</ul>
										</div>
									</button>
								</div>
							</td>
						</tr>
					))}
			</tbody>
		</table>
	);
};

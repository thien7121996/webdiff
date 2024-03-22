import { FC } from 'react';

type Props = {
	visualId: string;
	pageSnapshotUrl: string;
	visualPath: string;
	ordinalNumber: number;
	visualReference: boolean;
};

export const PageVisualSnapshot: FC<Props> = ({
	visualReference,
	pageSnapshotUrl,
	ordinalNumber,
	visualPath,
	visualId,
}) => {
	return (
		<div>
			<table className="w-full">
				<thead></thead>
				<tbody>
					<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 w-full">
						<td className="p-4">
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
						<td
							scope="row"
							className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							{visualId}
						</td>
						<td className="px-6 py-4">
							#{ordinalNumber}: {pageSnapshotUrl}
						</td>
						<td className="px-6 py-4">
							{!!visualPath
								? 'Screenshot available'
								: 'Screenshot not available'}
						</td>
						<td className="px-6 py-4">
							{visualReference ? 'Reference' : 'No reference'}
						</td>
						<td className="px-6 py-4 gap-2 flex">
							<div className="relative right-0">
								<button
									id="dropdownInformationButton"
									data-dropdown-toggle="dropdownInformation"
									className="group text-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-left inline-flex items-center"
									type="button"
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

									<div className="z-104 hidden group-hover:block z-10 absolute top-8 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
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
													// onClick={() =>
													// 	pageSnapShot.id &&
													// 	visualId &&
													// 	handleDeleteVisual(
													// 		projectId as string,
													// 		pageSnapShot.id,
													// 		visualId
													// 	)
													// }
													className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
												>
													Delete
												</a>
											</li>
											{/* <li>
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
												</li> */}
										</ul>
									</div>
								</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

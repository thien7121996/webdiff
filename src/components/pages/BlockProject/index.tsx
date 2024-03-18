import Link from 'next/link';
import { FC, useState } from 'react';

type Props = {
	handleDeleteProject: (projectId: string) => void;
	projectData: any;
};

const BlockProject: FC<Props> = ({ projectData, handleDeleteProject }) => {
	const { id, name, userId } = projectData;
	const [activeDropdown, setActiveDropdown] = useState(false);

	return (
		<>
			<div className="relative whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-4 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
				<div className="mb-2 flex items-center gap-3">
					<Link
						href={`/projects/${id}`}
						className="block font-sans text-base font-medium leading-relaxed tracking-normal text-blue-gray-900 antialiased transition-colors hover:text-pink-500 text-gray-900"
					>
						{name}
					</Link>
					<div className="center relative inline-block select-none whitespace-nowrap rounded-full bg-purple-500 py-1 px-2 align-baseline font-sans text-xs font-medium capitalize leading-none tracking-wide text-white">
						<div className="mt-px">Public</div>
					</div>
					<div className="absolute right-0">
						<button
							id="dropdownInformationButton"
							data-dropdown-toggle="dropdownInformation"
							className="text-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
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
						</button>
						{activeDropdown && (
							<div
								id="dropdownInformation"
								className="z-10 absolute top-8 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
							>
								<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
									<div>Project action</div>
									<div className="font-medium truncate">{name}</div>
								</div>
								<ul
									className="py-2 text-sm text-gray-700 dark:text-gray-200"
									aria-labelledby="dropdownInformationButton"
								>
									<li>
										<a
											href="#"
											className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
										>
											Edit
										</a>
									</li>
									<li>
										<a
											href="#"
											className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
										>
											Deactive
										</a>
									</li>
								</ul>
								<div className="py-2">
									<a
										href="#"
										onClick={() => handleDeleteProject(id)}
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
									>
										Delete
									</a>
								</div>
							</div>
						)}
					</div>
				</div>
				<p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
					{userId}
				</p>
				<div className="mt-4 flex items-center gap-5">
					<div className="flex items-center gap-1">
						<span className="h-3 w-3 rounded-full bg-blue-400"></span>
						<p className="block font-sans text-xs font-normal text-gray-700 antialiased">
							Project Base
						</p>
					</div>
					<div className="flex items-center gap-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							aria-hidden="true"
							className="-mt-px h-4 w-4 text-green-300"
						>
							<path
								fill-rule="evenodd"
								d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
								clip-rule="evenodd"
							></path>
						</svg>
						<p className="block font-sans text-xs font-normal text-gray-700 antialiased">
							Veritied
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default BlockProject;

import { FC, useEffect, useState } from 'react';

import { useProject } from '@/hooks/project.hook';
import { ProjectType } from '@/models/project.model';

import BlockProject from '@/components/pages/BlockProject';
import { BlockProjectAdd } from '@/components/ui/Project/BlockProjectAdd';

import { useIsFirstRender } from '@/hooks/useFirstRender';
import { useNotification } from '@/hooks/useNotification';
import { deleteProject } from '@/services/project';

type Props = {
	listProjectData: ProjectType[];
};

export const ListProject: FC<Props> = ({ listProjectData }) => {
	const [listProjects, setListProjects] =
		useState<ProjectType[]>(listProjectData);

	const [reloadData, setReloadData] = useState(false);
	const { setNotification } = useNotification();

	const { getListProjects, projectList, loading } = useProject();
	const isFirstRender = useIsFirstRender();

	useEffect(() => {
		if (reloadData) {
			setReloadData(false);
			getListProjects();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reloadData]);

	useEffect(() => {
		if (isFirstRender) {
			getListProjects();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setListProjects(projectList);
	}, [projectList, loading]);

	const handleDeleteProject = async (projectId: string) => {
		try {
			await deleteProject(projectId);
			setNotification({
				type: 'success',
				message: 'Delete project successfully!',
			});
			setReloadData(true);
		} catch (error) {
			setNotification({
				type: 'success',
				message: 'Delete project fail!',
			});
		}
	};
	return (
		<div>
			<div className="flex justify-between items-center mb-8">
				<BlockProjectAdd setReloadData={setReloadData} />
			</div>
			<div className="-mx-4 flex flex-wrap justify-start">
				{listProjects.map(project => (
					<div
						key={project.id}
						className="w-full px-2 md:w-2/3 lg:w-1/2 xl:w-1/4 mb-4"
					>
						<BlockProject
							projectData={project}
							handleDeleteProject={handleDeleteProject}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

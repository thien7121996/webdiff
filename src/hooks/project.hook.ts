/* eslint-disable react-hooks/exhaustive-deps */
import { useHandleError } from '@/hooks/useHandleError';
import { useCallback, useState } from 'react';

import { ProjectType } from '@/models/project.model';
import { getProject } from '@/services/project';
import { Cookie, getCookie } from '@/utils/cookie';

export const useProject = () => {
  const { handleError } = useHandleError();
  const [projectList, setProjectList] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(false);

  const getListProjects = useCallback(async () => {
    const uuid = getCookie(Cookie.UUID);
    if (!uuid) {
      return handleError(new Error('UUID not found'));
    }

    try {
      setLoading(true);
      const listProject = await getProject(uuid);
      setProjectList(listProject.data);
    } catch (e) {
      handleError(e);
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  return {
    getListProjects,
    projectList,
    loading,
  };
};

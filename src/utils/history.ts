import { history } from '$redux/store';

export const openProjects = () => history.push('/listProject');

export const openProject = (projectId: string) => {
  history.push(`/project/${projectId}`);
};

export const openScreen = (projectId: string, screenId: string) => (
  history.push(`/project/${projectId}/screen/${screenId}`)
);

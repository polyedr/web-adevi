export interface IProjectScreens {
  id: string,
  name: string,
  previewUrl: string,
  imageUrl: string,
}

export interface IProject {
  id: string,
  status: string,
  name: string,
  countScreens: number,
  projectScreens: IProjectScreens[],
  select: boolean,
}

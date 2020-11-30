import {ProjectDto} from '../dto/project-dto';

export class ProjectDtoWithUserIds {
  project: ProjectDto;
  watcherIds: number[];

  constructor(project: ProjectDto, watcherIds: number[]) {
    this.project = project;
    this.watcherIds = watcherIds;
  }
}

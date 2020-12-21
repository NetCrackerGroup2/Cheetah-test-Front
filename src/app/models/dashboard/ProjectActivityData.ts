import {Series} from '@swimlane/ngx-charts';

export class ProjectActivityData {
  name = 'Total projects';
  series: Series;

  constructor(series: Series) {
    this.series = series;
  }
}

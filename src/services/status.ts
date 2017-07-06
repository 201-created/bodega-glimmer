import Service from './-utils/service';
import { tracked } from '@glimmer/component';

export default class StatusService extends Service {
  @tracked errorMessage = null;
}


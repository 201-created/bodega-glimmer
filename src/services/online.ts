import Service from './-utils/service';
import { tracked } from '@glimmer/component';

export default class OnlineService extends Service {

  _online = () => {
    this.isOnline = true;
    this.notify();
  };
  _offline = () => {
    this.isOnline = false;
    this.notify();
  };

  @tracked isOnline = null;

  constructor(options) {
    super(options);

    this.isOnline = (
      self.navigator ? self.navigator.onLine : true
    );

    self.addEventListener('online', this._online);
    self.addEventListener('offline', this._offline);
  }

  destroy() {
    self.removeEventListener('online', this._online);
    self.removeEventListener('offline', this._offline);
  }
}

import Service from './-utils/service';

export default class LocalStorage extends Service {
  static create() {
    return self.localStorage;
  }
}

export default class Service {

  destroy: () => void;

  static create(options) {
    return new this(options);
  }

  constructor(options) {
    Object.assign(this, options);
  }
}

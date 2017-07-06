export default class Service {

  static create(options) {
    return new this(options);
  }

  constructor(options) {
    Object.assign(this, options);
  }
}

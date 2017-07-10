import Component, { tracked } from '@glimmer/component';

export default class BodegaSuccess extends Component {
  @tracked charge: Object;

  constructor(options) {
    super(options);
    this.charge = this.args.charge;
  }

  goToIndex() {
    this.args.goToIndex();
  }
};

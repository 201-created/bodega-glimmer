import Component, { tracked } from '@glimmer/component';
import ApplePay from '../../../services/apple-pay';

export default class BodegaCart extends Component {
  applePay: ApplePay;

  @tracked('applePay.isAvailable')
  get applePayIsAvailable() {
    return this.applePay.isAvailable;
  }

}

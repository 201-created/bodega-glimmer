import Component, { tracked } from '@glimmer/component';
import ApplePay from '../../../services/apple-pay';
import trackService from '../../../utils/tracked';

@trackService('applePay')
export default class BodegaCart extends Component {
  applePay: ApplePay;

  @tracked('applePay')
  get applePayIsAvailable() {
    return this.applePay.isAvailable;
  }
}

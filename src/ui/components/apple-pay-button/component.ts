import Online from '../../../services/online';
import Status from '../../../services/status';
import ApplePay from '../../../services/apple-pay';
import Cart from '../../../services/cart';
import Component, { tracked } from '@glimmer/component';
import trackService from '../../../utils/tracked';
import { createCharge } from '../../../utils/api';

@trackService('online')
@trackService('status')
@trackService('cart')
@trackService('applePay')
export default class ApplePayButton extends Component {
  online: Online;
  status: Status;
  applePay: ApplePay;
  cart: Cart;

  private _notify = null;

  /**
   * This used to track 'online' and 'args', and the bodega-cart would invoke this component
   * by passing in an arg 'disabled' that was based on whether the cart was empty.
   * There is a bug with glimmer and properties derived from tracking 'args', though, so
   * we use the 'cart' service here directly, instead.
   * See: https://github.com/glimmerjs/glimmer-component/issues/66
   */
  @tracked('online', 'cart')
  get isDisabled() {
    let isOffline = !this.online.isOnline;
    return isOffline || this.cart.isEmpty;
  }

  beginApplePay() {
    let item = this.args.item;
    let price = item.price;

    let paymentRequest = {
      requiredShippingContactFields: ['email', 'postalAddress'],
      countryCode: 'US',
      currencyCode: 'USD',
      total: {
        label: 'Stripe.com',
        amount:  price / 100 + ''
      }
    };

    this.applePay.charge(paymentRequest).then(({ result, notify }) => {
      console.log('applePay.charge.then:',result,notify);
      let params = assign({}, result.shippingContact, {
        token: result.token.id,
        price,
        item,
        description: `201 Created Sticker: ${item.name}`
      });

      this._notify = notify;
      return createCharge(params);
    }).then((payload) => {
      console.log('created charge:',payload);
      this.cart.clear();
      this._notify.success();

      // route to success, passing in the chargeData
      this.args.didCompletePayment(payload);
    }).catch(() => {
      this.errorMessage = 'Purchase failed';
      this._notify.failure();
    }).then(() => {
      this._notify = null;
    });
  }
}
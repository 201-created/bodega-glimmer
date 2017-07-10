import Online from '../../../services/online';
import Status from '../../../services/status';
import Cart from '../../../services/cart';
import StripeCheckoutService from '../../../services/stripe-checkout';
import Component, { tracked } from '@glimmer/component';
import trackService from '../../../utils/tracked';
import { createCharge } from '../../../utils/api';

@trackService('online')
@trackService('status')
@trackService('cart')
@trackService('stripeCheckout')
export default class StripeCheckout extends Component {
  online: Online;
  status: Status;
  cart: Cart;
  stripeCheckout: StripeCheckoutService;

  _handler: any;

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

  @tracked('online')
  get title() {
    return this.online.isOnline ?
      'Pay with Credit Card' :
      'Go online to purchase';
  }

  _shippingAddress(addresses) {
    let names = addresses.shipping_name.split(' ');
    let givenName = names[0];
    let familyName = names[names.length - 1];

    return {
      givenName,
      familyName,
      addressLines: [ addresses.shipping_address_line1 ],
      locality: addresses.shipping_address_city,
      administrativeArea: addresses.shipping_address_state,
      postalCode: addresses.shipping_address_zip,
      countryCode: addresses.shipping_address_country_code
    };
  }

  _saveCharge(token, addresses) {
    let item = this.args.item;
    let price = item.price;

    let shippingAddress = this._shippingAddress(addresses);
    let params = Object.assign({}, shippingAddress, {
      token: token.id,
      emailAddress: token.email,
      price,
      item,
      description: `201 Created Sticker: ${item.name}`
    });

    let chargeData = params;

    createCharge(chargeData).then((payload) => {
      this.cart.clear();

      // route to success, passing in the chargeData
      this.args.didCompletePayment(payload);
    }).catch(e => {
      window.alert('There was an error with your purchase');
      // set and display error message "Purchase Failed"
    });
  }

  checkout() {
    let tokenCallback = this._saveCharge.bind(this);
    this._handler = this.stripeCheckout.createHandler(tokenCallback);

    this._handler.open({
      name: '201 Created, Inc',
      description: '201 Created Sticker',
      amount: this.args.item.price
    });
  }

  willDestroyElement() {
    if (this._handler) {
      this._handler.close();
    }
  }
}

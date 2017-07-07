import Online from '../../../services/online';
import Status from '../../../services/status';
import Cart from '../../../services/cart';
import StripeCheckoutService from '../../../services/stripe-checkout';
import Component, { tracked } from '@glimmer/component';
import trackService from '../../../utils/tracked';

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

  _saveCharge(token, addresses) {
    this.cart.clear();
  }

  checkout() {
    this.status.errorMessage = null;

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

/*
  errorMessage: computed.alias('status.errorMessage'),

  title: computed('online.isOnline', function() {
    return !this.get('online.isOnline') ?
      'Checkout is not available when you are offline' :
      'Pay with Credit Card';
  }),

  willDestroyElement() {
    if (this.handler) {
      this.handler.close();
    }

    this._super(...arguments);
  },

  actions: {
    checkout() {
      this.set('errorMessage', null);

      let tokenCallback = this._saveCharge.bind(this);
      this.handler = this.get('stripeCheckout').createHandler(tokenCallback);

      this.handler.open({
        name: '201 Created, Inc',
        description: '201 Created Sticker',
        amount: this.get('item.price')
      });
    }
  }
});
*/

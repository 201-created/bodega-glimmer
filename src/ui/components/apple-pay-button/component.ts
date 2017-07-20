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
      console.log('created charg:',payload);
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

/*
export default Component.extend({
  stripe: inject.service(),
  applePay: inject.service(),
  store: inject.service(),
  router: inject.service(),
  cart: inject.service(),
  status: inject.service(),
  online: inject.service(),

  isAvailable: computed.readOnly('applePay.isAvailable'),
  errorMessage: computed.alias('status.errorMessage'),
  isDisabled: computed('online.isOnline', 'disabled', function() {
    return !this.get('online.isOnline') || this.get('disabled');
  }),

  title: computed('online.isOnline', function() {
    return !this.get('online.isOnline') ?
      'Apple Pay is not available when you are offline' :
      'Pay with Apple Pay';
  }),

  init() {
    this._super(...arguments);
    this.get('applePay');
  },

  actions: {
    beginApplePay() {
      this.set('errorMessage', null);

      let item = this.get('item');
      let price = get(item, 'price');
      let paymentRequest = {
        requiredShippingContactFields: ['email', 'postalAddress'],
        countryCode: 'US',
        currencyCode: 'USD',
        total: {
          label: 'Stripe.com',
          amount:  price / 100 + ''
        }
      };

      let router = this.get('router');

      this.get('applePay').charge(paymentRequest).then(({ result, notify }) => {
        let store = this.get('store');
        let params = assign({}, result.shippingContact, {
          token: result.token.id,
          price,
          item,
          description: `201 Created Sticker: ${get(item, 'name')}`
        });
        let charge = store.createRecord('charge', params);

        charge.save().then(() => {
          if (this.get('isDestroyed')) { return; }

          notify.success();
          this.get('cart').clear();

          router.transitionTo('success', charge);
        }).catch(() => {
          if (this.get('isDestroyed')) { return; }
          this.set('errorMessage', 'Purchase failed');
          notify.failure();
        });
      }, (error) => {
        if (this.get('isDestroyed')) { return; }
        this.set('errorMessage', error.message);
      });
    }
  }
});
*/

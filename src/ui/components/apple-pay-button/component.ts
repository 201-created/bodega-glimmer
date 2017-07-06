import Online from '../../../services/online';
import Status from '../../../services/status';
import Component, { tracked } from '@glimmer/component';
import trackService from '../../../utils/tracked';

@trackService('online')
@trackService('status')
export default class ApplePayButton extends Component {
  online: Online;
  status: Status;

  @tracked('online', 'args')
  get isDisabled() {
    return !this.online.isOnline || this.args.disabled;
  }
};

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

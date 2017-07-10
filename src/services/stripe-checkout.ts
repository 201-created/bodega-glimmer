import Service from './-utils/service';
import { tracked } from '@glimmer/component';
import settings from '../utils/env-settings';

export default class StripeCheckoutService extends Service {
  createHandler(tokenCallback) {
    if (self.StripeCheckout) {
      return self.StripeCheckout.configure({
        key: settings.stripeKey,
        image: '/assets/images/icons/stripe-checkout-logo.png',
        locale: 'auto',
        shippingAddress: true,
        billingAddress: true,
        token: tokenCallback
      });
    }
  }
}

import Service from './-utils/service';
import { tracked } from '@glimmer/component';
import settings from '../utils/env-settings';
import loadScript from './-utils/load-script';

export default class StripeCheckoutService extends Service {
  createHandler(tokenCallback) {
    return loadScript('https://checkout.stripe.com/checkout.js').then(() => {
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

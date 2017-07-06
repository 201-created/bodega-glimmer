import Service from './-utils/service';
import { tracked } from '@glimmer/component';

export default class StripeCheckoutService extends Service {
  createHandler(tokenCallback) {
    if (self.StripeCheckout) {
      return self.StripeCheckout.configure({
        key: 'pk_test_SrD06JdAhT0DZvBEK8SZ9aiB',
        image: '/assets/images/icons/stripe-checkout-logo.png',
        locale: 'auto',
        shippingAddress: true,
        billingAddress: true,
        token: tokenCallback
      });
    }
  }
}

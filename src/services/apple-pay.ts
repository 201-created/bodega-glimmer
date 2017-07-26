import Service from './-utils/service';
import { tracked } from '@glimmer/component';
import loadScript from './-utils/load-script';

export default class ApplePay extends Service {

  @tracked isAvailable = self.location.protocol === 'https:' && self.ApplePaySession && self.ApplePaySession.canMakePayments();

  constructor(options) {
    super(options);
    if (this.isAvailable) {
      loadScript('https://js.stripe.com/v2/').then(() => {
        if (!self.Stripe.applePay) {
          this.revokeAvailability();
        }
        self.Stripe.applePay.checkAvailability((result) => {
          if (!result) {
            this.revokeAvailability();
          }
        });
      });
    }
  }

  revokeAvailability() {
    this.isAvailable = false;
    this.notify();
  }

  charge(paymentRequest) {
    return new Promise((resolve, reject) => {
      self.Stripe.applePay.buildSession(
        paymentRequest,
        buildApplePaySuccessHandler(resolve, reject),
        (error) => {
          throw error;
        }
      ).begin();
    });
  }
}

function buildApplePaySuccessHandler(resolve, reject) {
  return function successHandlerResolution(result, completion) {
    if (result) {
      completion(self.ApplePaySession.STATUS_SUCCESS);
      resolve();
    } else {
      completion(self.ApplePaySession.STATUS_FAILURE);
      reject();
    }
  }
}

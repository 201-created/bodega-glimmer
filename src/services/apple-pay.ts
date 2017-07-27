import Service from './-utils/service';
import { tracked } from '@glimmer/component';
import loadScript from './-utils/load-script';
import settings from '../utils/env-settings';

export default class ApplePay extends Service {

  @tracked isAvailable = self.location.protocol === 'https:' && self.ApplePaySession && self.ApplePaySession.canMakePayments();

  constructor(options) {
    super(options);
    if (this.isAvailable) {
      loadScript('https://js.stripe.com/v2/').then(() => {
        if (!self.Stripe.applePay) {
          this.revokeAvailability();
        }
        self.Stripe.setPublishableKey(settings.stripeKey);
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
        buildApplePaySuccessHandler(resolve),
        (error) => {
          console.error('Stripe.applePay Error:',error);
          reject(error);
        }
      ).begin();
    });
  }
}

function buildApplePaySuccessHandler(resolve) {
  return function successHandlerResolution(result, completion) {
    resolve({
      result,
      notify: {
        success() { completion(self.ApplePaySession.STATUS_SUCCESS); },
        failure() { completion(self.ApplePaySession.STATUS_FAILURE); }
      }
    });
  }
}

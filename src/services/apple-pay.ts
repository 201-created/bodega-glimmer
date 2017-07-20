import Service from './-utils/service';
import { tracked } from '@glimmer/component';
import loadScript from './-utils/load-script';

export default class ApplePay extends Service {

  @tracked isAvailable = self.ApplePaySession && self.ApplePaySession.canMakePayments();

  revokeAvailability(message = 'Sorry, ApplePay is not available on this device.') {
    this.isAvailable = false;
    this.notify();
    throw new Error(message);
  }

  charge(paymentRequest) {
    return loadScript('https://js.stripe.com/v2/').then(() => {
      if (!self.Stripe.applePay) {
        this.revokeAvailability();
      }

      return new Promise(resolve => {
        self.Stripe.applePay.checkAvailability((result) => {
          if (!result) {
            this.revokeAvailability();
          }
          resolve();
        });
      });
    }).then(() => {
      return new Promise((resolve, reject) => {
        self.Stripe.applePay.buildSession(
          paymentRequest,
          buildSuccessHandler(resolve),
          reject
        ).begin();
      });
    }).catch(e => {
      self.alert(`There was an error in the checkout process: ${e.message}`);
      throw e;
    });
  }
}

function buildSuccessHandler(resolve) {
  return function successHandlerResolution(result, completion) {
    resolve({
      result,

      notify: {
        success() {
          completion(self.ApplePaySession.STATUS_SUCCESS);
        },

        failure() {
          completion(self.ApplePaySession.STATUS_FAILURE);
        }
      }
    });
  }
}

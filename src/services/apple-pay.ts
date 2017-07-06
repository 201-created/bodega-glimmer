import Service from './-utils/service';
import { tracked } from '@glimmer/component';

export default class ApplePay extends Service {

  @tracked isAvailable = false;

  constructor(options) {
    super(options);
    if (self.Stripe && self.Stripe.applePay) {
      self.Stripe.applePay.checkAvailability((result) => {
        this.isAvailable = result;
      });
    }
  }

  charge(paymentRequest) {
    return new Promise((resolve, reject) => {
      self.Stripe.applePay.buildSession(
        paymentRequest,
        buildSuccessHandler(resolve),
        reject
      ).begin();
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

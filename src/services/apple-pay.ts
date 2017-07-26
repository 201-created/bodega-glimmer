import Service from './-utils/service';
import { tracked } from '@glimmer/component';
import loadScript from './-utils/load-script';

export default class ApplePay extends Service {

  @tracked isAvailable = self.location.protocol === 'https:' && self.ApplePaySession && self.ApplePaySession.canMakePayments();

  constructor(options) {
    super(options);
    loadScript('https://js.stripe.com/v2/').then(() => {
      console.log('eagerly loaded');
      if (!self.Stripe.applePay) {
        this.revokeAvailability();
      }
      self.Stripe.applePay.checkAvailability((result) => {
        console.log('checked availability, got',result);
        if (!result) {
          this.revokeAvailability();
        }
      });
    });
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
          console.log('error with stripe apple pay',error);
          throw error;
        }
      ).begin();
    });
  }
}

function buildApplePaySuccessHandler(resolve, reject) {
  return function successHandlerResolution(result, completion) {
    console.log('success!',result,completion);
    if (result) {
      completion(self.ApplePaySession.STATUS_SUCCESS);
      resolve();
    } else {
      completion(self.ApplePaySession.STATUS_FAILURE);
      reject();
    }
  }
}

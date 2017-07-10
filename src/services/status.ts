import Service from './-utils/service';
import { tracked } from '@glimmer/component';

export default class StatusService extends Service {
  @tracked errorMessage = null;
  @tracked charge = null;
  @tracked didCompletePayment = false;

  didCompletePaymentWithCharge(charge) {
    return new StatusService({errorMessage: null, charge, didCompletePayment: true});
  }
}
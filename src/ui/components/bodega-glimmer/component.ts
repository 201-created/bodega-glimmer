import Cart from '../../../services/cart';
import Component, { tracked } from '@glimmer/component';
import trackService from '../../../utils/tracked';
import { getItems } from '../../../utils/api';

@trackService('cart')
@trackService('status')
export default class BodegaGlimmer extends Component {
  cart: Cart;
  @tracked charge: Object;

  @tracked items = [];
  @tracked currentRouteName = "index";

  constructor(options) {
    super(options);
    getItems().then(items => {
      this.items = items.data.map(item => {
        return {
          ...item.attributes,
          id: item.id
        }
      });
    });
  }

  goToIndex() {
    this.currentRouteName = "index";
  }

  increment(lineItem) {
    this.cart.increment(lineItem);
  }

  decrement(lineItem) {
    this.cart.decrement(lineItem);
  }

  didCompletePayment(charge) {
    this.charge = charge;
    this.currentRouteName = 'success';
  }
}

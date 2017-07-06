import Component, { tracked } from '@glimmer/component';
import Cart from '../../../services/cart';
import trackService from '../../../utils/tracked';

@trackService('cart')
export default class ShowItem extends Component {
  cart: Cart;

  @tracked('args')
  get priceInDollars() {
    return this.args.item.price / 100;
  }

  addToCart() {
    this.cart.addItem(this.args.item);
  }

  didInsertElement() {
    this.args.afterRender();
  }
}

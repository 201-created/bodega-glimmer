import Cart from '../../../services/cart';
import Component from '@glimmer/component';

export default class BodegaGlimmer extends Component {
  cart: Cart;

  get items() {
    return [
      {
        id: 'abc',
        name: 'Sticker 1',
        url: `https://lorempixel.com/400/200/abstract/1/`,
        price: 199
      },
      {
        id: '123',
        name: 'Sticker 2',
        url: `https://lorempixel.com/400/200/abstract/2/`,
        price: 299
      }
    ];
  }

  increment(lineItem) {
    this.cart.increment(lineItem);
  }

  decrement(lineItem) {
    this.cart.decrement(lineItem);
  }
}

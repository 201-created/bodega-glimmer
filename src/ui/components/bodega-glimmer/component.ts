import Component from '@glimmer/component';

export default class BodegaGlimmer extends Component {
  cart: any;

  get items() {
    return [
      {
        id: 'abc',
        name: 'Sticker 1',
        url: `http://lorempixel.com/400/200/abstract/1/`,
        price: 199
      },
      {
        id: '123',
        name: 'Sticker 2',
        url: `http://lorempixel.com/400/200/abstract/2/`,
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

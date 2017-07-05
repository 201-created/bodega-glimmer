import Component, { tracked } from '@glimmer/component';

export default class ShowItem extends Component {
  cart: any;

  @tracked order = new Object();

  @tracked('args.item.price')
  get priceInDollars() {
    return this.args.item.price / 100;
  }

  addToCart() {
    this.cart.addItem(this.args.item);
    // use cart service
    //       this.get('cart').addItem(this.get('item'));
    console.log('addToCart');
  }
}
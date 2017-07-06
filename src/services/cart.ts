import Order from './-utils/order';
import { tracked } from '@glimmer/component';

export default class CartService {
  @tracked order = new Order([]);

  static create(options) {
    return new this(options);
  }

  constructor(options) {
    Object.assign(this, options);
  }

  addItem(item) {
    this.order = this.order.addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      url: item.url
    });
  }

  increment(lineItem) {
    this.order = this.order.increment(lineItem);
  }

  decrement(lineItem) {
    this.order = this.order.decrement(lineItem);
  }
}

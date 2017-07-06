import Service from './-utils/service';
import Order from './-utils/order';
import { tracked } from '@glimmer/component';

export default class CartService extends Service {
  localStorage: any;

  _order: any = null;

  @tracked
  get order() {
    if (!this._order) {
      let persistedJSON = this.localStorage.order;
      let orderData = persistedJSON ? JSON.parse(persistedJSON) : [];
      this._order = (new Order(orderData));
    }
    return this._order;
  }
  set order(value) {
    this._order = value;
    let json = JSON.stringify(value.serialize());
    this.localStorage.order = json;
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

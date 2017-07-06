

export default class Order {
  items: any;
  lineItems: any;
  price: Number;
  name: String;
  quantity: Number;

  constructor(items) {
    this.items = items;
    this.lineItems = buildLineItems(items);
    this.price = lineItemsPrice(this.lineItems);
    this.name = orderName(this.lineItems);
    this.quantity = items.length;
  }

  addItem(item) {
    return new Order([...this.items, item]);
  }

  decrement(lineItem) {
    let found = false;
    let itemId = lineItem.itemId;
    let items = this.items;
    let nextItems = [];

    for (let i = 0; i < items.length; i++) {
      let item = items[i];

      if (found || item.id !== itemId) {
        nextItems.push(items[i]);
      } else {
        found = true;
      }
    }

    return new Order(nextItems);
  }

  increment(lineItem) {
    let item = this.items.find(i => i.id === lineItem.itemId);
    return new Order([...this.items, item]);
  }

  serialize() {
    return this.items;
  }
}

function buildLineItems(items) {
  let lineItemsByItemId = {};

  items.forEach((item) => {
    let lineItem = lineItemsByItemId[item.id];

    if (!lineItem) {
      lineItemsByItemId[item.id] = {
        name: item.name,
        itemId: item.id,
        price: item.price,
        quantity: 1,
        multiple: false,
        url: item.url
      };
    } else {
      lineItem.price += item.price;
      lineItem.quantity++;
      lineItem.multiple = lineItem.quantity > 1;
    }
  });

  return Object.keys(lineItemsByItemId).map((id) => lineItemsByItemId[id]);
}

function lineItemsPrice(lineItems) {
  return lineItems.reduce((sum, item) => {
    return item.price + sum;
  }, 0);
}

function orderName(lineItems) {
  return lineItems.map((li) => {
    let quantity = li.quantity;
    let name = li.name;

    if (quantity === 1) {
      return name;
    }

    return `${name} (${quantity}x)`;
  }).join(', ');
}

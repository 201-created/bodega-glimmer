import settings from './env-settings';

const { apiBase: API_BASE } = settings;
const URLS = {
  CREATE_CHARGE: `${API_BASE}/charges`,
  GET_ITEMS: `${API_BASE}/items`
}

function serializeCharge(chargeData) {
  let {
    price, token, description, givenName, familyName, emailAddress, addressLines, locality, administrativeArea, postalCode, countryCode    
  } = chargeData;

  // Note: In the templates, the order appears to be renamed as "item". Use the correct name here.
  let order = chargeData.item;
  
  return JSON.stringify({
    data: {
      attributes: {
        price, token, description, givenName, familyName, emailAddress, addressLines, locality, administrativeArea, postalCode, countryCode
      },
      relationships: {
        item: {
          data: { name: order.name, price: order.price }
        }
      }
    }
  }); 
}

function deserializeCharge(payload) {
  let { data: { 
        id,
        attributes: {
          price, token, description, givenName, familyName, emailAddress, addressLines, locality, administrativeArea,
          postalCode, countryCode
        }
      } } = payload;

  return { id, price, token, description, givenName, familyName, emailAddress, addressLines, locality, administrativeArea,
           postalCode, countryCode };
}

export function createCharge(chargeData) {
  let opts = {
    method: 'post',
    headers: { 'Content-Type': 'application/json'},
    body: serializeCharge(chargeData)
  };
  return self.fetch(URLS.CREATE_CHARGE, opts).then(result => result.json()).then(deserializeCharge);
}

export function getItems() {
  return Promise.resolve().then(() => {
    return { data: [
      { id: "1", type: "item", attributes: { name: "Seat", price: 199, url: "/assets/images/seat.jpg" } },
      { id: "2", type: "item", attributes: { name: "Touch", price: 199, url: "/assets/images/fingers.jpg" } },
      { id: "3", type: "item", attributes: { name: "Space", price: 199, url: "/assets/images/space.jpg" } }
    ]};
  });
}

const env = 'development';
let API_BASE;
if (env === "production") {
  API_BASE = "https://api.shop-201.com/api";
} else {
  API_BASE = "https://localhost:3000/api";
}
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
  return self.fetch(URLS.GET_ITEMS).then(result => result.json());
}
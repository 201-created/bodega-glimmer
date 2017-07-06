import App from './main';
import { ComponentManager, setPropertyDidChange } from '@glimmer/component';

const app = new App();
const containerElement = document.getElementById('app');

setPropertyDidChange(() => {
  app.scheduleRerender();
});

app.registerInitializer({
  initialize(registry) {
    registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager);
  }
});

app.registerInitializer({
  initialize(registry) {
    registry.registerInjection(`component`, `cart`, `service:cart`);
    registry.registerInjection(`component`, `applePay`, `service:apple-pay`);
    registry.registerInjection(`component`, `online`, `service:online`);
    registry.registerInjection(`component`, `status`, `service:status`);
    registry.registerInjection(`component`, `stripeCheckout`, `service:stripe-checkout`);
    registry.registerOption(`service:local-storage`, 'instantiate', false);
    registry.registerInjection(`service:cart`, `localStorage`, `service:local-storage`);
  }
});

app.renderComponent('bodega-glimmer', containerElement, null);

app.boot();

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
    registry.registerOption(`service:local-storage`, 'instantiate', false);
    registry.registerInjection(`service:cart`, `localStorage`, `service:local-storage`);
  }
});

app.renderComponent('bodega-glimmer', containerElement, null);

app.boot();

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
  }
});

app.renderComponent('bodega-glimmer', containerElement, null);

app.boot();

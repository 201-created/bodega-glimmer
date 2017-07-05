import { setupRenderingTest } from '@glimmer/test-helpers';
import hbs from '@glimmer/inline-precompile';

const { module, test } = QUnit;

module('Component: bodega-glimmer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await this.render(hbs`<bodega-glimmer />`);
    assert.equal(this.containerElement.textContent, 'Welcome to Glimmer!\n');
  });
});

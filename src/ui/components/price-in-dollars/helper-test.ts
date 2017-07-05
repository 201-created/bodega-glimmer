import priceInDollars from './helper';

const { module, test } = QUnit;

module('Helper: price-in-dollars', function(hooks) {
  test('it computes', function(assert) {
    assert.equal(priceInDollars([199]), 1.99);
  });
});

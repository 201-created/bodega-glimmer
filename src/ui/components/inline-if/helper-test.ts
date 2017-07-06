import inlineIf from './helper';

const { module, test } = QUnit;

module('Helper: inline-if', function(hooks) {
  test('it computes', function(assert) {
    assert.equal(inlineIf([false, '', 'fffalse']), 'fffalse');
  });
});

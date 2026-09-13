const assert = require('node:assert/strict');
const test = require('node:test');

const { nextMenuState } = require('../app.js');

test('nextMenuState opens a closed menu', () => {
  const result = nextMenuState(false);

  assert.equal(result.isOpen, true);
  assert.equal(result.ariaExpanded, 'true');
  assert.equal(result.ariaLabel, 'Close navigation menu');
});

test('nextMenuState closes an open menu', () => {
  const result = nextMenuState(true);

  assert.equal(result.isOpen, false);
  assert.equal(result.ariaExpanded, 'false');
  assert.equal(result.ariaLabel, 'Open navigation menu');
});

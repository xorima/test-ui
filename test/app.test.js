import assert from 'node:assert/strict';
import test from 'node:test';

import { nextMenuState } from '../app.js';

test('nextMenuState opens a closed menu', () => {
  const result = nextMenuState(false);

  assert.equal(result.isOpen, true);
  assert.equal(result.ariaExpanded, 'true');
});

test('nextMenuState closes an open menu', () => {
  const result = nextMenuState(true);

  assert.equal(result.isOpen, false);
  assert.equal(result.ariaExpanded, 'false');
});

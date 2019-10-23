import ChordDetector from 'chord-practice/utils/chord-detector';
import { module, test } from 'qunit';

module('Unit | Utility | chord-detector', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    assert.equal(
      ChordDetector.identify('').toString(),
      'Error: Notes collection is not an array'
    );
    assert.equal(
      ChordDetector.identify({}).toString(),
      'Error: Notes collection is not an array'
    );

    assert.equal(ChordDetector.identify([]), '');
    assert.equal(ChordDetector.identify(['c']), 'c');
    assert.equal(ChordDetector.identify(['c4', 'a4']), 'M6');
    assert.equal(ChordDetector.identify(['g', 'c', 'e'])[0], 'C/G');
  });
});

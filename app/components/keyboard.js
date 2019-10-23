import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
  data: null,
  lowestNote: 'C2',
  highestNote: 'B5',
  blackKeyClass: 'black-key key',
  whiteKeyClass: 'white-key key',
  octaveWidthinPixels: 280,

  init() {
    this._super(...arguments);
    this.set('data', A([]));
    this.createKeyboard();
  },

  createKeyboard() {
    let i;
    const self = this;
    for (i = 0; i < this.numberOfOctaves; i++) {
      self.createOctaveWithKeys(
        i + Number(self.startingOctave),
        0 + self.octaveWidthinPixels * i,
        self.whiteKeyClass,
        self.blackKeyClass
      );
    }
  },

  numberOfWhiteKeys: computed('octavesToCreate', function() {
    return this.octavesToCreate * 7;
  }),

  octaveWidth: computed('numberOfWhiteKeys', function() {
    return `width: ${this.numberOfOctaves * this.octaveWidthinPixels}px;`;
  }),

  createOctaveWithKeys(octave, startingKeyWidth, whiteKeyClass, blackKeyClass) {
    const self = this;
    this.set('data', [
      ...self.data,
      {
        hotkey: '',
        note: 'C',
        octave: octave,
        class: whiteKeyClass,
        style: `width: 40px; height: 200px; left: ${0 + startingKeyWidth}px ;`
      },
      {
        hotkey: '',
        note: 'C#',
        octave: octave,
        class: blackKeyClass,
        style: `width: 30px; height: 120px; left: ${25 + startingKeyWidth}px`
      },
      {
        hotkey: '',
        note: 'D',
        octave: octave,
        class: whiteKeyClass,
        style: `width: 40px; height: 200px; left: ${40 + startingKeyWidth}px ;`
      },
      {
        hotkey: '',
        note: 'D#',
        octave: octave,
        class: blackKeyClass,
        style: `width: 30px; height: 120px; left: ${65 + startingKeyWidth}px`
      },
      {
        hotkey: '',
        note: 'E',
        octave: octave,
        class: whiteKeyClass,
        style: `width: 40px; height: 200px; left: ${80 + startingKeyWidth}px ;`
      },
      {
        hotkey: '',
        note: 'F',
        octave: octave,
        class: whiteKeyClass,
        style: `width: 40px; height: 200px; left: ${120 + startingKeyWidth}px ;`
      },
      {
        hotkey: '',
        note: 'F#',
        octave: octave,
        class: blackKeyClass,
        style: `width: 30px; height: 120px; left: ${145 + startingKeyWidth}px`
      },
      {
        hotkey: '',
        note: 'G',
        octave: octave,
        class: whiteKeyClass,
        style: `width: 40px; height: 200px; left: ${160 + startingKeyWidth}px ;`
      },
      {
        hotkey: '',
        note: 'G#',
        octave: octave,
        class: blackKeyClass,
        style: `width: 30px; height: 120px; left: ${185 + startingKeyWidth}px`
      },
      {
        hotkey: '',
        note: 'A',
        octave: octave,
        class: whiteKeyClass,
        style: `width: 40px; height: 200px; left: ${200 + startingKeyWidth}px`
      },
      {
        hotkey: '',
        note: 'A#',
        octave: octave,
        class: blackKeyClass,
        style: `width: 30px; height: 120px; left: ${225 + startingKeyWidth}px`
      },
      {
        hotkey: '',
        note: 'B',
        octave: octave,
        class: whiteKeyClass,
        style: `width: 40px; height: 200px; left: ${240 + startingKeyWidth}px`
      }
    ]);
  }
});

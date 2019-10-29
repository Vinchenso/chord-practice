import Component from '@ember/component';
import Vex from 'vexflow';

export default Component.extend({
  init() {
    this._super(...arguments);

    this.set('vf', Vex.Flow);
  },
  didInsertElement() {
    this._super(...arguments);

    this.set(
      'vf',
      new this.vf.Factory({
        renderer: { elementId: 'port', width: '150', height: '300' }
      })
    );
  },
  didRender() {
    this._super(...arguments);
    console.log('didRender');

    const staff = document.getElementById('port');
    while (staff.firstChild) {
      staff.removeChild(staff.firstChild);
    }

    this.set('vf', Vex.Flow);

    this.set(
      'vf',
      new this.vf.Factory({
        renderer: { elementId: 'port', width: '150', height: '300' }
      })
    );

    let system = this.vf.System();
    let score = this.vf.EasyScore();

    // let keys = ['D4', 'C4', 'E4'];
    // console.log(keys);
    let notesPressed = [];

    if (this.keys.length == 0) {
      notesPressed.push(score.voice(score.notes('G4/1/r')));
    } else {
      notesPressed = this.keys.map(note =>
        score.voice(score.notes(`${note.name}${note.octave}/1`))
      );
    }

    system
      .addStave({
        voices: notesPressed,
        options: { spacing_between_lines_px: 10 }
      })
      .addClef('treble');

    system
      .addStave({
        voices: [score.voice(score.notes('F4/1/r'))]
      })
      .addClef('bass');

    system.addConnector('singleLeft');

    this.vf.draw();
  },
  willDestroyElement() {
    this._super(...arguments);
    console.log('destroyer');
  }
});

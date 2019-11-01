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
        renderer: { elementId: 'port', width: '200', height: '800' }
      })
    );
  },
  didRender() {
    this._super(...arguments);

    const staff = document.getElementById('port');
    while (staff.firstChild) {
      staff.removeChild(staff.firstChild);
    }

    this.set('vf', Vex.Flow);

    this.set(
      'vf',
      new this.vf.Factory({
        renderer: { elementId: 'port', width: '200', height: '600' }
      })
    );

    this.vf.getContext().scale(1.5, 1.5);
    let system = this.vf.System({ spaceBetweenStaves: 6 });
    let score = this.vf.EasyScore();

    // let keys = ['D4', 'C4', 'E4'];
    // console.log(keys);
    let notesPressed = [];
    if (this.keys.length == 0) {
      notesPressed.push(score.voice(score.notes('G4/1/r[id="defaultNote"]')));
    } else {
      notesPressed = this.keys.map(note =>
        score.voice(score.notes(`${note.name}${note.octave}/1`))
      );
    }

    // let bassNotes = notesPressed.filter(note => {
    //   return note < 60;
    // });
    // let trebleNotes = notesPressed.filter(note => {
    //   return note >= 60;
    // });

    system
      .addStave({
        voices: notesPressed,
        y: -500,
        x: 500,
        options: { spacing_between_lines_px: 17, space_above_staff_ln: 6 }
      })
      .addClef('treble');

    system
      .addStave({
        voices: [score.voice(score.notes('C5/1[id="defaultNote"]'))],
        options: { spacing_between_lines_px: 17, space_above_staff_ln: 6 }
      })
      .addClef('bass');

    system.addConnector('singleLeft');

    this.vf.draw();

    const defaultNote = document.querySelectorAll('[id=vf-defaultNote]');
    defaultNote.forEach(function(node) {
      node.style.display = 'none';
    });
  }
});

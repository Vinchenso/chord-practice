import Component from '@ember/component';
import Vex from 'vexflow'

export default Component.extend({
 didInsertElement() {
    this._super(...arguments);

const VF = Vex.Flow;

var vf = new VF.Factory({
  renderer: {elementId: 'port', width: 300, height: 200}
});

var score = vf.EasyScore();
var system = vf.System();

system.addStave({
  voices: [score.voice(score.notes(`(B4 A4)/1`))]
}).addClef('treble');

vf.draw();

  },

  didRender(){
    return
  }
});

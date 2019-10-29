import Component from '@ember/component';
import Vex from 'vexflow';

export default Component.extend({
  init() {
    this._super(...arguments);

    this.set('vf', Vex.Flow);
  },
  didInsertElement() {
    this._super(...arguments);

    // this.set(
    // 'renderer',
    // new this.vf.Renderer(this.element, this.vf.Renderer.Backends.SVG)
    // );
    // this.renderer.resize(500, 500);
    this.set(
      'vf',
      new this.vf.Factory({
        renderer: { elementId: 'port', width: '150', height: '300' }
      })
    );
  },
  didRender() {
    this._super(...arguments);

    let system = this.vf.System();
    let score = this.vf.EasyScore();

    system
      .addStave({
        voices: [score.voice(score.notes('(C4 D4 E4 )/1'))]
      })
      .addClef('treble');

    system
      .addStave({
        voices: [score.voice(score.notes('F4/1/r'))]
      })
      .addClef('bass');

    system.addConnector();

    this.vf.draw();
  }
});

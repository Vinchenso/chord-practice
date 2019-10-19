import Component from '@ember/component';
import Vex from 'vexflow'

export default Component.extend({
init() {
    this._super(...arguments);

    this.set('vf', Vex.Flow);
  },
  didInsertElement() {
    this._super(...arguments);

    this.set('renderer', new this.vf.Renderer(this.element, this.vf.Renderer.Backends.SVG));
    this.renderer.resize(500, 500);
    this.set('vfContext', this.renderer.getContext());
    this.vfContext.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
  },
  didRender() {
    this._super(...arguments);

    let stave = new this.vf.Stave(10, 40, 400);
    stave.addClef("bass").addTimeSignature("4/4");
    stave.setContext(this.vfContext).draw();

    let dataNotes = [
      {clef: "bass", keys: ["c/2"], duration: "8"},
      {clef: "bass", keys: ["c/2"], duration: "8"},
      {clef: "bass", keys: ["d/2"], duration: "q"},
      {clef: "bass", keys: ["b/2"], duration: "q"},
      // {clef: "bass", keys: ["b/2"], duration: "q"},

    ];
    const self = this
    if(self.notes){
      dataNotes.push({clef: "bass", keys: ["b/2"], duration: "q"})
    }

    let notes = dataNotes.map(_note => new this.vf.StaveNote(_note));
    let voice = new this.vf.Voice({num_beats: 4, beat_value: 4});
    let formatter = new this.vf.Formatter();

    voice.addTickables(notes);
    formatter.joinVoices([voice]).format([voice], 400);

    voice.draw(this.vfContext, stave);
  }
});

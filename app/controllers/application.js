import Controller from '@ember/controller';
import WebMidi from 'webmidi'
import { computed } from '@ember/object';

export default Controller.extend({
  isEnabled: false,
  inputs: null,
  outputs: null,
  selectedOutput: null,
  selectedInput: null,

  actions: {
    enableMidi() {
      const self = this

      WebMidi.enable((e) => {
        self.set('isEnabled', true)
        self.set('inputs', WebMidi.inputs )
        self.set('outputs', WebMidi.outputs )
        if(e){
          alert(e)
        }
      },true)

    },
    disableMidi(){
      WebMidi.disable()
      this.set('isEnabled', false)
    },
    updateSelectedInput(e){
      this.set('selectedInput',e.target.value)
    },
    updateSelectedOutput(e){
      this.set('selectedOutput',e.target.value)
    },
    playNote(){
    this.output.playNote("G5", 12)
    .sendPitchBend(-0.5, 12, {time: 400}) // After 400 ms.
    .sendPitchBend(0.5, 12, {time: 800})  // After 800 ms.
    // .stopNote("G5", 12, {time: 5000});    // After 1.2 s.

    }

  },

  output: computed('selectedOutput', function(){
    return WebMidi.getOutputByName(this.selectedOutput);
  }),
  input: computed('selectedInput', function(){
    return WebMidi.getInputByName(this.selectedOutput);
  }),

});

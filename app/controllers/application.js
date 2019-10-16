import Controller from '@ember/controller';
import WebMidi from 'webmidi'

export default Controller.extend({
  isEnabled: false,
  inputs: null,
  outputs: null,

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
    }

  }
});

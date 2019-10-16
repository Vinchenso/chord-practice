import Controller from '@ember/controller';
import WebMidi from 'webmidi'

export default Controller.extend({
 isEnabled: false,

  actions: {
    enableMidi() {
      WebMidi.enable({},true)
    }
  }
});

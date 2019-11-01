import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { computed, action } from '@ember/object';

export default class KeyboardKey extends Component {
  @service midiController;

  @action
  keyup(note) {
    this.midiController.stopNote(note);
  }

  @action
  keydown(note) {
    this.midiController.playNote(note);
  }
  @computed
  get noteInfo() {
    return `${this.args.note}${this.args.octave}`;
  }
  @computed('midiController.noteValues.[]')
  get notePressed() {
    return this.midiController.noteValues.includes(this.noteInfo.toString());
  }
}

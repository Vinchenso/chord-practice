import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class KeyboardKey extends Component {
  @tracked pressed;

  @service midiController;

  @action
  keyup(note) {
    this.pressed = false;
    this.midiController.stopNote(note);
  }

  @action
  keydown(note) {
    this.pressed = true;
    this.midiController.playNote(note);
  }
}

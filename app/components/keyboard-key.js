import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
// import { tracked } from '@glimmer/tracking';

export default class KeyboardKey extends Component {
  @service midiController;

  @action
  toggle() {
    this.pressed = !this.pressed;
  }
}

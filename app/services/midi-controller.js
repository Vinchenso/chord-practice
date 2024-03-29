import WebMidi from 'webmidi';
import { computed, action } from '@ember/object';
import { A } from '@ember/array';
import ChordDetector from '../utils/chord-detector';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import s11 from 'sharp11';

export default class MidiControllerService extends Service {
  @tracked inputs;
  @tracked outputs;
  @tracked selectedOutput;
  @tracked selectedInput;
  @tracked sustain;

  @tracked isEnabled = false;
  @tracked currentNotes = [];

  contructor() {
    super.contructor(...arguments);
    this.currentNotes = [];
  }

  @action
  enableMidi() {
    const self = this;

    WebMidi.enable(e => {
      self.set('isEnabled', true);
      self.set('inputs', WebMidi.inputs);
      self.set('outputs', WebMidi.outputs);
      if (e) {
        alert(e);
      }
    }, true);
  }

  @action
  playNote(note) {
    if (this.selectedOutput == null) return;
    this.output.playNote(note);
  }

  @action
  stopNote(note) {
    if (this.selectedOutput == null) return;
    this.output.stopNote(note);
  }

  @action
  disableMidi() {
    WebMidi.removeListener();
    WebMidi.disable();
    this.set('isEnabled', false);
  }

  @action
  updateSelectedInput(e) {
    this.set('selectedInput', e.target.value);
    this.set('currentNotes', A([]));
    this.listen();
  }

  @action
  updateSelectedOutput(e) {
    this.set('selectedOutput', e.target.value);
  }

  listen() {
    const self = this;

    WebMidi.removeListener();
    this.input.addListener('noteon', 'all', e => {
      self.retrieveMidiNoteOn(e);
    });
    this.input.addListener('noteoff', 'all', e => {
      self.retrieveMidiNoteOff(e);
    });
    this.input.addListener('controlchange', 'all', e => {
      self.retrieveMidiControlChanges(e);
    });
  }

  retrieveMidiNoteOff(e) {
    let newArr = this.currentNotes.filter(item => {
      return item.value() != e.note.number;
    });

    this.set('currentNotes', A([...newArr]));
  }

  retrieveMidiNoteOn(e) {
    this.set(
      'currentNotes',
      A([...this.currentNotes, s11.note.fromValue(e.note.number)])
    );
  }

  @action
  removeNote(e) {
    let newArr = this.currentNotes.filter(item => {
      return item.value() != s11.note.create(e).value();
    });

    this.set('currentNotes', A([...newArr]));
  }

  @action
  addNote(e) {
    if (this.currentNotes.includes(e)) return;
    this.set('currentNotes', A([...this.currentNotes, s11.note.create(e)]));
  }

  retrieveMidiControlChanges(e) {
    let status = false;

    if (e.value > 0) {
      status = true;
    }
    this.sustain = status;
  }

  @computed('selectedOutput')
  get output() {
    return WebMidi.getOutputByName(this.selectedOutput);
  }

  @computed('selectedInput')
  get input() {
    return WebMidi.getInputByName(this.selectedInput);
  }

  @computed('currentNotes.[]', 'currentNotes')
  get noteValues() {
    return this.currentNotes.map(note => note.fullName);
  }

  @computed('currentNotes.[]', 'currentNotes')
  get knownChord() {
    if (this.currentNotes == null) return '';

    let name = ChordDetector.identify(this.noteValues);
    return name;
  }
}

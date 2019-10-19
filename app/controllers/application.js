import Controller from '@ember/controller';
import WebMidi from 'webmidi'
import { computed } from '@ember/object';
import { A } from '@ember/array';

import ChordDetector from '../utils/chord-detector'

export default Controller.extend({
  isEnabled: false,
  inputs: null,
  outputs: null,
  selectedOutput: null,
  selectedInput: null,
  sustain: false,
  currentNotes: null,


  init(){
this._super(...arguments);
    this.set('currentNotes', A([]));
  },

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
      this.set("currentNotes", A([]))
    },
    updateSelectedOutput(e){
      this.set('selectedOutput',e.target.value)
    },
    playNote(){
    this.output.playNote("G5", 12)
    .sendPitchBend(-0.5, 12, {time: 400}) // After 400 ms.
    .sendPitchBend(0.5, 12, {time: 800})  // After 800 ms.
    },
    listen(){
      const self = this
      this.input.addListener('noteon', "all", ((e) => { self.retrieveMidiNoteOn(e) } ))
      this.input.addListener('noteoff', "all", ((e) => { self.retrieveMidiNoteOff(e) } ))
      this.input.addListener('controlchange', "all",
        ((e) =>
          { self.retrieveMidiControlChanges(e) }
        ))
    }
  },

  retrieveMidiNoteOff(e){

    let newArr = this.currentNotes.filter((item) => {
      return item.number != e.note.number
    })

    this.set("currentNotes", A([...newArr]) )
  },

  retrieveMidiNoteOn(e){
    this.set("currentNotes", A([ ...this.currentNotes, e.note ]))
  },

  retrieveMidiControlChanges(e){

    let status = false

    if(e.value > 0 ) {
      status = true
    }

    this.set('sustain', status);
  },


  output: computed('selectedOutput', function(){
    return WebMidi.getOutputByName(this.selectedOutput);
  }),
  input: computed('selectedInput', function(){
    return WebMidi.getInputByName(this.selectedInput);
  }),
  knownChord: computed('currentNotes.[]','currentNotes', function(){
    let notes  = A([])
    this.currentNotes.map(note => notes.pushObject(note.name + note.octave) )
    let name = ChordDetector.identify(notes)
    return name
  })
});

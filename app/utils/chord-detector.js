import s11 from 'sharp11'
import teoria from 'teoria'
export default class ChordDetector{

  static identify(notes=[]){
    if (!Array.isArray(notes)) return Error('Notes collection is not an array')

    const self = this
    switch(notes.length){
      case 0: return ''
      case 1: return notes[0]
      case 2: return self.identifyInterval(notes[0],notes[1])
      default: return s11.chord.getPossibleChordNames(...notes)

    }
  }
  static identifyInterval(first,second){
    return teoria.interval(teoria.note(first), teoria.note(second)).toString()
  }
}

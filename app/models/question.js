import DS from 'ember-data';
const { Model, hasMany } = DS;

export default Model.extend({
  attempts: hasMany(),
  chordName: DS.attr(),
  notes: DS.attr('array')
});

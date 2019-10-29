import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr(),
  date: DS.attr("date"),
});

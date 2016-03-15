import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  originalUrl: attr('string'),
  mediumUrl:   attr('string'),
  thumbUrl:    attr('string')
});

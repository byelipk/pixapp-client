import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  filename:    attr('string'),
  fileSize:    attr('filesize'),
  contentType: attr('string'),
  originalUrl: attr('string'),
  mediumUrl:   attr('string'),
  thumbUrl:    attr('string'),
  ownerName:   attr('string')
});

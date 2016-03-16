import DS from 'ember-data';

const { attr, hasMany, belongsTo } = DS;

export default DS.Model.extend({
  text:     attr('string'),
  children: hasMany('directories', { inverse: "parent" }),
  parent:   belongsTo('directory', { inverse: "children" })
});

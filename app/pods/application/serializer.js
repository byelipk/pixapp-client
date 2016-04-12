import DS from 'ember-data';


// NOTE
// If we're ever having problems serializing
// the payload from the server into a proper
// JSONAPI document, we can fix it with these
// two hooks:

// let underscore = Ember.String.underscore;

export default DS.JSONAPISerializer.extend({
  // keyForAttribute: function(attr) {
  //   return underscore(attr);
  // },

  // keyForRelationship: function(rawKey) {
  //   return underscore(rawKey);
  // }
});

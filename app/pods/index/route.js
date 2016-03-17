import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      pictures: this.store.findAll('picture'),
      directories: this.store.findAll('directory')
    });
  }
});

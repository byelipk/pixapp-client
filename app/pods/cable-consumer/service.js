import Ember from 'ember';

export default Ember.Service.extend({
  cableService: Ember.inject.service('cable'),

  consumer: null,

  retrieve() {
    let consumer = this.get('consumer');

    if (consumer) {
      return consumer;
    }

    this.set('consumer', this.get('cableService').createConsumer("ws://localhost:4200/cable"));
    
    return this.get('consumer');
  }
});

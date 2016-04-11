import Ember from 'ember';

export default Ember.Controller.extend({
  cableService: Ember.inject.service('cable'),

  initCableService: Ember.on('init', function () {
    let consumer = this.get('cableService').createConsumer("ws://localhost:4200/cable");

    console.log(consumer);
  })

});

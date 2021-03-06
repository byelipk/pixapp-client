import Ember from 'ember';

export default Ember.Controller.extend({
  notify:        Ember.inject.service('notify'),
  cableConsumer: Ember.inject.service('cable-consumer'),

  initCableService: Ember.on('init', function () {
    // Create a consumer
    let notify   = this.get('notify');
    let consumer = this.get('cableConsumer').retrieve();

    // Create any number of subscriptions
    consumer.subscriptions.create({
      channel: "AppearancesChannel",
      room: "Welcome"
    }, {
      connected() {
        notify.info("You're connected to the Appearances Channel!");
      },

      received(data) {
        Ember.debug(data);
      },

      disconnected() {
        Ember.debug("AppearancesChannel#disconnected");
      }
    });
  })

});

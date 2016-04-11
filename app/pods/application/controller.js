import Ember from 'ember';

export default Ember.Controller.extend({
  notify:       Ember.inject.service('notify'),
  cableService: Ember.inject.service('cable'),

  initCableService: Ember.on('init', function () {
    // Create a consumer
    let notify   = this.get('notify');
    let consumer = this.get('cableService').createConsumer("ws://localhost:4200/cable");

    // Create any number of subscriptions
    consumer.subscriptions.create({
      channel: "AppearancesChannel",
      room: "Welcome"
    }, {
      connected() {
        notify.info("You're connected via WebSockets!");
      },

      received(data) {
        notify.success(data['body']);
      },

      disconnected() {
        Ember.debug("AppearancesChannel#disconnected");
      }
    });
  })

});

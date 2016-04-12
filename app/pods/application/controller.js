import Ember from 'ember';

export default Ember.Controller.extend({
  store:         Ember.inject.service('store'),
  notify:        Ember.inject.service('notify'),
  cableConsumer: Ember.inject.service('cable-consumer'),

  initCableService: Ember.on('init', function () {
    // Create a consumer
    let store    = this.get('store');
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
        notify.success(data['body']);
      },

      disconnected() {
        Ember.debug("AppearancesChannel#disconnected");
      }
    });
  })

});

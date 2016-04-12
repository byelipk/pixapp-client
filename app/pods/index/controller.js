import Ember from 'ember';

export default Ember.Controller.extend({
  store:         Ember.inject.service('store'),
  notify:        Ember.inject.service('notify'),
  cableConsumer: Ember.inject.service('cable-consumer'),

  initCableService: Ember.on('init', function () {
    // Create a consumer
    let controller = this;
    let store      = this.get('store');
    let notify     = this.get('notify');
    let consumer   = this.get('cableConsumer').retrieve();

    Ember.debug(consumer);
    
    consumer.subscriptions.create({
      channel: "PicturesChannel",
      room: ""
    }, {
      connected() {
        notify.info("You're connected to the Pictures Channel!");
      },

      received(data) {
        if (data["action"] === "DELETE") {
          let record = store.peekRecord(data["type"], data["id"]);
          if (record) {
            record.deleteRecord();
            controller.get('model.pictures').removeObject(record);
            notify.success("Picture deleted");
          }
        }
      },

      disconnected() {
        Ember.debug("PicturesChannel#disconnected");
      }
    });
  })
});

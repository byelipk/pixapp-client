import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['modal-content', 'modal-upload-form'],

  actions: {
    cancel() {
      document.querySelector(".modal-backdrop").click();
    }
  }
});

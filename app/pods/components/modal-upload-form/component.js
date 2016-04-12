import Ember from 'ember';

export default Ember.Component.extend({
  store:  Ember.inject.service('store'),
  ajax:   Ember.inject.service('ajax'),
  notify: Ember.inject.service('notify'),

  classNames: ['modal-content', 'modal-upload-form'],

  actions: {
    cancel() {
      document.querySelector(".modal-backdrop").click();
    },

    upload() {
      let form  = document.querySelector("#upload");
      let fd    = new FormData(form);
      let files = this.get('selectedFiles');

      if (fd && files.length > 0) {
        this.toggleProperty('isSaving');

        for (var i = 0; i < files.length; i++) {
          fd.append('picture[image]', files[i]);
        }

        this.get('ajax').request("/api/pictures", {
          data: fd,
          method: 'POST',
          processData: false, // tell jQuery not to process the data
          contentType: false  // tell jQuery not to set contentType
        })
        .then((picture) => {
          this.get('store').pushPayload(picture);
          this.get('notify').success('Upload complete!');
          this.sendAction('on-upload-complete');
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.toggleProperty('isSaving');
        });
      }
    }
  }
});

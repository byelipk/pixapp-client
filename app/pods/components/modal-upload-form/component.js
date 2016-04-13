import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  store:  Ember.inject.service('store'),
  ajax:   Ember.inject.service('ajax'),
  notify: Ember.inject.service('notify'),

  classNames: ['modal-content', 'modal-upload-form'],

  uploadBtnDisabled: computed('selectedFiles.[]', function() {
    return this.get('selectedFiles').length < 1;
  }),

  actions: {

    cancel() {
      document.querySelector(".modal-backdrop").click();
    },

    // NOTE
    // To learn about how to handle file objects
    // in the browser see these articles:
    //
    // See: https://developer.mozilla.org/en-US/docs/Web/API/FileList
    // See: https://developer.mozilla.org/en-US/docs/Web/API/File
    // See: https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
    //
    upload() {
      let form  = document.querySelector("#upload");
      let files = this.get('selectedFiles');

      if (form && files.length > 0) {
        this.toggleProperty('isSaving');

        let promises = [];

        for (var i = 0; i < files.length; i++) {
          let fd = new FormData(form);
              fd.append('picture[image]', files[i]);

          let promise = this.get('ajax').request("/api/pictures", {
            data: fd,
            method: 'POST',
            processData: false, // tell jQuery not to process the data
            contentType: false  // tell jQuery not to set contentType
          });

          promises.push(promise);
        }

        Ember.RSVP.all(promises).then((pictures) => {
          pictures.forEach((picture) => {
            this.get('store').pushPayload(picture);
          });
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
    },

    removeFile(file) {
      this.get('selectedFiles').removeObject(file);
    }
  }
});

import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),
  tagName: 'uploader-form',
  files: [],
  selectedFile: null,

  actions: {
    upload() {
      this.sendAjax();
    },

    handleFiles(e) {
      // To learn about how to handle file objects
      // in the browser see these articles:
      //
      // See: https://developer.mozilla.org/en-US/docs/Web/API/FileList
      // See: https://developer.mozilla.org/en-US/docs/Web/API/File
      // See: https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
      //
      let fileList = e.target.files;
      let files    = this.get('files');
      let file     = fileList[0];

      files.pushObject(file);

      this.set('selectedFile', file);
    },

    removeFile(file) {
      if (file === this.get('selectedFile')) {
        document.querySelector("#file").value = "";
        this.set('selectedFile', null);
      }

      this.get('files').removeObject(file);
    }
  },

  sendAjax() {
    let form = document.querySelector("#upload-form");
    let fd   = new FormData(form);
    let f    = this.get('selectedFile');

    if (f) {
      this.get('ajax').request("/api/pictures", {
        data: fd,
        method: 'POST',
        processData: false, // tell jQuery not to process the data
        contentType: false  // tell jQuery not to set contentType
      })
      .then((picture) => {
        this.get('store').pushPayload(picture);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
});

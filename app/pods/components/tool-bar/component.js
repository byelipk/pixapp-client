import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['btn-toolbar', 'm-b-1'],
  attributeBindings: ['label:aria-label'],
  ariaRole: 'toolbar',
  label: 'Toolbar with button groups',

  selectedFiles: [],

  showUploadDialog: false,

  actions: {

    openFilePicker() {
      document.querySelector("#file").click();
    },

    openDirectoryPicker() {
      document.querySelector("#directory").click();
    },

    toggleUploadDialog() {
      this.toggleProperty('showUploadDialog');
    },

    onUploadComplete() {
      this.send('toggleUploadDialog');
      this.get('selectedFiles').clear();
    },

    handleFiles(evt) {
      let files = evt.target.files;
      if (files.length > 0) {
        let selected = this.get('selectedFiles');
        for (var i = 0; i < files.length; i++) {
          selected.pushObject(files[i]);
        }
        this.send('toggleUploadDialog');
      }
    },

    trash() {
      let files    = this.get('selectedFiles');
      let promises = files.map((file) => {
        file.destroyRecord();
      });

      Ember.RSVP.all(promises).then(() => {
        files.clear();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
});

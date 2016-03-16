import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['btn-toolbar', 'm-b-1'],
  attributeBindings: ['label:aria-label'],
  ariaRole: 'toolbar',
  label: 'Toolbar with button groups',

  selectedFiles: [],

  actions: {
    toggleDialog() {
      this.toggleProperty('showDialog');
    },

    overlayClicked() {
      this.send('toggleDialog');
      this.get('selectedFiles').clear();
    },

    openFilePicker() {
      // Simulate click on file input field
      document.querySelector("#file").click();
    },

    openDirectoryPicker() {
      // Simulate click on file input field
      document.querySelector("#directory").click();
    },

    handleFiles(evt) {
      let files = evt.target.files;
      if (files.length > 0) {
        let selected = this.get('selectedFiles');
        for (var i = 0; i < files.length; i++) {
          selected.pushObject(files[i]);
        }
        this.send('toggleDialog');
      }
    }
  }
});

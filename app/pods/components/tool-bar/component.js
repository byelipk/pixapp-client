import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['btn-toolbar', 'm-b-1'],
  attributeBindings: ['label:aria-label'],
  ariaRole: 'toolbar',
  label: 'Toolbar with button groups',

  actions: {
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
        console.log("What do we do now?");
      }
    }
  }
});

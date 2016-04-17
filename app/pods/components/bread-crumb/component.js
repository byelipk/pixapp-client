import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: ['navbar', 'subnav-box', 'p-t-1', 'p-b-1'],

  actions: {
    toggleFolderTree() {
      this.toggleProperty('showingFolderTree');
    },

    toggleNode(node) {
      console.log(`Toggle: ${node.get('text')}`);
    }
  }
});

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: ['navbar', 'subnav-box', 'p-t-1', 'p-b-1'],

  actions: {
    togglePopover() {
      this.toggleProperty('showPopover');
    }
  }
});

import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['media', 'asset-list-item', 'p-t-1', 'p-b-1'],
  tagName: 'li',

  actions: {
    toggleIsChecked() {
      this.toggleProperty('isChecked');

      this.sendAction(
        'toggle-toolbar',
        this.get('isChecked'),
        this.get('picture'));
    }
  }
});

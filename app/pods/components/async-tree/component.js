import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'async-tree',

  classNames: ['async-tree'],

  // Default Configuration
  config: {

    // Path to the property that should be used
    // as label e.g. model.label.en would be label.en
    labelPropertyPath: 'text',

    // Function that is called with the selected model
    // when the label of the model is clicked
    onActivate(model) {
      console.log(model);
    },

    // Function to retrieve children of the parent object.
    // This function should return a Promise that returns the
    // children of this item. This result will be stored
    // in _childrenCache locally in this component
    getChildren(model) {
      return model.get('children');
    },

    // List of concept ids that are expanded.
    // Will auto expand a node in the tree if it's
    // id is contained in this array
    expandedConcepts: [],

    // Max amount (n) of children to be shown before a
    // load more button is presented. Load more button
    // shows an extra n children
    showMaxChildren: 50,

    // Component to be rendered before the tree node.
    // Model wil be passed to the component.
    beforeComponent: null,

    // Component to be rendered after the tree node.
    // Model wil be passed to the component.
    afterComponent: null
  }
});

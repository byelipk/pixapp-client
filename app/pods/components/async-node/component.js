import Ember from 'ember';

const { computed } = Ember;
const { alias, sort } = computed;

export default Ember.Component.extend({
  tagName: 'async-node',

  classNames: ['async-node', 'media'],

  fetchChildrenOnInit: true,

  labelPropertyPath: alias('config.labelPropertyPath'),
  getChildren:       alias('config.getChildren'),
  expandedConcepts:  alias('config.expandedConcepts'),
  showMaxChildren:   alias('config.showMaxChildren'),
  beforeComponent:   alias('config.beforeComponent'),
  afterComponent:    alias('config.afterComponent'),

  init: Ember.on('init', function() {
    this._super(...arguments);

    if (this.get('fetchChildrenOnInit')) {
      this.fetchChildren();
    }

    let ref;
    if ((((ref = this.get('expandedConcepts')) != null) ? ref.contains(this.get('model.id')) : undefined) && !this.get('expanded')) {
      return this.toggleExpandF();
    }
  }),

  label: computed('labelPropertyPath', 'model', function() {
    return this.get(`model.${this.get('labelPropertyPath')}`);
  }),

  sortedChildren: sort('_childrenCache', 'sortchildrenby'),

  sortchildrenby: computed('labelPropertyPath', function() {
    return [this.get('labelPropertyPath')];
  }),

  childrenFetched: false,
  childrenSlice: 50,

  expandable: computed('_childrenCache', 'loading',  function() {
    return (!this.get('loading')) && this.get('_childrenCache.length');
    // return this.get('model.children.length') > 0;
  }),

  showLoadMore: computed('_childrenCache.length', 'childrenSlice', 'loading', function() {
    return (!this.get('loading')) && this.get('childrenSlice') < this.get('_childrenCache.length');
  }),

  expanded: false,
  loading: false,

  fetchChildren() {
    this.set('loading', true);
    return this.get('getChildren')(this.get('model')).then( (result) => {
      this.set('loading', false);
      this.set('childrenFetched', true);
      this.set('_childrenCache', result);
      if (this.get('_childrenCache.length') > 0) {
        return this.set('childrenSlice', this.get('showMaxChildren'));
      }
    }
    ).catch(() => this.set('loading', false));
  },

  children: computed('sortedChildren', 'loading', 'childrenSlice', function() {
    if (!this.get('loading')) {
      return this.get('sortedChildren').slice(0, this.get('childrenSlice'));
    } else {
      return [];
    }
  }),

  toggleExpandF() {
    this.toggleProperty('expanded');
    if (this.get('expanded')) {
      if (!this.get('childrenFetched')) { this.fetchChildren(); }
      return this.get('expandedConcepts').addObject(this.get('model.id'));
    } else {
      return this.get('expandedConcepts').removeObject(this.get('model.id'));
    }
  },

  configObserver: Ember.observer('config', 'config.fetchChildren', function() {
    this.get('config.fetchChildren');
    return this.fetchChildren();
  }),

  actions: {
    clickItem() {
      var fn;
      if (typeof (fn = this.get('config.onActivate')) === "function") {
        return fn(this.get('model'));
      }
    },

    toggleExpand() {
      return this.toggleExpandF();
    },

    loadMoreChildren() {
      let newSlice, extraSlice;

      if (this.get('childrenSlice') + this.get('showMaxChildren') > this.get('_childrenCache.length')) {
        newSlice = this.get('_childrenCache.length');
      } else {
        newSlice = this.get('childrenSlice') +
                   this.get('showMaxChildren');
      }

      extraSlice = this.get('sortedChildren')
                       .slice(this.get('childrenSlice'), newSlice);

      this.get('children').pushObjects(extraSlice);

      return this.set('childrenSlice', newSlice);
    }
  }
});

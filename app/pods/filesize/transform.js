import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;

let Filesize = Ember.Object.extend({
  bytes: 0,

  kb: computed('bytes', function () {
    return this.get('bytes') / 1000;
  }),
  mb: computed('bytes', function () {
    return this.get('bytes') / Math.pow(1000, 2);
  }),
  gb: computed('bytes', function () {
    return this.get('bytes') / Math.pow(1000, 3);
  }),
  tb: computed('bytes', function () {
    return this.get('bytes') / Math.pow(1000, 4);
  }),
  pb: computed('bytes', function () {
    return this.get('bytes') / Math.pow(1000, 5);
  }),

  bytesWithUnits: computed('bytes', function () {
    return this.get('kb') + ' B';
  }),
  kbWithUnits: computed('bytes', function () {
    return this.get('kb') + ' KB';
  }),
  mbWithUnits: computed('bytes', function () {
    return this.get('mb') + ' MB';
  }),
  gbWithUnits: computed('bytes', function () {
    return this.get('gb') + ' GB';
  }),
  tbWithUnits: computed('bytes', function () {
    return this.get('tb') + ' TB';
  }),
  pbWithUnits: computed('bytes', function () {
    return this.get('pb') + ' PB';
  }),

  humanReadable: computed('bytes', function () {
    var sizes = ['bytes', 'kb', 'gb', 'tb', 'pb'];
    var that = this;
    var result;

    sizes.some(function (size) {
      if (that.get(size) < 1000) {
        result = size;
        return true;
      }

      return false;
    });

    return this.get(result + 'WithUnits');
  })

});

export default DS.Transform.extend({
  deserialize: function (serialized) {
    return Filesize.create({
      bytes: serialized
    });
  },

  serialize: function (deserialized) {
    if (deserialized) {
      return deserialized.get('bytes');
    }

    return 0;
  }
});

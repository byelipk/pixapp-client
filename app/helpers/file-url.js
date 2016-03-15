import Ember from 'ember';

export function fileUrl(file) {
  return window.URL.createObjectURL(file[0]);
}

export default Ember.Helper.helper(fileUrl);

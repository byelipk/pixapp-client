import Ember from 'ember';

export function fileUrl(file) {
  if (window && window.createObjectURL) {
    return window.URL.createObjectURL(file[0]);
  } else {
    return true;
  }
}

export default Ember.Helper.helper(fileUrl);

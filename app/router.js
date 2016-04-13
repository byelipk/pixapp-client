import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('files');
  this.route('updates');
  this.route('notifications');
});

export default Router;

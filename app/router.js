import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('quiz', function() {
    this.route('builder');
    this.route('assessment');
    this.route('review');
  });
  this.route('identify');
  this.route('practice');
});

export default Router;

/// <reference path="../typings/angularjs/angular.d.ts"/>

module app {

  angular.module('app', [
    'ui.router',
    'ngMessages',
    'ngResource',
    'ngCookies',
    'ngAnimate',
    'app.templates'])
  .controller('AppController', AppController)
  .config(AppConfig);
}

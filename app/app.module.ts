/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="./home/home.module.ts"/>

module app {

  angular.module('app', [
    'ui.router',
    'ngMessages',
    'ngResource',
    'ngCookies',
    'ngAnimate',
    'app.templates',
    'app.home'])
  .controller('AppController', AppController)
  .config(AppConfig);
}

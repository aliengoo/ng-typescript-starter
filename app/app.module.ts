/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="./home/home.module.ts"/>

///<reference path="app.controller.ts"/>
///<reference path="app.config.ts"/>

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

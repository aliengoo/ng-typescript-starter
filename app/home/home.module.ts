///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="home.controller.ts"/>
///<reference path="home.config.ts"/>

module app.home {
  angular.module('app.home', ['ui.router', 'app.templates'])
    .controller('HomeController', HomeController)
    .config(HomeConfig);
}

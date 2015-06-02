/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts"/>
/// <reference path="home.controller.ts"/>

module app.home {
  export class HomeConfig {
    static $inject = ['$stateProvider'];

    constructor($stateProvider:ng.ui.IStateProvider) {
      
      var homeState:ng.ui.IState = {
        url: '/home',
        controller: 'HomeController as vm',
        templateUrl: 'home/home.html'
      };
      
      $stateProvider.state('app.home', homeState);
    }
  }
}

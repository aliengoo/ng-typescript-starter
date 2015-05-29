///<reference path="../typings/angular-ui-router/angular-ui-router.d.ts"/>

module app {
  export class AppConfig {

    static $inject = ['$stateProvider', '$urlRouterProvider'];

    constructor(
      private $stateProvider: angular.ui.IStateProvider,
      private $urlRouterProvider: angular.ui.IUrlRouterProvider){

      var appState: angular.ui.IState = {
        url: '/',
        templateUrl: 'app.html',
        controller: 'AppController as vm'
      };

      this.$stateProvider.state('app', appState);

      this.$urlRouterProvider.otherwise('/');
    }
  }
}

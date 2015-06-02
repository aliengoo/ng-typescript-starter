module app {

  interface IAppModel {
    appTitle: string;
  }

  export class AppController implements IAppModel{
    appTitle: string;

    constructor(){
      this.appTitle = "ng-typescript-starter";
    }
  }
}

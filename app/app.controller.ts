module app {

  interface IAppModel {
    message: string;
  }

  export class AppController implements IAppModel{
    message: string;

    constructor(){
      this.message = "Hello, TypeScript!";
    }
  }
}

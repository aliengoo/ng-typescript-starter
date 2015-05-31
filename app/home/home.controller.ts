module app.home {

  interface IHomeModel {
    message: string;
  }

  export class HomeController implements IHomeModel {
    message: string;

    constructor() {
      this.message = 'Hello, Home!';
    }
  }
}

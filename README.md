# ng-typescript-starter

Basic starter for working with AngularJS 1.4 and TypeScript.

The build is powered by Gulp.

## Installation

Clone the repo.

Ensure bower, npm, tsd and gulp are installed globally. `npm install -g <whatever>`.

Ensure SASS is installed.  **Please note that because I use Node v0.12, I had to use gulp-ruby-sass, node-sass didn't work at the time of writing**

* Run `bower install`
* Run `tsd reinstall -s`
* Run `npm install`
* Run `gulp`

If just want a basic web server to run, use the command

	gulp --webserver
	
If you want to run the express/nodejs server, use the command

	gulp --nodemon
	
## Folders
	
### ./app

Put your AngularJS/TypeScript code in here.

### ./server

If you need to use a nodejs server, then stick your code in here.  Remember to run `gulp --nodemon` to start the server.

### ./styles
	
*.scss* created here will end up in _./assets/styles.css_.

### ./public

Where assets are served from.  The only thing you should edit in here is _index.html_, everything else is generated via gulp.

## Things to know

### Gulp configuration

Most gulp configuration is stored in _gulp.config.js_, however, some leaked into the main _gulpfile.js_.  I will get to tidying this up at some point.

### ng-annotate

Couldn't get this to work with TypeScript, so reverted to manual injection

	module app {
		export class AppController {
			
			// manually inject
			static $inject = ['$scope'];
			
			constructor(public $scope: IAppScope) {
			}
		}
	}
	
### Template caching

It works, but everything ends up in a single Angular module called `app.templates`, rather than within the scope of the particular Angular module.




	




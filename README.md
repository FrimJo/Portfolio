# Angular2CliScss

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.31.
Using 'ng new angular-cli-scss -style=scss'


It has working typescript translation, minification and g-zip as well as support for scss. And also, generates service-worker for offline use.

Currently using Lighthouse ('https://developers.google.com/web/tools/lighthouse/') it receives a score of 52 our of 100.

What to do (se '/lighthouse_report.html'):
- Use HTTPS/2 instead of HTTP
- Create Manifest
- Avoids <link> that delay first paint (/styles.d41d8cd….bundle.css)


## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Run 'npm run sw' to build service-worker.js file. This file will be stored in the 'dist/' directory.

Run 'npm run prod' to build for production build and automatic generate service-worker.js file.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Running production build using live-server
Install live-server using 'npm install -g live-server'.
Run 'npm run static-serve' to start a live-server hosting the static files found in '/dev' on 'http://localhost:4300'. 

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

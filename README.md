# Portfolio
https://portfolio.fredrikux.com

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.31.
Using 'ng new angular-cli-scss -style=scss'


It has working typescript translation, minification and g-zip as well as support for scss. And also, generates service-worker for offline use.

Currently using Google Lighthouse ('https://developers.google.com/web/tools/lighthouse/') it receives a score of 97 our of 100 (see lighthouse_report.html).

Currently, firefox does not support WebP images. The code for using WebP images is commented out.


## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Run 'npm run sw' to build service-worker.js file. This file will be stored in the 'dist/' directory.

Run 'npm run prod' to build for production build and automatic generate service-worker.js file.


## Running production build using live-server

Install live-server using 'npm install -g live-server'.
Run 'npm run static-serve' to start a live-server hosting the static files found in '/dev' on 'http://localhost:4300'. 

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      'tslib': 'npm:tslib/tslib.js',

      // other libraries
      'rxjs': 'npm:rxjs',
      'moment': 'npm:moment/min',
      'angular2-moment': 'npm:angular2-moment',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      '@ng-bootstrap/ng-bootstrap': 'node_modules/@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
      'ngx-webstorage': 'npm:ngx-webstorage/bundles/core.umd.js',
      'angular2-grid': 'npm:angular2-grid/bundles/NgGrid.umd.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      rxjs: {
        defaultExtension: 'js'
      },
      moment: {
        main: './moment-with-locales.js',
        defaultExtension: 'js'
      },
      'angular2-moment': {
        main: './index.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);

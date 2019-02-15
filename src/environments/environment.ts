// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiRoot:'https://localhost:44365/api/',
  Configuration: {   
    stsAuthority: "http://localhost:5000/", 
    clientId: 'angularclient',
    clientRoot: 'http://localhost:4200/',
    scope: 'openid profile api1',
    response_type: 'id_token token',
    popup_redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/logout-callback',
    silent_redirect_uri: 'http://localhost:4200/assets/silent-redirect.html'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

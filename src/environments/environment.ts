// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  invalidEmail: 'invalid.email',
  userFetched: 'user.fetched',
  resetTokenNull: 'reset.token.null',
  tokenExpired: 'token.expired',
  invalidToken: 'token.invalid',
  samePassword: 'same.password',
  resetPasswordSuccess: 'message.resetPasswordSuc',
  success: 'success',
  userExists: 'User Already Exists'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export enum AuthStatus {
  // Haven't been verified by back-end.
  NotSure = 'not_sure',
  // The user has logged in.
  LoggedIn = 'logged_in',
  // The user has not logged in yet.
  NotLoggedIn = 'not_logged_in',
  // The user has manually logged out.
  LoggedOut = 'logged_out',
  // The authentication token expired.
  Expired = 'expired',
}

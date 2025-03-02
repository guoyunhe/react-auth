export enum AuthStatus {
  /** User has logged in */
  LoggedIn = 'logged_in',
  /** User has not logged in yet */
  NotLoggedIn = 'not_logged_in',
  /** User has manually logged out. It will immediately change to `NotLoggedIn` after redirect. */
  LoggedOut = 'logged_out',
  /**
   * Authentication token expired during a session. To avoid losing unsaved changes, it will not
   * redirect user to login page. Instead, you can show a login popup to make experience smoother.
   */
  Expired = 'expired',
}

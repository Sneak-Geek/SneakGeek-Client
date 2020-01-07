import { createAction } from "redux-actions";

//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

export const NavigationActions = {
  NAVIGATE_TO_LOGIN: "NAVIGATE_TO_LOGIN",
  NAVIGATE_TO_EMAIL_SIGNIN: "NAVIGATE_TO_EMAIL_SIGNIN",
  NAVIGATE_TO_EMAIL_SIGNUP: "NAVIGATE_TO_EMAIL_SIGNUP",
  POP: "POP"
};

export const navigateToLogin = createAction(NavigationActions.NAVIGATE_TO_LOGIN);
export const navigateToEmailSignIn = createAction<string>(
  NavigationActions.NAVIGATE_TO_EMAIL_SIGNIN
);
export const navigateToEmailSignUp = createAction<string>(
  NavigationActions.NAVIGATE_TO_EMAIL_SIGNUP
);

export const pop = createAction(NavigationActions.POP);

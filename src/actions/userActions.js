import firebaseApi from '../api/firebase';
import * as types from './actionTypes';

import { authLoggedIn } from './authActions';
import {ajaxCallError, beginAjaxCall} from './ajaxStatusActions';

function extractUserProperties(firebaseUser, additionalData) {

  const user = {};
  const userProperties = [
    'displayName',
    'email',
    'emailVerified',
    'isAnonymous',
    'photoURL',
    'providerData',
    'providerId',
    'refreshToken',
    'uid',
    'isAdmin'
  ];

  userProperties.map((prop) => {
    if (prop in firebaseUser) {
      user[prop] = firebaseUser[prop];
    }
  });
  user.additionalData = additionalData;
  return user;
}

export function userCreated(user, additionalData) {
  return (dispatch) => {
    firebaseApi.databaseSet('/users/' + user.uid, extractUserProperties(user, additionalData))
      .then(
        () => {
          dispatch(authLoggedIn(user.uid));
          dispatch(userCreatedSuccess());
        })
      .catch(
        error => {
          dispatch(ajaxCallError(error));
          // @TODO better error handling
          throw(error);
        });
  };
}

export function userCreatedSuccess() {
  return {
    type: types.USER_CREATED_SUCCESS
  };
}

export function userLoadedSuccess(user) {
  return {
    type: types.USER_LOADED_SUCCESS, user: extractUserProperties(user, user.additionalData)
  };
}

export function userIsAdminSuccess() {
  return {
    type: types.USER_IS_ADMIN_SUCCESS
  };
}

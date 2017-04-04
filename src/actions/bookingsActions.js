import {push} from 'react-router-redux';

import firebaseApi from '../api/firebase';
import * as types from './actionTypes';

import {authLoggedIn} from './authActions';
import {ajaxCallError, beginAjaxCall} from './ajaxStatusActions';

export function createBooking(booking) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.databasePush('/bookings', booking).then(booking => {
      dispatch(bookingCreatedSuccess());
      dispatch(retrieveBookings());
      dispatch(push('/booking/'+booking.path.o[1]));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      // @TODO better error handling
      throw(error);
    });
  };
}

export function retrieveBookings() {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.GetListByPath('bookings').then(bookings => {
      dispatch(bookingsRetrievedSuccess(bookings.val()));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      // @TODO better error handling
      throw(error);
    });
  };
}

export function retrieveBooking(key) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.GetValueByKeyOnce('bookings', key).then(booking => {
      return booking.val()
      // dispatch(bookingRetrievedSuccess(booking.val()));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      // @TODO better error handling
      throw(error);
    });
  };
}

export function bookingCreatedSuccess() {
  return {
    type: types.BOOKING_CREATED_SUCCESS
  };
}

export function bookingsRetrievedSuccess(bookings) {
  return {
    type: types.BOOKINGS_RETRIEVED_SUCCESS,
    bookings:bookings
  };
}

export function bookingRetrievedSuccess(booking) {
  return {
    type: types.BOOKING_RETRIEVED_SUCCESS,
    booking:booking
  };
}

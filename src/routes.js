import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Layout from './components/Layout';
import HomePage from './components/home/HomePage';
import AdminPage from './components/admin/AdminPage';
import ProtectedPage from './components/protected/ProtectedPage';
import BookingPage from './components/booking/BookingPage';
import AccountPage from './components/account/AccountPage';
import ReviewsPage from './components/reviews/ReviewsPage';
import AboutPage from './components/about/AboutPage';
import LoginPage from './components/login/LoginPage'; //eslint-disable-line import/no-named-as-default
import RegistrationPage from './components/registration/RegistrationPage'; //eslint-disable-line import/no-named-as-default
import {requireAdmin} from './actions/authActions';


export default function Routes(store) {


  const checkAdmin = (nextState, replace, callback) => {
    store.dispatch(requireAdmin(nextState, replace, callback));
  };

  return (
    <Route path="/" component={Layout}>
      <IndexRoute component={HomePage}/>
      <Route path="layout" component={Layout}/>
      <Route path="about" component={AboutPage}/>
      <Route path="bookings" component={ProtectedPage}/>
      <Route path="booking/:id" component={BookingPage}/>
      <Route path="account" component={AccountPage}/>
      <Route path="reviews" component={ReviewsPage}/>
      <Route path="admin" component={AdminPage} onEnter={checkAdmin}/>
      <Route path="register" component={RegistrationPage}/>
      <Route path="login" component={LoginPage}/>
    </Route>
  );
}

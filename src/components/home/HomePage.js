import React from 'react';
import {Link} from 'react-router';
import fortwonew from '../../assets/images/fortwo-new.jpg';
import fortwo from '../../assets/images/fortwo.jpg';
import forfour from '../../assets/images/forfour.jpg';
import fullLogo from '../../assets/images/fulllogo.jpg';
import textlogo from '../../assets/images/textlogo.jpg';

const HomePage = () => {
  return (
    <div className="HomePage">
      <div className="splash-panel jumbotron text-center">
        <div className="col-xs-9 col-xs-offset-1 col-sm-8 col-sm-offset-1 col-md-5 col-md-offset-3 col-lg-5 col-lg-offset-3">
          <br/>
          <img src={textlogo} className="img-responsive col-lg-10 col-lg-offset-1" alt="SmartMove"/>
          <h1><span>car hire</span></h1>
          <p><strong>Starting from</strong> 99p per hour*</p>
          <p></p>
          <Link to="register" className="smart-button btn btn-warning btn-lg">BECOME A MEMBER</Link>
          <br/>
        </div>
      </div>
      <div className="car-panel text-center">
        <h2 className="text-center">Current Deals</h2>
        <div className="row">
          <div className="col-md-2 col-md-offset-2">
            <img src={fortwo} className="img-responsive" alt="Smart Fortwo"/>
            <h4>Smart Fortwo</h4>
            <p>from</p>
            <h2>£150</h2>
            <p>per week</p>
            <Link to="bookings" className="smart-button btn btn-warning btn-lg">BOOK NOW</Link>
          </div>
          <div className="col-md-2 col-md-offset-1">
            <img src={fortwonew} className="img-responsive" alt="Smart Fortwo new"/>
            <h4>Smart Fortwo New</h4>
            <p>from</p>
            <h2>£500</h2>
            <p>per month</p>
            <Link to="bookings" className="smart-button btn btn-warning btn-lg">BOOK NOW</Link>
          </div>
          <div className="col-md-2 col-md-offset-1">
            <img src={forfour} className="img-responsive" alt="Smart Forfour"/>
            <h4>Smart Forfour</h4>
            <p>from</p>
            <h2>£750</h2>
            <p>per month</p>
            <Link to="bookings" className="smart-button btn btn-warning btn-lg">BOOK NOW</Link>
          </div>
        </div>
      </div>
      <div className="jumbotron">
        <h2 className="text-center">What is SmartMove?</h2>
        <div className="row">
          <br/><br/>
          <div className="col-lg-5 col-lg-offset-1">
            <p className="text-justify">
              Smart move is a part of the SmartMove Partners Group Limited. SmartMove is designed to give the every day Londoner quick and affordable car hire solutions. No credit checks, no ridiculous deposits, penalty points? No problem! We specialise in Smart cars. Need a car for the week or perhaps just traveling around town? The low fuel emissions and remarkably cheap to run making the ever rising petrol prices manageable. Choose from a range of Smart car models.
            </p>
            <br/><br/>
          </div>
          <div className="col-lg-5">
            <img className="img-responsive img-rounded" src="http://www.whatasmartmove.co.uk/wp-content/uploads/2013/01/1.jpg" alt="Smart Fortwo new"/>
            <br/>
            <Link to="register" className="col-xs-12 col-sm-12 col-md-12 col-lg-12 smart-button btn btn-warning btn-lg">Book Yours Now!</Link>
          </div>
        </div>
      </div>
      <div className="jumbotron text-center">
        <h2>How it works?</h2>
        <br/><br/>
        <div className="row">
          <div className="col-md-2 col-md-offset-2">
            <div>
              <img className="img-responsive" src="http://dru-cdn.zipcar.com/sites/default/files/images/ico-join-v5.svg" alt="Smart Fortwo new"/>
            </div>
            <h3>Join</h3>
            <p>
              Apply online. Once approved, we will send you a Zipcard to access vehicles worldwide.
            </p>
          </div>
          <div className="col-md-2">
            <div>
              <img src="http://dru-cdn.zipcar.com/sites/default/files/images/ico-join-v5.svg" alt="Smart Fortwo new"/>
            </div>
            <h3>Book</h3>
            <p>
              Book a Zipcar for as little as 1 hour or as long as 7 days.
            </p>
          </div>
          <div className="col-md-2">
            <div>
              <img src="http://dru-cdn.zipcar.com/sites/default/files/images/ico-join-v5.svg" alt="Smart Fortwo new"/>
            </div>
            <h3>Receive</h3>
            <p>
              Hold your Zipcard to the car's windshield—or tap the app—to unlock. Voila! It's all yours.
            </p>
          </div>
          <div className="col-md-2">
            <div>
              <img src="http://dru-cdn.zipcar.com/sites/default/files/images/ico-join-v5.svg" alt="Smart Fortwo new"/>
            </div>
            <h3>Drive</h3>
            <p>
              Hit the road. When you are done, we will collect the car from you.
            </p>
          </div>
        </div>
        <br/><br/>
        <Link to="register" className="smart-button btn btn-warning btn-lg">Join now</Link>
        <br/><br/>
      </div>
      <div className="jumbotron">
        <h2 className="text-center">Where are our cars?</h2>
        <div className="row">
          <br/><br/>
          <div className="col-md-4 col-md-offset-2">
            <img className="img-responsive img-rounded text-center" src="http://www.fredd.co.uk/wp-content/uploads/2013/12/Illus3.png" alt="Smart Fortwo new"/>
          </div>
          <div className="col-md-4">
            <p className="text-justify">
              Smart move is apart of  the smart move partners group limited. Smart move is designed to give the every day Londoner  quick and affordable  car hire solutions.No credit checks, no ridiculous deposits,  penalty points ? no problem! We specialise in smart cars, need a car for the week  or perhaps just traveling around town. The low fuel emissions and remarkably cheap making ever rising petrol prices manageable. Choose from a range of smart car models.BOOK YORS NOW!
            </p>
            <br/>
          </div>
        </div>
      </div>
      <div className="jumbotron text-center">
        <h2 className="text-center">Book a car now</h2>
        <br/><br/>
        <div className="row text-center">
          <div className="col-sm-2 col-sm-offset-3 col-md-2 col-md-offset-3">
            <div>
              <img src="http://dru-cdn.zipcar.com/sites/default/files/images/drtv_checkmark.svg" alt="Smart Fortwo new"/>
            </div>
            <h4>Create a SmartMove log in</h4>
          </div>
          <div className="col-sm-2 col-md-2">
            <div>
              <img src="http://dru-cdn.zipcar.com/sites/default/files/images/drtv_checkmark.svg" alt="Smart Fortwo new"/>
            </div>
            <h4>Have your driver license ready</h4>
          </div>
          <div className="col-sm-2 col-md-2">
            <div>
              <img src="http://dru-cdn.zipcar.com/sites/default/files/images/drtv_checkmark.svg" alt="Smart Fortwo new"/>
            </div>
            <h4>Grab your credit or debit card</h4>
          </div>
        </div>
        <br/><br/>
        <Link to="register" className="smart-button btn btn-warning btn-lg">Join SmartMove</Link>
        <br/><br/>
      </div>
    </div>
  );
};

export default HomePage;

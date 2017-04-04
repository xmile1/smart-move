import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import {} from 'moment-range';
import {createBooking, retrieveBookings} from '../../actions/bookingsActions';
import toastr from 'toastr';
import TextInput from '../common/TextInput';
import DateRangePicker from 'react-daterange-picker';
import {Table, Modal, Button} from 'react-bootstrap';
import checkAuth from '../requireAuth';

import fortwonew from '../../assets/images/fortwo-new.jpg';
import fortwo from '../../assets/images/fortwo.jpg';
import forfour from '../../assets/images/forfour.jpg';

export class ProtectedPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      disableBookButton: false,
      showPaymentModal:false,
      carType:'fortwo',
      price:150,
      momentRange: moment.range(moment().add(1, 'days').startOf('day'), moment().add(1, 'weeks').add(1, 'days').startOf('day')),
      startDate:moment().add(1, 'days').startOf('day').toDate(),
      endDate:moment().add(1, 'weeks').add(1, 'days').startOf('day').toDate(),
      booking: {}
    };

    this.createNewBooking = this.createNewBooking.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.changeCarType = this.changeCarType.bind(this);
    this.calculatePrice = this.calculatePrice.bind(this);
    this.props.actions.retrieveBookings().then(success=>{
      if(this.props.state.bookings){
        var testDate = new Date();
        var bestDate = {};
        var bestDiff = -(new Date(0,0,0)).valueOf();
        var currDiff = 0;
        var i;

        for(var i in this.props.state.bookings){
           currDiff = Math.abs(new Date(this.props.state.bookings[i].startDate) - testDate);
           if(currDiff < bestDiff){
               bestDate = i;
               bestDiff = currDiff;
           }
        }

        this.setState({ booking: this.props.state.bookings[bestDate] });
      }
    });

  }

  createNewBooking(event) {
    event.preventDefault();

    this.setState({saving: true});

    const bookingDetails = {
      carType:this.state.carType,
      user:{
        uid:this.props.user.uid,
        email:this.props.user.email,
        additionalData:this.props.user.additionalData,
      },
      startDate:this.state.startDate.getTime(),
      endDate:this.state.endDate.getTime(),
      status:'notpaid',
      price:this.state.price
    }

    this.props.actions.createBooking(bookingDetails)
      .then(booking => {
        console.log(booking)
        toastr.success('Booking Created')
        this.setState({saving: false});
        this.close();
      })
      .catch(error => {
        console.log(error)
        toastr.error(error.message);
        this.setState({saving: false});
      });
  }

  close() {
    this.setState({ showPaymentModal: false });
  }

  open() {
    this.setState({ showPaymentModal: true });
  }

  changeCarType(type) {
    this.setState({ carType: type });
    this.calculatePrice(type)
  }

  calculatePrice (type) {
    const duration = this.state.momentRange.diff('days');
    const carModel = type ? type : this.state.carType;
    const rates = {
      fortwo:21.4285714,
      fortwonew:16.6666667,
      forfour:25
    }

    if(duration < 7 && carModel == 'fortwo'){

      // alert minimum booking must be
      this.setState({disableBookButton:true, price:null, errorMessage:'Minimum duration for this car is 7 days.'})

    } else if(duration < 7 && carModel != 'fortwo'){

      // alert minimum booking must be
      this.setState({disableBookButton:true, price:null, errorMessage:'Minimum duration for this car is 30 days.'})

    } else if(duration < 30 && carModel != 'fortwo') {

      // alert minimum booking must be
      this.setState({disableBookButton:true, price:null, errorMessage:'Minimum duration for this car is 30 days.'})

    } else {

      // calculate price
      var calculatedPrice = duration * rates[carModel];
      if(carModel == 'fortwo' && duration >= 30) { calculatedPrice = duration * rates['fortwonew'] }
      if(duration > 60) {
        // apply 10% discount
        calculatedPrice * 0.9;
      }
      calculatedPrice = calculatedPrice.toFixed(2);
      this.setState({disableBookButton:false, price:calculatedPrice, errorMessage:null})

    }
  }

  handleSelect(range, states) {
    // range is a moment-range object
    this.setState({
      momentRange: range,
      startDate:range.start.toDate(),
      endDate:range.end.toDate(),
    });
    this.calculatePrice();
  }

  render() {

    function mapObject(object, callback) {
      return Object.keys(object).map(function (key) {
        return callback(key, object[key]);
      });
    }


    let carImage = '';
    if(this.state.booking && this.state.booking.carType){
      switch (this.state.booking.carType) {
        case 'fortwo':
          carImage = (<img src={require('../../assets/images/fortwo.jpg')} alt='Smart '/>);
          break;
        case 'fortwonew':
          carImage = (<img src={require('../../assets/images/fortwo-new.jpg')} alt='Smart '/>);
          break;
        case 'forfour':
          carImage = (<img src={require('../../assets/images/forfour.jpg')} alt='Smart '/>);
          break;
        default:
      }
    }


    return (
      <div className="MemberPage">
        <Modal show={this.state.showPaymentModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Final step</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Summary:</h4>
            <Table responsive>
              <tbody>
                <tr><td>Car model</td><td>Smart {this.state.carType}</td></tr>
                <tr><td>Date range</td><td>{this.state.momentRange.start.format('Do MMM')} till {this.state.momentRange.end.format('Do MMM')}</td></tr>
                <tr><td>Duration</td><td>{this.state.momentRange.diff('days')} days</td></tr>
                <tr><td><h4>Total price</h4></td><td><h4><strong>£{this.state.price}</strong></h4></td></tr>
              </tbody>
            </Table>
            <p>
              Your car will be delivered to you on the {this.state.momentRange.start.format('Do MMM')} at your home address: 123, Ashville road, WC2H 9JQ.
              You will receive a text on the day to confirm the delivery time.
              Please review the information above and enter your card details below.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close} bsSize="large">Cancel</Button>
            <Button
              bsStyle="warning"
              bsSize="large"
              onClick={this.createNewBooking}
              disabled={this.state.saving}>
              {this.state.saving ? 'Processing...' : 'Pay now'}
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="jumbotron">
          <div className="row">
            <div className="col-lg-10 col-lg-offset-1">
              <div className="">
                <p>
                  {this.props.user.additionalData ? 'Welcome back '+this.props.user.additionalData.firstName+'.':''} You have not yet paid your membership fee. Please pay before you can book.
                </p>
                <Link to="about" className="smart-button btn btn-warning btn-lg">Pay £2.99</Link>
              </div>
            </div>
          </div>
        </div>
        { this.state.booking && this.state.booking.carType ?
          (
            <div className={this.state.booking.carType ? 'jumbotron BookingPage':'hide'}>
              <div className="row">
                <div className="col-md-10 col-md-offset-1">
                  <h2>Upcoming booking</h2>
                  <div className="row">
                    <br/>
                    <div className="col-md-6">
                      <h4>Summary:</h4>
                      <Table responsive>
                        <tbody>
                          <tr><td>Car model</td><td>Smart {this.state.booking.carType}</td></tr>
                          <tr><td>Delivery on</td><td>{moment(this.state.booking.startDate).format('dddd Do MMM YYYY')}</td></tr>
                          <tr><td>Return date</td><td>{moment(this.state.booking.endDate).format('dddd Do MMM YYYY')}</td></tr>
                          <tr><td>Duration</td><td>{moment(this.state.booking.endDate).diff(moment(this.state.booking.startDate),'days')} days</td></tr>
                          <tr><td>Total cost</td><td>£{this.state.booking.price}</td></tr>
                          <tr><td><h4>Status</h4></td><td><h4>{this.state.booking.status}</h4></td></tr>
                        </tbody>
                      </Table>
                    </div>
                    <div className="col-md-6">
                      {carImage}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
          :
          ''
        }
        <div className="jumbotron NewBooking">
          <div className="row">
            <div className="col-md-12 col-lg-10 col-lg-offset-1">
              <h3>New booking</h3>
              <div className="panel">
                <div className="row">
                  <div className="col-md-4">
                    <h4>Select a Smart model:</h4>
                    <div class="row">
                      <div className={this.state.carType == 'fortwo'?"cartype-button panel-default btn col-xs-12 active":"cartype-button panel-default btn col-xs-12"} onClick={this.changeCarType.bind(this, 'fortwo')}>
                        <img src={fortwo} alt="Smart Fortwo"/>
                        Smart Fortwo
                      </div>
                      <div className={this.state.carType == 'fortwonew'?"cartype-button panel-default btn col-xs-12 active":"cartype-button panel-default btn col-xs-12"} onClick={this.changeCarType.bind(this, 'fortwonew')}>
                        <img src={fortwonew} alt="Smart Fortwo new"/>
                        Smart Fortwo New
                      </div>
                      <div className={this.state.carType == 'forfour'?"cartype-button panel-default btn col-xs-12 active":"cartype-button panel-default btn col-xs-12"} onClick={this.changeCarType.bind(this, 'forfour')}>
                        <img src={forfour} alt="Smart Forfour"/>
                        Smart Fortwo
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <h4>Select a date range:</h4>
                    <DateRangePicker
                      firstOfWeek={1}
                      numberOfCalendars={1}
                      selectionType='range'
                      minimumDate={new Date()}
                      maximumDate={moment().add(3, 'months').toDate()}
                      value={this.state.momentRange}
                      onSelect={this.handleSelect}
                      />
                  </div>
                  <div className="col-md-4">
                    <h4>Summary:</h4>
                    <Table responsive>
                      <tbody>
                        <tr><td>Car model</td><td>Smart {this.state.carType}</td></tr>
                        <tr><td>Date range</td><td>{this.state.momentRange.start.format('Do MMM')} till {this.state.momentRange.end.format('Do MMM')}</td></tr>
                        <tr><td>Duration</td><td>{this.state.momentRange.diff('days')} days</td></tr>
                        <tr><td><h4>Total price</h4></td><td><h4><strong>£{this.state.price}</strong></h4></td></tr>
                      </tbody>
                    </Table>
                    <div className="errorMessage text-danger">{this.state.errorMessage}&nbsp;</div>
                    <input
                      type="submit"
                      value="Book now"
                      disabled={this.state.disableBookButton}
                      onClick={this.open}
                      className="smart-button btn btn-warning btn-lg float-right" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="jumbotron">
          <div className="row">
            <div className="col-lg-10 col-lg-offset-1">
              <h3>Booking History</h3>
              <br/>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                    {mapObject(this.props.state.bookings, function (key, value) {
                      return (
                        <tr key={key}>
                          <td>
                            <Link to={'booking/'+key}>{value.carType}</Link>
                          </td>
                          <td>
                            <Link to={'booking/'+key}>{moment(value.startDate).format('Do MMM YYYY')} till {moment(value.endDate).format('Do MMM YYYY')}</Link>
                          </td>
                          <td>
                            <Link to={'booking/'+key}>£{value.price}</Link>
                          </td>
                          <td>
                            <Link to={'booking/'+key}>{value.status}</Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

// export default checkAuth(ProtectedPage);
ProtectedPage.propTypes = {
  actions: PropTypes.object.isRequired
};

ProtectedPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {state};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({createBooking, retrieveBookings}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(checkAuth(ProtectedPage));

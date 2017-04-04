import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import {} from 'moment-range';
import {retrieveBooking} from '../../actions/bookingsActions';
import toastr from 'toastr';
import {Table, Button} from 'react-bootstrap';
import checkAuth from '../requireAuth';

export class BookingPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      booking: {}
    };

    this.props.actions.retrieveBooking(this.props.params.id).then(booking => {
      this.setState({booking: booking[this.props.params.id]});
    });
  }

  render() {

    let carImage = '';

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

    return (
      <div className="BookingPage">
        <div className="jumbotron text-center">
          <p>
            Thank you for booking with Smart Move Car Hire. Your car will be delivered to you on {moment(this.state.booking.startDate).format('dddd Do MMM YYYY')}.
          </p>
        </div>
        <div className="jumbotron">
          <div className="row">
            <div className="col-lg-10 col-lg-offset-1">
              <h2>Your booking</h2>
              <div className="row">
                <br/>
                <div className="col-lg-6">
                  <h4>Summary:</h4>
                  <Table responsive>
                    <tbody>
                      <tr><td>Booking ref</td><td>{this.props.params.id}</td></tr>
                      <tr><td>Car model</td><td>Smart {this.state.booking.carType}</td></tr>
                      <tr><td>Delivery on</td><td>{moment(this.state.booking.startDate).format('dddd Do MMM YYYY')}</td></tr>
                      <tr><td>Return date</td><td>{moment(this.state.booking.endDate).format('dddd Do MMM YYYY')}</td></tr>
                      <tr><td>Duration</td><td>{moment(this.state.booking.endDate).diff(moment(this.state.booking.startDate),'days')} days</td></tr>
                      <tr><td>Total cost</td><td>£{moment(this.state.booking.endDate).diff(moment(this.state.booking.startDate),'days')*17}</td></tr>
                      <tr><td><h4>Status</h4></td><td><h4>{this.state.booking.status}Awaiting delivery</h4></td></tr>
                    </tbody>
                  </Table>
                </div>
                <div className="col-lg-6">
                  {carImage}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

// export default checkAuth(ProtectedPage);
BookingPage.propTypes = {
  actions: PropTypes.object.isRequired
};

BookingPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {state};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({retrieveBooking}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(checkAuth(BookingPage));

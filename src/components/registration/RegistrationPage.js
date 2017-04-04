import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createUserWithEmailAndPassword} from '../../actions/authActions';
import RegistrationForm from './RegistrationForm';
import toastr from 'toastr';

export class RegistrationPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        email: "",
        password: "",
        firstName:"",
        additionalData: {
          firstName: "",
          lastName: "",
          telephone: ""
        }
      },
      saving: false
    };

    this.updateUserState = this.updateUserState.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  updateUserState(event) {
    const field = event.target.name;
    let user = this.state.user;
    if(field == 'firstName' || field == 'lastName' || field == 'telephone'){
      user.additionalData[field] = event.target.value;
    } else {
      user[field] = event.target.value;
    }

    return this.setState({user: user});
  }

  createUser(event) {
    event.preventDefault();

    this.setState({saving: true});

    this.props.actions.createUserWithEmailAndPassword(this.state.user, this.state.user.additionalData)
      .then((user) => toastr.success('User Created'))
      .catch(error => {
        toastr.error(error.message);
        this.setState({saving: false});
      });
  }

  render() {
    return (
      <div className="RegistrationPage">
        <div className="jumbotron">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2">
              <div className="">
                <p>
                  Already a member? Sign in here
                </p>
                <Link to="login" className="smart-button btn btn-warning btn-lg">Sign in</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="jumbotron">
          <div className="row">
            <div className="col-lg-3 col-lg-offset-2">
              <RegistrationForm
                onChange={this.updateUserState}
                onSave={this.createUser}
                saving={this.state.saving}
                user={this.state.user}
              />
            </div>

            <div className="col-lg-3 col-lg-offset-1">
              <br/><br/><br/><br/>
              <div className="panel panel-default">
                <div className="panel-body">
                  <p>Please have the following details ready:</p>
                  <ul>
                    <li>Driving license</li>
                    <li>Credit or Debit card</li>
                    <li>Address</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/><br/><br/>
      </div>
    );
  }
}

RegistrationPage.propTypes = {
  actions: PropTypes.object.isRequired
};

RegistrationPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({createUserWithEmailAndPassword}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);

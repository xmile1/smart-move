import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signInWithEmailAndPassword} from '../../actions/authActions';
import LoginForm from './LoginForm';
import toastr from 'toastr';

export class RegistrationPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        email: "",
        password: ""
      },
      saving: false
    };

    this.updateUserState = this.updateUserState.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  updateUserState(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }

  createUser(event) {
    event.preventDefault();

    this.setState({saving: true});

    this.props.actions.signInWithEmailAndPassword(this.state.user)
      .then(user => toastr.success('You are logged in'))
      .catch(error => {
        toastr.error(error.message);
        this.setState({saving: false});
      });
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2">
              <div className="">
                <p>
                  New to SmartMove? Create an account here
                </p>
                <Link to="register" className="smart-button btn btn-warning btn-lg">Create account</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="jumbotron">
          <div className="row">
            <div className="col-lg-3 col-lg-offset-2">
              <LoginForm
                onChange={this.updateUserState}
                onSave={this.createUser}
                saving={this.state.saving}
                user={this.state.user}
              />
              <br/>
              <span className="text-warning">Forgotten your password? Click here to reset it.</span>
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
    actions: bindActionCreators({signInWithEmailAndPassword}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);

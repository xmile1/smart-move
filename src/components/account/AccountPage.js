import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateUser, updateEmail, resetPassword} from '../../actions/userActions';
import AccountForm from './AccountForm';
import LicenseForm from './LicenseForm';
import BillingForm from './BillingForm';
import toastr from 'toastr';

export class AccountPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        additionalData:{}
      },
      saving: false,
      tab:'accountform'
    };

    this.updateUserState = this.updateUserState.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.state.user = Object.assign({}, this.props.user);
    this.state.tabContent = this.props.user.email ? (<AccountForm onChange={this.updateUserState}onSave={this.updateUserAccount}saving={this.state.saving}user={this.state.user}/>):'';

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user:Object.assign({}, nextProps.user),
      tab:'accountform',
      tabContent : (<AccountForm onChange={this.updateUserState}onSave={this.updateUserAccount}saving={this.state.saving}user={Object.assign({}, nextProps.user)}/>)
    });
  }

  updateUserState(event) {
    const field = event.target.name;
    let user = this.state.user;
    user.additionalData[field] = event.target.value;
    return this.setState({user: user});
  }

  changeTab(type) {
    var content;
    switch (type) {
      case 'accountform':
        content = (<AccountForm onChange={this.updateUserState}onSave={this.updateUserAccount}saving={this.state.saving}user={this.state.user}/>);
        break;
      case 'drivinglicense':
        content = (<LicenseForm onChange={this.updateUserState}onSave={this.updateUserAccount}saving={this.state.saving}user={this.state.user}/>);
        break;
      case 'billing':
        content = (<BillingForm onChange={this.updateUserState}onSave={this.updateUserAccount}saving={this.state.saving}user={this.state.user}/>);
        break;
      default:
    }
    this.setState({ tab:type, tabContent:content});
  }

  render() {
    return (
      <div className="RegistrationPage">
        <div className="jumbotron">
          <div className="row">
            <div className="col-sm-6 col-md-3 col-md-offset-1">
              <p>{this.props.user.additionalData ? this.props.user.additionalData.firstName+"'s":''} Account</p>
              Email: {this.state.user.email} (<a>change</a>)
              <br/>
              Password: ****** (<a>reset</a>)
            </div>
            <div className="col-sm-6 col-md-5 col-md-offset-3 col-lg-4 col-lg-offset-4">
              <dl className="dl-horizontal">
                <dt>Member since</dt>
                <dd>5th January 2017</dd>
              </dl>
              <dl className="dl-horizontal">
                <dt>Next renewal</dt>
                <dd>5th July 2017</dd>
              </dl>
              <dl className="dl-horizontal">
                <dt>Status</dt>
                <dd>Paid</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="jumbotron">
          <div className="row">
            <div className="col-sm-3 col-md-3 col-md-offset-1 col-lg-2">
              <ul className="nav nav-pills nav-stacked">
                <li role="presentation" className={this.state.tab=='accountform'?'active':''} onClick={this.changeTab.bind(this, 'accountform')}><a>Profile</a></li>
                <li role="presentation" className={this.state.tab=='drivinglicense'?'active':''} onClick={this.changeTab.bind(this, 'drivinglicense')}><a>Driving license</a></li>
                <li role="presentation" className={this.state.tab=='billing'?'active':''} onClick={this.changeTab.bind(this, 'billing')}><a>Billing</a></li>
              </ul>
              <br/>
            </div>
            <div className="col-sm-6 col-md-4 col-md-offset-1">
              {this.state.tabContent}
            </div>
          </div>
        </div>
        <br/><br/><br/>
      </div>
    );
  }
}

AccountPage.propTypes = {
  actions: PropTypes.object.isRequired
};

AccountPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({updateUser, updateEmail, resetPassword}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);

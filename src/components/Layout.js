import React from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signOut} from '../actions/authActions';

class Layout extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {auth, actions, loading, user} = this.props;
    return (
      <div className="container-fluid">
        <Header signOut={actions.signOut} auth={auth} loading={loading} user={user} />
        {React.cloneElement(this.props.children, { user: user })}
        <Footer />
      </div>
    );
  }
}

Layout.propTypes =  {
  children: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired,
  auth: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  loading: React.PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    auth: state.auth,
    user: state.user,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({signOut}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

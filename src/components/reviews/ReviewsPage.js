import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import checkAuth from '../requireAuth';

export class ReviewsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1>Reviews</h1>
        </div>
      </div>
    );
  }
}

ReviewsPage.propTypes = {
  actions: PropTypes.object.isRequired
};

ReviewsPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(checkAuth(ReviewsPage));

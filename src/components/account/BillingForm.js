import React from 'react';
import TextInput from '../common/TextInput';

const BillingForm = ({user, onSave, onChange, saving}) => {
  return (
    <form>
    </form>
  );
};

BillingForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  user: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default BillingForm;

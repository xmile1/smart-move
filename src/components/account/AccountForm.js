import React from 'react';
import TextInput from '../common/TextInput';

const AccountForm = ({user, onSave, onChange, saving}) => {
  
  return (
    <form>
      <TextInput
        name="firstName"
        label="First name"
        onChange={onChange}
        value={user.additionalData.firstName}
        />

      <TextInput
        name="lastName"
        label="Last name"
        onChange={onChange}
        value={user.additionalData.lastName}
        />

      <br/>

      <TextInput
        name="telephone"
        label="Mobile number"
        onChange={onChange}
        value={user.additionalData.telephone}
        />

      <br/>

      <TextInput
        name="doornumber"
        label="House/Flat number"
        onChange={onChange}
        value={user.additionalData.doornumber}
        />

      <TextInput
        name="streetname"
        label="Street name"
        onChange={onChange}
        value={user.additionalData.streetname}
        />

      <TextInput
        name="postcode"
        label="Postcode"
        onChange={onChange}
        value={user.additionalData.postcode}
        />

      <br/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Update'}
        className="smart-button btn btn-warning btn-lg"
        onClick={onSave}/>
    </form>
  );
};

AccountForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  user: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default AccountForm;

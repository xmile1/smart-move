import React from 'react';
import TextInput from '../common/TextInput';

const RegistrationForm = ({user, onSave, onChange, saving}) => {
  return (
    <form>
      <h2>Create an account</h2>
      <br/>
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

      <TextInput
        name="email"
        label="Email"
        onChange={onChange}
        value={user.email}
        />

      <TextInput
        name="telephone"
        label="Mobile number"
        onChange={onChange}
        value={user.additionalData.telephone}
        />

      <TextInput
        name="password"
        label="Password"
        onChange={onChange}
        value={user.password}
        />

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Creating account...' : 'Create account'}
        className="smart-button btn btn-warning btn-lg"
        onClick={onSave}/>
    </form>
  );
};

RegistrationForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  user: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default RegistrationForm;

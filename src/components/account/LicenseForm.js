import React from 'react';
import licensefront from '../../assets/images/drivinglicensefront.png';
import licenseback from '../../assets/images/drivinglicenseback.png';

const LicenseForm = ({user, onSave, onChange, saving}) => {
  return (
    <form>
      <p>Please upload pictures of the front and back of your valid driving license.</p>
      <h4>Front</h4>
      <img src={licensefront} className="img-responsive" />
      <br/><br/>
      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Uploading...' : 'Upload front'}
        className="smart-button btn btn-warning btn-lg"
        onClick={onSave}/>
      <br/><br/><br/>
      <h4>Back</h4>
      <img src={licenseback} className="img-responsive"/>
      <br/><br/>
      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Uploading...' : 'Upload back'}
        className="smart-button btn btn-warning btn-lg"
        onClick={onSave}/>
    </form>
  );
};

LicenseForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  user: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default LicenseForm;

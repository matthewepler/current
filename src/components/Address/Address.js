import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Address.css';

const Address = (props) => {
  // origin address is always stored in state first
  // improvement: change this to static field, not array
  const addressStr = props.idStr === 'origin' ?
    props.addresses[0]
    : props.addresses[1];

  const addressSplit = addressStr.split(',');
  addressSplit.splice(-1); // we don't need the country
  const street = addressSplit.splice(0, 1);
  const rest = addressSplit.join(',');

  return (
    <div>
      <h4 className="street">{street}</h4>
      <p className="rest">{rest}</p>
    </div>
  );
};

Address.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.object),
  idStr: PropTypes.string.isRequired,
};

Address.defaultProps = {
  addresses: [{}, {}],
};

export default connect(state => ({
  addresses: state.app.addresses,
}))(Address);

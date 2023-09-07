import PropTypes from 'prop-types';

import './style.scss';

function Toggler({ isOpen, toggleCurrencies }) {
  return (
    <div className="toggler">
      <button
        className={isOpen ? 'toggler-btn toggler-btn--open' : 'toggler-btn'}
        type="button"
        onClick={toggleCurrencies}
      >
        <span />
        <span />
        <span />
      </button>
    </div>
  );
}

Toggler.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleCurrencies: PropTypes.func.isRequired,
};

export default Toggler;

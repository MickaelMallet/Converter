import PropTypes from 'prop-types';
import Toggler from '../Toggler';

import './style.scss';

function Header({
  baseAmount, isOpen, toggleCurrencies, setAmount,
}) {
  return (
    <header className="header">
      <h1 className="header-title">Converter</h1>

      <p className="header-amount">
        <input
          className="header-amount__input"
          type="number"
          min={1}
          value={baseAmount}
          onChange={(event) => setAmount(event.target.value)}
        />
        euro
      </p>

      <Toggler isOpen={isOpen} toggleCurrencies={toggleCurrencies} />
    </header>
  );
}

Header.propTypes = {
  baseAmount: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleCurrencies: PropTypes.func.isRequired,
  setAmount: PropTypes.func.isRequired,
};

export default Header;

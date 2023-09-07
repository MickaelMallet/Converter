import PropTypes from 'prop-types';

function CurrenciesItem({ name, rate, changeCurrency }) {
  const handleClick = () => {
    changeCurrency({
      name,
      rate,
    });
  };

  return (
    <li
      className="currency"
      onClick={handleClick}
    >
      {name}
    </li>
  );
}

CurrenciesItem.propTypes = {
  name: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  changeCurrency: PropTypes.func.isRequired,
};

export default CurrenciesItem;

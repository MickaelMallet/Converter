import PropTypes from 'prop-types';
import CountUp from 'react-countup';

import './style.scss';

function Result({ currency: { name }, amount }) {
  return (
    <div className="result">
      {/* <span className="result-value">{amount.toFixed(2)}</span> */}
      <CountUp
        className="result-value"
        start={1}
        end={amount}
        duration={0.8}
        separator=" "
        decimals={2}
      />

      <span className="result-currency">{name}</span>
    </div>
  );
}

Result.propTypes = {
  currency: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  amount: PropTypes.number.isRequired,
};

export default Result;

import PropTypes from 'prop-types';

import CurrenciesItem from './CurrenciesItem';

import './style.scss';

function Currencies({
  list, changeCurrency, search, changeSearch,
}) {
  const currencies = list.map(({ name, rate }) => (
    <CurrenciesItem
      key={name}
      // {...currency}
      // ou on détaille
      name={name}
      rate={rate}
      changeCurrency={changeCurrency}
    />
  ));

  const handleChange = (event) => {
    changeSearch(event.target.value);
  };

  return (
    <div className="currencies">
      {/* <h2 className="currencies-title">Currencies</h2> */}

      {/*
        On va gérer nos champs de formulaire dans React :
         - la valeur du champ doit refléter la variable de notre _state_
         - à chaque saisie de l'utilisateur, on modifie cette variable grâce au _modifier_

        → c'est un « champ contrôlé » (_Controlled component_)
      */}
      <input
        className="currencies-search"
        type="search"
        placeholder="Search a currency…"
        value={search}
        onChange={handleChange}
      />

      <ul className="currencies-list">
        {currencies}
      </ul>
    </div>
  );
}

Currencies.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  changeCurrency: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  changeSearch: PropTypes.func.isRequired,
};

export default Currencies;

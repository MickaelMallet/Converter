import React from 'react';

import Currencies from './Currencies';
import Header from './Header';
import Result from './Result';
import Footer from './Footer';

import currencies from '../../data/currencies';
import './style.scss';
import LifeCycle from './LifeCycle';

/**
 * EXERCICE
 * Je veux fermer la liste des devises quand j'appuie sur la touche `Escape`
 *
 * 1. je veux (à un moment donné) ajouter un écouteur d'évènement des touches
 *    → element.addEventListener('keyup', handler) (`event.key`)
 * 2. où je l'ajoute : à quel moment du cycle de vie, à quelle phase ?
 * 3. je ferme ma liste → je passe isOpen à false
 */

class Converter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      currency: {
        name: 'Canadian Dollar',
        rate: 1.459549,
      },
      baseAmount: 10,
      isLiked: false,

      /*
        Fonctionnalité : filtrer les devises en fonction du nom
        - on crée un champ `search` dans <Currencies />
        - si je rentre un caractère dans le champ, ça modifie l'état
        de mon application
        → je dois gérer cet état dans le state

        - j'ajoute une variable d'état `search` initialisée à ''
        (choix, je pourrais initialiser avec une valeur par défaut)
        - je la diffuse jusqu'à Currencies
      */
      search: '',
    };
  }

  /*
    Cycle de vie
    objectif : modifier le titre de la page au cours de la « vie » du composant
  */
  componentDidMount() {
    console.log('Mounted!');
    this.pageTitleEffect();

    /* J'ai accès au DOM */
    document.addEventListener('keyup', this.handleKeyUp);
  }

  componentDidUpdate() {
    console.log('Updated!');
    this.pageTitleEffect();
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyUp = (event) => {
    console.log(event.key);
    const { baseAmount } = this.state;

    switch (event.key) {
      case 'Escape':
        this.setState({
          isOpen: false,
        });
        break;

      case '+':
        this.setState({
          baseAmount: baseAmount + 1,
        });
        break;

      case '-':
        this.setState({
          baseAmount: baseAmount > 1 ? baseAmount - 1 : baseAmount,
        });
        break;

      case 'Home':
        // scroll to the top of the list
        document.querySelector('.currencies').scroll({
          top: 0,
          behavior: 'smooth',
        });
        break;

      default:
        break;
    }
  };

  toggleCurrencies = () => {
    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  };

  toggleLike = () => {
    const { isLiked } = this.state;

    this.setState({
      isLiked: !isLiked,
    });
  };

  changeCurrency = (newCurrency) => {
    this.setState({
      currency: newCurrency,
    });
  };

  makeConversion = () => {
    const { currency: { rate }, baseAmount } = this.state;

    return baseAmount * rate;
  };

  changeSearch = (newValue) => {
    this.setState({
      search: newValue,
    });
  };

  getCurrencies = () => {
    const { search } = this.state;

    // SI la recherche (la saisie utilisateur), une fois ôtée de ses espaces
    // superflus (trim) a une longueur égale à 0
    // ALORS on retourne toutes les devises
    if (!search.trim().length) {
      return currencies;
    }

    return currencies.filter(({ name }) => (
      name.toLowerCase().includes(search.trim().toLowerCase())
    ));
  };

  setAmount = (newAmount) => {
    this.setState({
      baseAmount: Number(newAmount),
    });
  };

  pageTitleEffect() {
    const { currency: { name } } = this.state;
    // `document.title` n'existe que sur le DOM réel
    // → on doit donc attendre la réconciliation
    document.title = `Euro to ${name} | Converter`;
  }

  render() {
    const {
      isOpen, currency, baseAmount, isLiked, search,
    } = this.state;

    const convertedAmount = this.makeConversion();

    const filteredCurrencies = this.getCurrencies();

    return (
      <>
        <div className="converter">
          <Header
            baseAmount={baseAmount}
            isOpen={isOpen}
            toggleCurrencies={this.toggleCurrencies}
            setAmount={this.setAmount}
          />

          {isOpen && (
            <Currencies
              list={filteredCurrencies}
              changeCurrency={this.changeCurrency}
              search={search}
              changeSearch={this.changeSearch}
            />
          )}

          <Result currency={currency} amount={convertedAmount} />
        </div>

        <Footer isLiked={isLiked} toggleLike={this.toggleLike} />

        {isOpen && <LifeCycle baseAmount={baseAmount} />}
      </>
    );
  }
}

export default Converter;

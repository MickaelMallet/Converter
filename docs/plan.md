# React – Méthodologie

_Disclaimer_ : ce document décrit UNE méthodologie pour créer une application React.
Ce n'est qu'une proposition, à vous de trouver celle qui vous convient le mieux.

## Analyse

On analyse la maquette graphique pour déterminer les composants à créer.

<details>
  <summary>Exemple</summary>

  ```text
  <Converter>
    <Header />

    <Currencies>
      <CurrenciesItem / >
      <CurrenciesItem / >
      <CurrenciesItem / >
    </Currencies>
    
    <Result />
  <Converter />
  ```

</details>

## Construction statique

On crée nos composants « nus », on prépare les classes pour le style, on remplit avec des données « codées en dur ».

<details>
  <summary>Exemple</summary>

  ```js
  // @file ./src/components/Converter/index.js
  import Header from './Header';
  import Currencies from './Currencies';
  import Result from './Result';

  import './style.scss';

  function Converter() {
    return (
      <div className='converter'>
        <Header />

        <main className='main'>
          <Currencies />

          <Result />
        </main>
      </div>
    );
  }

  export default Converter;

  // @file ./src/components/Converter/Header/index.js
  import './style.scss';

  function Header() {
    return (
      <header className='header'>
        <h1 className='header-title'>Converter</h1>

        <p className='header-amount'>1 euro</p>
      </header>
    );
  }

  export default Header;

  // @file ./src/components/Converter/Currencies/index.js
  import CurrenciesItem from './CurrenciesItem';

  import './style.scss';

  function Currencies() {
    return (
      <div className='currencies'>
        <h2 className='currencies-title'>Currencies</h2>

        <ul>
          <CurrenciesItem />
          <CurrenciesItem />
          <CurrenciesItem />
        </ul>
      </div>
    );
  }

  export default Currencies;

  // @file ./src/components/Converter/Currencies/CurrenciesItem.js
  function CurrenciesItem() {
    return (
      <li className='currency'>Australian Dollar</li>
    );
  }

  export default CurrenciesItem;

  // @file ./src/components/Converter/Currencies/CurrenciesItem.js
  import './style.scss';

  function Result() {
    return (
      <div className='result'>
        <span className='result-value'>1.09</span>
        <span className='result-currency'>United States Dollar</span>
      </div>
    );
  };

  export default Result;
  ```

</details>

## Passage des _props_

On réfléchit à nos données :

- quelles seront les données dynamiques de notre application ?
- d'où viennent-elles ? Du parent, de la racine ? On remonte le fil…

L'information (les données) qui part d'un composant parent pour alimenter
un enfant est transformée en _props_.  
Une donnée qui « reste » dans un composant est une « simple » variable.

On oublie pas les _PropTypes_ pour sécuriser notre code !  
On reste générique (par exemple : `PropTypes.array` pour le moment).

> Attention, les _PropTypes_ se servent pas à sécuriser le code dans le sens
> se défendre contre des personnes malintentionnées  
> mais **servent à éviter les bugs et les erreurs d'affichage ou de traitement**

On renseigne ces _props_ avec du code en dur pour le moment, de la fausse donnée.

<details>
  <summary>Exemple</summary>

  ```js
  // @file ./src/components/Converter/index.js
  import Header from './Header';
  import Currencies from './Currencies';
  import Result from './Result';

  import currenciesList from 'src/data/currencies';

  import './style.scss';

  function Converter() {
    return (
      <div className='converter'>
        <Header baseAmount={1} />

        <main className='main'>
          <Currencies list={currenciesList} />

          <Result currency='United State Dollar' amount={1.09} />
        </main>
      </div>
    );
  }

  export default Converter;

  // @file ./src/components/Converter/Header/index.js
  import PropTypes from 'prop-types';

  import './style.scss';

  function Header({ baseAmount }) {
    return (
      <header className='header'>
        <h1 className='header-title'>Converter</h1>

        <p className='header-amount'>{baseAmount} euro</p>
      </header>
    );
  }

  Header.propTypes = {
    baseAmount: PropTypes.number.isRequired,
  };

  export default Header;

  // @file ./src/components/Converter/Currencies/CurrenciesItem.js
  function CurrenciesItem({ name }) {
    return (
      <li className='currency'>{name}</li>
    );
  }
  
  CurrenciesItem.propTypes = {
    name: PropTypes.string.isRequired,
  };

  export default CurrenciesItem;

  // @file ./src/components/Converter/Currencies/index.js
  import PropTypes from 'prop-types';

  import CurrenciesItem from './CurrenciesItem';

  import './style.scss';

  function Currencies({ list }) {
    return (
      <div className='currencies'>
        <h2 className='currencies-title'>Currencies</h2>

        <ul>
          <CurrenciesItem name='Australian Dollar' />
          <CurrenciesItem name='Bulgarian Lev' />
          <CurrenciesItem name='Brazilian Real' />
        </ul>
      </div>
    );
  }
  
  Currencies.propTypes = {
    // 1. list: PropTypes.array.isRequired,
    /*
      Une fois que `CurrenciesItem` est créé, je regarde ses _props_
      et je mets à jour cet objet.
      À chaque modification des _props_ de `CurrenciesItem`,
      je répercute les changements ici 
    */
    list: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  };

  export default Currencies;

  // @file ./src/components/Converter/Currencies/CurrenciesItem.js
  import PropTypes from 'prop-types';

  import './style.scss';

  function Result({ currency, amount }) {
    return (
      <div className='result'>
        <span className='result-value'>{amount}</span>
        <span className='result-currency'>{currency}</span>
      </div>
    );
  }

  Result.propTypes = {
    currency: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  };

  export default Result;
  ```

</details>

## Gestion du _state_

Le _state_ est l'**unique source de vérité** (_SSoT_) :
on s'assure que l'application utilise les « bonnes » données à tout moment
et dans chaque composant. Ces données doivent être uniques (dans l'application)
pour éviter les effets de bords (risque de bugs).

### _Class component_

Pour le moment, on transforme notre _Function component_ en classe.

[Étapes](https://reactjs.org/docs/state-and-lifecycle.html#converting-a-function-to-a-class) :

1. on crée une classe (avec le même nom) qui étend `React.Component`

2. on crée un constructeur qui prend les _props_ en paramètre et qui les transmet au constructeur de base (`React.Component`)

    ```js
    constructor(props) {
      super(props);
    }
    ```

3. on ajoute une méthode `render()` (vide pour l'instant)

4. on y déplace le code de la fonction

5. on remplace les _props_ par `this.props.PROP_NAME` dans le `render()`

<details>
  <summary>Exemple</summary>

  ```js
  // @file ./src/components/Converter/index.js
  import Header from './Header';
  import Currencies from './Currencies';
  import Result from './Result';

  import currenciesList from 'src/data/currencies';

  import './style.scss';

  class Converter extends React.Component {
    render() {
      return (
        <div className='converter'>
          <Header baseAmount={1} />

          <main className='main'>
            <Currencies list={currenciesList} />

            <Result currency='United State Dollar' amount={1.09} />
          </main>
        </div>
      );
    }
  }

  export default Converter;
  ```

</details>

### Initialisation

On crée le _state_ :

1. vérifier que le composant soit bien en classe (voir ci-dessus)

2. on ajoute une propriété `state` dans le constructeur

3. on y définit un état initial, propriété par propriété
    > travailler composant par composant est plus simple

    - on prend un premier composant, on ajoute une propriété dans le _state_  
    - ce composant a-t-il une autre propriété de _state_ ?  
    - on passe au composant suivant…

### Lecture/diffusion

1. on prépare le composant enfant à lire cet état en créant (si nécessaire)
une nouvelle _prop_ (on pense aux _PropTypes_)

    → on passe de la fausse données pour commencer pour découper et vérifier ces étapes

2. on diffuse cette variable d'état vers le composant enfant via les _props_

### Modification

Souvent, on voudra modifier la valeur d'une propriété du _state_
suite à un évènement par exemple.

1. on définit une fonction pour modifier le _state_ dans l'élément racine
(ou celui que a le _state_) → `myFunc() = () => { this.setState(...) },`

2. on passe ce _modifier_ à l'enfant via les _props_

3. on détermine l'évènement (`onClick`, `onChange`, `onSubmit`…) et on appelle
le _modifier_ dans le _callback_

> voir [schéma simple](./parent_child.drawio)  
> voir [schéma Converter](./schema.drawio)

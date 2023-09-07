import React from 'react';
import PropTypes from 'prop-types';

class LifeCycle extends React.Component {
  constructor(props) {
    super(props);

    console.log('CONSTRUCTOR');
    console.log(document.querySelector('.aside'));
  }

  componentDidMount() {
    console.log('MOUNTED');
    /*
    Le composant vient d'être rendu pour la première fois
      → le DOM est réconcilié

    Ça va nous permettre certains traitements qui n'étaient pas possible
    sans le DOM réel (appel de fonction, ajout des évènements…).

    Ces traitements nécessitent un accès au DOM réel.

    Exemples :
     - modifier le titre de la page
     - ajoute l'évènement `scroll` à la page
     - lancer un `setTimeout` pour supprimer un message flash/pop-up
        au bous d'un certain temps
    */
    console.log(document.querySelector('.aside'));
  }

  componentDidUpdate() {
    console.log('UPDATED');
    /*
    Le composant vient d'être mis à jour
      → le DOM est réconcilié

    Ça va nous permettre certains traitements qui doivent être appelé
    à chaque mise à jour.

    Exemples :
     - faire une requête API en fonction d'un paramètre
    */
  }

  componentWillUnmount() {
    console.log('UNMOUNTED');
    /*
    Le composant vient d'être supprimé

    Ça va nous permettre de supprimer des évènements associé à un composant

    Exemple :
     - supprimer/arrêter le `setTimeout` pour le message flash/pop-up
    */
    console.log(document.querySelector('.aside'));
  }

  render() {
    console.log('RENDER');
    console.log(document.querySelector('.aside'));

    return (
      <aside className="aside">
        <h2>Actual base amount : {this.props.baseAmount}</h2>
      </aside>
    );
  }
}

LifeCycle.propTypes = {
  baseAmount: PropTypes.number.isRequired,
};

export default LifeCycle;

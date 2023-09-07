# Pour gérer un _state_

## Class component

1. on transforme notre _Function Component_ en _Class Component_
    → <https://reactjs.org/docs/state-and-lifecycle.html#converting-a-function-to-a-class>

2. on déclare un _state_ dans le constructeur de la Classe

    ```js
    class MyComponent extends React.Component {
      constructor(props) {
        super(props);

        this.state = { // State
          myVariable: 'value', // on initialise une « variable d'état »
        };
      }
    }
    ```

3. on propage cette variable jusqu'au(x) composant(s) qui s'en sert(vent) via les props

4. de la même manière, on passe la fonction qui modifie cette variable d'état
(= _modifier_) via les props

5. on appelle ce _modifier_ en réponse à un évènement (`onClick`, `onChange`…)

    > **Attention au contexte (= `this`)**
    > on doit s'assurer que `this` correspondent à l'instanciation de notre composant
    >
    > - soit on utilise `bind`
    > - soit on utilise une fonction fléchée pour notre _modifier_

## Gestion du _state_

1. **Initialisation** : on définit une variable d'état et on lui affecte une valeur
2. **Diffusion** : on transmet cette variable aux composants concernés via les props
3. **Lecture** : on traduit/représente le _state_ en portion d'UI
4. **Modification** : on gère la modification du _state_
  
    - on déclare un _modifier_ (une fonction qui va modifier le _state_)
    grâce à la méthode `this.setState()` de React
    - on diffuse ce _modifier_ vers le(s) composant(s) concerné(s)
    - on crée un écouteur d'évènement pour utiliser le _modifier_

# Gérer les branches Git

Par défaut, quand on clone un dépôt, on ne récupère que la branche principale
(main/master).  
Pour récupérer les autres branches plusieurs solutions :

## Récupérer toutes les branches d'un dépôt en 1 coup

```bash
git branch -r | grep -v '\->' | sed "s,\x1B\[[0-9;]*[a-zA-Z],,g" | while read remote; do git branch --track "${remote#origin/}" "$remote"; done
git fetch --all
git pull --all
```

<https://stackoverflow.com/questions/10312521/how-do-i-fetch-all-git-branches/10312587#10312587>

## Récupérer une branche spécifique

Exemple : branche `correction`

1. on crée la branche en local

    ```bash
    git switch -c correction
    ```

    ou

    ```bash
    git checkout -b correction
    ```

2. on rapatrie les modifications distantes

    ```bash
    git pull origin correction
    ```

## Créer une branche à partir d'un commit précis

1. identifier le commit

    ```bash
    git log --oneline
    ```

    ou passer par GitHub

2. on récupère l'identifiant du commit = SHA

    _ex : aa60b3bc107cc7c36b95defb7b25898595b27bda_

3. on crée une branche à partir de ce commit

    ```bash
    git checkout -b newBranch aa60b3bc107cc7c36b95defb7b25898595b27bda
    ```

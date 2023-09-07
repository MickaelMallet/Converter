# Fonts personnalisées

## Depuis un site distant

```scss
// @file ./src/styles/index.scss
@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;500;700&display=swap');

body {
  font-family: 'League Spartan', sans-serif;
  font-weight: 300;
}
```

Attention à Google Fonts : **il ne respecte pas le RGPD**.

Plusieurs solutions :

- on cherche un site alternatif (ex: <https://www.fontsquirrel.com/>)

- on suit le chemin CSS du GoogleFonts jusqu'à télécharger la police désirée

  - `https://fonts.googleapis.com/css2?family=League+Spartan:wght@300`
  - Latin-ext : `https://fonts.gstatic.com/s/leaguespartan/v6/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMoITZDc1dJgs.woff2`

## on importe nos fonts dans notre SCSS

1. on crée un fichier `./src/styles/_fonts.scss`
2. on importe nos fonts dans le dossier `./src/assets/fonts`
3. on ajoute nos fonts avec `@font-face`

    ```scss
    @font-face {
      src: url('../assets/fonts/LeagueSpartan-Light.ttf') format('truetype');
      font-family: 'League Spartan';
      font-style: normal;
      font-weight: 300;
    }
    ```

4. on importe ce fichier dans `./src/styles/index.scss`

    ```scss
    @use 'fonts'; // importe nos propres fonts
    ```

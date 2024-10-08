# cooking-website

## TODO
- Réfléchir à comment gérer le select serving count sur la page d'une recette. Lié à la liste de courses ou non
- Au changement de servingcount vérifier si on a des ingrédients cochés et si oui, alert attention cela va réinitialiser la liste de courses (Oui/Non)"
- Déplacer servingCount dans un store pour lui et utiliser le store dans groceryStore et recipeStore

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

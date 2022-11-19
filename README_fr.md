# react-readme-printer 👋
Inclut un composant pour automatiquement charger et convertir un fichier README en JSX. Inclut aussi une fonction pour uniquement charger le README.


## Installation 
`npm i react-readme-printer`


## Démo et API 👀

[https://axelmry.com/react-readme-printer](https://axelmry.com/react-readme-printer) (...avec du code 😉)


## Utilisation 💻

```javascript
import React from 'react'
import { MarkdownPrinter } from 'react-readme-printer'

const Example = () => {
    return (
        <MarkdownPrinter
            username='axelmy318'
            repository='react-readme-printer'
            branch='master'
            file='custom_readme_name'
        />
    )
    
}

export default Example
```


## Dépendances

Ce projet s'appuie sur [react-markdown](https://www.npmjs.com/package/react-markdown) pour convertir les fichiers MD en JSX


## API ✔

| Propriétés | type | défaut | description |
|--|--|--|--|
| username | string | null | Le username GitHub |
| repository | string | null | Le dépôts sur lequel récuperer le README |
| branch | string | "main" | La branche sur laquelle se trouve le README |
| file | string | "README" | Le nom du fichier README. Le `.md` est ajouté automatiquement |
| showRepository | bool | true | Montrer le repository ou non. Voir les exemples |
| markdownConfig | object | {} | Les props à passer au componsant `ReactMarkdown` |
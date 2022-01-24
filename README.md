# react-readme-printer 👋
Provides a function to load a readme file from github repositories and a React component to convert markdown to jsx


## Installation 
`npm i react-readme-printer`


## Demo 👀

(...with code 😉)

[https://axelmy-projects-showcase.firebaseapp.com/react-readme-printer](https://axelmy-projects-showcase.firebaseapp.com/react-readme-printer)


## Usage 💻

```javascript
import React from 'react'
import { MarkdownPrinter } from 'react-readme-printer'

const Example = () => {
    return (
        <MarkdownPrinter
            username='axelmy318'
            repository='react-readme-printer'
            branch='master'
        />
    )
    
}

export default Example
```


## Dependecies

This project relies on [react-markdown](https://www.npmjs.com/package/react-markdown) to convert the markdown files to JSX


## API ✔

| Properties | type | default | description |
|--|--|--|--|
| username | string | null | The GitHub username |
| repository | string | null | The GitHub repository from which to fetch the README.md |
| branch | string | "main" | The branch on which to fetch the README.md |
| showRepository | bool | true | Wether to show the repository name or not. See examples |
| markdownConfig | object | {} | The props to pass down to the ReactMarkdown component |


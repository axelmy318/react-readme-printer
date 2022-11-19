# react-readme-printer 👋
Provides a function to load a readme file from github repositories and a React component to automatically load and convert markdown to jsx


## Installation 
`npm i react-readme-printer`


## Demo 👀

[https://axelmry.com/react-readme-printer](https://axelmry.com/react-readme-printer) (...with code 😉)


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
            file='custom_readme_name'
        />
    )
    
}

export default Example
```


## Dependencies

This project relies on [react-markdown](https://www.npmjs.com/package/react-markdown) to convert the markdown files to JSX


## API ✔

| Properties | type | default | description |
|--|--|--|--|
| username | string | null | The GitHub username |
| repository | string | null | The GitHub repository from which to fetch the README.md |
| branch | string | "main" | The branch on which to fetch the README.md |
| file | string | "README" | The filename of the readme file. The `.md` is automatically added |
| showRepository | bool | true | Wether to show the repository name or not. See examples |
| markdownConfig | object | {} | The props to pass down to the ReactMarkdown component |
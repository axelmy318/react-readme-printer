import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoPrimitiveDot as LogoDot } from 'react-icons/go'
import { IconContext } from 'react-icons/lib';
import ReactMarkdown from 'react-markdown';
import './MarkdownPrinter.css'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight';
import PropTypes from 'prop-types';
import rehypeRaw from 'rehype-raw';


const MarkdownPrinter = ({ onLoaded, username, repository, branch, file, markdown, showRepository, markdownConfig, mode, convertHtmlImgToMarkdown }) => {
    const [currentMD, setCurrentMD] = useState(markdown);

    useEffect(() => {
        if(!markdown) {
            LoadGithubReadme(username, repository, branch, file)
                .then(response => {
                    if(response.success) {
                        setCurrentMD(response.data)
                        onLoaded(true)
                    }
                    else {
                        setCurrentMD(`\`This file was not found.<img src="test.svg" />\``)
                        onLoaded(false)
                    }
                })
        }
    }, [username, repository, branch, file]);

    const changeImgToGFMImages = md => {
        if(!md) return md

        var regex = /<img\s+src\s*=\s*("[^"]+"|'[^']+')\s+(?:alt\s*=\s*("[^"]+"|'[^']+')\s+)?(?:width\s*=\s*("[^"]+"|'[^']+')\s+)?(?:height\s*=\s*("[^"]+"|'[^']+')\s+)?\/?>/g;
        var html = md // Your HTML code
        var matches;
        while ((matches = regex.exec(html)) !== null) {
            console.log("", matches[0]);
            console.log("src", matches[1]); // src
            console.log("alt", matches[2]); // alt
            console.log("width", matches[3]); // width
            console.log("height", matches[4]); // height
        }

        const pattern = new RegExp(/<img\s+src\s*=\s*("[^"]+"|'[^']+')\s+(?:alt\s*=\s*("[^"]+"|'[^']+')\s+)?(?:width\s*=\s*("[^"]+"|'[^']+')\s+)?(?:height\s*=\s*("[^"]+"|'[^']+')\s+)?\/?>/g)
        let newMd = md.replace(pattern, (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11) => {
            console.log("group", [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10])
            return `![](${p4})`
        })

        console.log(newMd)
        return newMd
    }

    function replaceImgTags(inputString) {
        if(convertHtmlImgToMarkdown) {
            let regex = /<img\s*src\s*=\s*("[^"]+"|'[^']+')\s*(?:alt\s*=\s*("[^"]+"|'[^']+')\s*)?(?:width\s*=\s*("[^"]+"|'[^']+')\s*)?(?:height\s*=\s*("[^"]+"|'[^']+')\s*)?\/>/gm;
            let outputString = inputString.replace(regex, function(match, src, alt) {
              src = src.replace(/^"|"$|^'|'$/g, '');
              return `![${alt ? alt.replace(/^"|"$|^'|'$/g, '') : ''}](${src})`;
            });
            return outputString;
        } else 
            return inputString
      }
    
    return (
    <div className={`markdown-container ${mode === 'dark' ? 'dark-mode' : ""}`}>
        <div className={`markdown-content ${mode === 'dark' ? 'dark-mode' : ""}`}>
            {showRepository && <span className={`readme-file ${mode === 'dark' ? 'dark-mode' : ""}`}>
                <span className={`repo ${mode === 'dark' ? 'dark-mode' : ""}`}>{username} / {repository}</span> 
                <IconContext.Provider value={{color: mode === 'dark' ? 'rgb(226, 226, 226)' : 'grey'}}><LogoDot className='repo-dot' /></IconContext.Provider> 
                <span className={`file ${mode === 'dark' ? 'dark-mode' : ""}`}>{file}.md</span>
            </span>}
            <div className={`markdown ${mode === 'dark' ? 'dark-mode' : ""}`}>
                <ReactMarkdown 
                    className={`markdown-body ${mode === 'dark' ? 'dark-mode' : ""}`} 
                    children={replaceImgTags(currentMD ?? '')} 
                    remarkPlugins={[remarkGfm]} 
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                        img(node, ...props) {
                            console.log(node)
                            return (<img src={node.src} width='32px'style={{backgroundColor: 'transparent'}} />)
                        },
                        h1(node, ...props) {
                            
                            console.log(node)
                            return (<h2>{node.children}</h2>)
                        }
                    }}
                    {...markdownConfig}
                />
            </div>
        </div>
    </div>
    );
};

MarkdownPrinter.propTypes = {
    username: PropTypes.string,
    onLoaded: PropTypes.func,
    repository: PropTypes.string,
    branch: PropTypes.string,
    markdown: PropTypes.string,
    showRepository: PropTypes.bool,
    useRemarkGfm: PropTypes.bool,
    useRehypeHighlight: PropTypes.bool,
    markdownConfig: PropTypes.object,
    mode: PropTypes.string,
    file: PropTypes.string,
    convertHtmlImgToMarkdown: PropTypes.bool
}

MarkdownPrinter.defaultProps = {
    username: '',
    repository: '',
    branch: 'main',
    markdown: null,
    showRepository: true,
    useRemarkGfm: true,
    useRehypeHighlight: true,
    markdownConfig: {},
    onLoaded: () => {},
    mode: "light",
    file: 'README',
    convertHtmlImgToMarkdown: false
}

export default MarkdownPrinter;

export const LoadGithubReadme = async(username, repository, branch = 'main', file = 'README') => {
    const url = `https://raw.githubusercontent.com/${username}/${repository}/${branch}/${file}.md`
    
    return await axios.get(url)
        .then((response) =>  {
            return {success: true, data: response.data}
        })
        .catch(error => {
            return {success: false, data: null}
        })
}

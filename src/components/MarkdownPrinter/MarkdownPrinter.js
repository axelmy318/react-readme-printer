import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoPrimitiveDot as LogoDot } from 'react-icons/go'
import { IconContext } from 'react-icons/lib';
import ReactMarkdown from 'react-markdown';
import './MarkdownPrinter.css'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight';
import PropTypes from 'prop-types';


const MarkdownPrinter = ({ onLoaded, username, repository, branch, markdown, showRepository, useRemarkGfm, useRehypeHighlight, markdownConfig, mode }) => {
    const [currentMD, setCurrentMD] = useState(markdown);

    useEffect(() => {
            LoadGithubReadme(username, repository, branch)
                .then(response => {
                    if(response.success) {
                        setCurrentMD(response.data)
                        onLoaded(true)
                    }
                    else {
                        setCurrentMD(`\`error loading file\``)
                        onLoaded(false)
                    }
                })
    }, [username, repository, branch]);
    

    return (
    <div className={`markdown-container ${mode === 'dark' ? 'dark-mode' : ""}`}>
        <div className={`markdown-content ${mode === 'dark' ? 'dark-mode' : ""}`}>
            {showRepository && <span className={`readme-file ${mode === 'dark' ? 'dark-mode' : ""}`}>
                <span className={`repo ${mode === 'dark' ? 'dark-mode' : ""}`}>{username} / {repository}</span> 
                <IconContext.Provider value={{color: mode === 'dark' ? 'rgb(226, 226, 226)' : 'grey'}}><LogoDot className='repo-dot' /></IconContext.Provider> 
                <span className={`file ${mode === 'dark' ? 'dark-mode' : ""}`}>README.md</span>
            </span>}
            <div className={`markdown ${mode === 'dark' ? 'dark-mode' : ""}`}>
                <ReactMarkdown 
                    className={`markdown-body ${mode === 'dark' ? 'dark-mode' : ""}`} 
                    children={currentMD} 
                    remarkPlugins={[remarkGfm]} 
                    rehypePlugins={[rehypeHighlight]}

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
    mode: "light"
}

export default MarkdownPrinter;

export const LoadGithubReadme = async(username, repository, branch = 'main') => {
    const url = `https://raw.githubusercontent.com/${username}/${repository}/${branch}/README.md`
    
    return await axios.get(url)
        .then((response) =>  {
            return {success: true, data: response.data}
        })
        .catch(error => {
            return {success: false, data: null}
        })
}

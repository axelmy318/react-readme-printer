import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoPrimitiveDot as LogoDot } from 'react-icons/go'
import { IconContext } from 'react-icons/lib';
import ReactMarkdown from 'react-markdown';
import './MarkdownPrinter.css'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight';
import PropTypes from 'prop-types';


const MarkdownPrinter = ({ username, repository, branch, markdown, showRepository, useRemarkGfm, useRehypeHighlight, markdownConfig }) => {
    const [currentMD, setCurrentMD] = useState(markdown);

    useEffect(() => {
        if(!currentMD) {
            LoadGithubReadme(username, repository, branch)
                .then(response => {
                    if(response.success)
                        setCurrentMD(response.data)
                    else
                        setCurrentMD(`\`error loading file\``)
                })
        }
    }, []);
    

    return (
    <div className='markdown-container'>
        <div className='markdown-content'>
            {showRepository && <span className='readme-file'>
                <span className='repo'>{username} / {repository}</span> 
                <IconContext.Provider value={{color: 'grey'}}><LogoDot /></IconContext.Provider> 
                <span className='file'>README.md</span>
            </span>}
            <div className='markdown'>
                <ReactMarkdown 
                    className='markdown-body' 
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
    repository: PropTypes.string,
    branch: PropTypes.string,
    markdown: PropTypes.string,
    showRepository: PropTypes.bool,
    useRemarkGfm: PropTypes.bool,
    useRehypeHighlight: PropTypes.bool,
    markdownConfig: PropTypes.object
}

MarkdownPrinter.defaultProps = {
    username: '',
    repository: '',
    branch: 'main',
    markdown: null,
    showRepository: true,
    useRemarkGfm: true,
    useRehypeHighlight: true,
    markdownConfig: {}
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

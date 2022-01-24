import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoPrimitiveDot as LogoDot } from 'react-icons/go'
import { IconContext } from 'react-icons/lib';
import ReactMarkdown from 'react-markdown';
import './MarkdownPrinter.css'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight';

const MarkdownPrinter = ({ username, repository, branch, markdown }) => {
    const [currentMD, setCurrentMD] = useState(markdown);

    useEffect(() => {
        if(!currentMD) {
            LoadGithubReadme(username, repository, branch)
                .then(response => {
                    if(response.success)
                        setCurrentMD(response.data)
                    else
                        setCurrentMD(`### error loading file`)
                })
        }
    }, []);
    

    return (
    <div className='markdown-container'>
        <div className='markdown-content'>
            <span className='readme-file'>
                <span className='repo'>{username} / {repository}</span> 
                <IconContext.Provider value={{color: 'grey'}}><LogoDot /></IconContext.Provider> 
                <span className='file'>README.md</span>
            </span>
            <div className='markdown'>
                <ReactMarkdown 
                    className='markdown-body' 
                    children={currentMD} 
                    remarkPlugins={[remarkGfm]} 
                    rehypePlugins={[rehypeHighlight]}
                />
            </div>
        </div>
    </div>
    );
};

MarkdownPrinter.defaultProps = {
    username: '',
    repository: '',
    branch: 'main',
    markdown: null,
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

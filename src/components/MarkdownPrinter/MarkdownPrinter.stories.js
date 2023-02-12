import React, { useState } from 'react';

import MarkdownPrinter from './MarkdownPrinter';
import { LoadGithubReadme } from './MarkdownPrinter';

export default {
  title: 'MarkdownPrinter/MarkdownPrinter',
  component: MarkdownPrinter,
  argTypes: {
    showChars: { control: 'number' }
  },
};

const Template = (args) => {
    const onLoaded = (val) => console.log("Loaded readme", val)

    return (<div style={{backgroundColor: '#20232A', padding: '50px'}}>
        <MarkdownPrinter {...args} mode={'dark'} onLoaded={onLoaded} />
    </div>)
};

export const Primary = Template.bind({});
Primary.args = {
    showRepository: false,
    username:'axelmy318',
    repository:'axelmy318' ,
    branch:'testLogos',
    convertHtmlImgToMarkdown: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
    showRepository: true,
    username:'axelmy318',
    repository:'react-weekdays-input' ,
    branch:'master',
    mode: 'dark'
};
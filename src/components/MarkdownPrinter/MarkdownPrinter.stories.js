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
    LoadGithubReadme('axelmy318', 'axelmy318', 'main').then(response => console.log(response))
    return (<div style={{backgroundColor: '#20232A', padding: '50px'}}>
        <MarkdownPrinter {...args} mode={'dark'} />
    </div>)
};

export const Primary = Template.bind({});
Primary.args = {
    showRepository: false,
    username:'axelmy318',
    repository:'react-weekdays-input' ,
    branch:'master',
};

export const Secondary = Template.bind({});
Secondary.args = {
    showRepository: true,
    username:'axelmy318',
    repository:'react-weekdays-input' ,
    branch:'master',
    mode: 'dark'
};
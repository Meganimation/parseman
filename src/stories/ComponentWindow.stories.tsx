import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ComponentWindow } from './ComponentWindow';

import { LogtailComponent } from 'components';

export default {
  title: 'ComponentWindow/ComponentWindow',
  component: ComponentWindow,
} as ComponentMeta<typeof ComponentWindow>;

const Template: ComponentStory<typeof ComponentWindow> = (args) => <ComponentWindow {...args} > hello</ComponentWindow>;

export const Primary = Template.bind({});
Primary.args = {
  darkMode: true,
  onExit: () => {alert('This is an onExit function, it is called when the X button is clicked')},
  children: 'This is the content of the component window',
 
};

export const Secondary = Template.bind({});
Secondary.args = {
};


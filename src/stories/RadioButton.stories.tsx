import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RadioButton } from './RadioButton';

export default {
  title: 'RadioButton/RadioButton',
  component: RadioButton,
} as ComponentMeta<typeof RadioButton>;

const Template: ComponentStory<typeof RadioButton> = (args) => <RadioButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
onClick: () => {alert('Hello World')},
label: 'Hello World',
value: 'Radio A',
checked: false,

};

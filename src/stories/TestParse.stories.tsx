import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TestParse } from "./TestParse";

export default {
  title: "TestParse/TestParse",
  component: TestParse,
} as ComponentMeta<typeof TestParse>;

const Template: ComponentStory<typeof TestParse> = (args) => <TestParse {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  darkMode: true,
};

export const Secondary = Template.bind({});
Secondary.args = {};
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Tooltip from "./Tooltip/Tooltip";

export default {
  title: "Tooltip/Tooltip",
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <Tooltip {...args} >
    <button>hover over me</button>
  </Tooltip>
);

export const Primary = Template.bind({});
Primary.args = {
  tooltipComponent: <div>this is the tooltipComponent</div>,
  placement: "bottom",
  space: 15,
  children: <button>hover over me</button>,
};

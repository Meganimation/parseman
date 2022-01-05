import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Modal } from "./Modal";

export default {
  title: "Modal/Modal",
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  darkMode: true,
};

export const Secondary = Template.bind({});
Secondary.args = {};

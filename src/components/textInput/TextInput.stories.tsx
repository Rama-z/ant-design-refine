import type { Meta, StoryObj } from "@storybook/react";

import { TextInput } from "./TextInput";

const meta: Meta<typeof TextInput> = {
  title: "Example/TextInput",
  component: TextInput,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Stories: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
};

export const Stories2: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
};

export const Stories3: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
};

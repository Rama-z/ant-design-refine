import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
    priorities: {
      options: ["primary", "secondary", "disabled"],
      control: {
        type: "radio",
      },
    },
    borderRadius: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const PrimaryButton: Story = {
  args: {},
};

export const SecondaryButton: Story = {
  args: {
    priorities: "secondary",
    number: 2,
  },
};

export const DisabledButton: Story = {
  args: {
    priorities: "disabled",
    number: 3,
  },
};

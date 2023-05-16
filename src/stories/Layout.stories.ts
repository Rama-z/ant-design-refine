import { Meta, StoryObj } from "@storybook/react";
import { LoginPage } from "../pages/auth/components";

const meta: Meta<typeof LoginPage> = {
  title: "HeaderRill",
  component: LoginPage,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LoginPage>;

export const Layout: Story = {};

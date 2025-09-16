import type { Meta, StoryObj } from '@storybook/react';
import { Login } from './Login';

const meta: Meta<typeof Login> = {
  title: 'Choreo Views/Login',
  component: Login,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Login>;

export const Default: Story = {
  args: {
    children: 'Login Content',
  },
  render: () => {
    return <Login />;
  },
};

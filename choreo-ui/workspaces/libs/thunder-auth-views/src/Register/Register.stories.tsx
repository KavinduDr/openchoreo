import type { Meta, StoryObj } from '@storybook/react';
import { Register } from './Register';

const meta: Meta<typeof Register> = {
  title: 'Choreo Views/Register',
  component: Register,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Register>;

export const Default: Story = {
  args: {
    children: 'Register Content',
  },
  render: () => {
    return <Register />;
  },
};

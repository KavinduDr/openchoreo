import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Choreo DS/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {},
};

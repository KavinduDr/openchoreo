import type { Meta, StoryObj } from '@storybook/react';
import { AvatarOxygen } from './AvatarOxygen';

const meta: Meta<typeof AvatarOxygen> = {
  title: 'Choreo DS/OxygenUI/AvatarOxygen',
  component: AvatarOxygen,
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarOxygen>;

export const Default: Story = {
  args: {
    children: 'A',
  },
};

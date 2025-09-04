import type { Meta, StoryObj } from '@storybook/react';
import { BoxOxygen } from './BoxOxygen';

const meta: Meta<typeof BoxOxygen> = {
  title: 'Choreo DS/OxygenUI/BoxOxygen',
  component: BoxOxygen,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BoxOxygen>;

export const Default: Story = {
  args: {
    children: 'BoxOxygen Content',
  },
};

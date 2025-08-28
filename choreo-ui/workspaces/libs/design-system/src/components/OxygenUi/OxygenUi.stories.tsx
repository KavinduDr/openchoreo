import type { Meta, StoryObj } from '@storybook/react';
import { OxygenUi } from './OxygenUi';

const meta: Meta<typeof OxygenUi> = {
  title: 'Choreo DS/OxygenUi',
  component: OxygenUi,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the element',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof OxygenUi>;

export const Button: Story = {
  args: {
    children: 'OxygenUi Content',
  },
  render: (args) => {
    return (
      <OxygenUi {...args} />
    )
  }
};

export const Disabled: Story = {
  args: {
    children: 'Disabled OxygenUi',
    disabled: true,
  },
};

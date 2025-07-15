import type { Meta, StoryObj } from '@storybook/react';
import { FullPageLoader } from './FullPageLoader';

const meta: Meta<typeof FullPageLoader> = {
  title: 'Choreo Views/FullPageLoader',
  component: FullPageLoader,
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
type Story = StoryObj<typeof FullPageLoader>;

export const Default: Story = {
  args: {
    children: 'FullPageLoader Content',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled FullPageLoader',
    disabled: true,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';
import { Box } from '@mui/material';
import Organization from '@design-system/Icons/generated/Organization';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
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
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Size of the chip',
      table: {
        type: { summary: 'small | medium | large' },
        defaultValue: { summary: 'medium' },
      },
    },
    variant: {
      control: 'radio',
      options: ['filled', 'outlined'],
      description: 'Variant of the chip',
      table: {
        type: { summary: 'filled | outlined' },
        defaultValue: { summary: 'filled' },
      },
    },
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'error',
        'warning',
        'info',
        'success',
      ],
      description: 'Color of the chip',
      table: {
        type: {
          summary:
            'default | primary | secondary | error | warning | info | success',
        },
        defaultValue: { summary: 'default' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    label: 'Default Chip',
    testId: 'default-chip',
    size: 'medium',
    variant: 'filled',
    color: 'default',
  },
  render: (args) => {
    return (
      <Box>
        <Chip {...args} label="Color Label" testId="default" />
      </Box>
    );
  },
};

export const ChipIcon: Story = {
  render: (args) => {
    return (
      <Box>
        <Chip
          icon={<Organization color="inherit" fontSize="inherit" />}
          {...args}
          label="Color Label"
          testId="icon"
        />
      </Box>
    );
  },
};

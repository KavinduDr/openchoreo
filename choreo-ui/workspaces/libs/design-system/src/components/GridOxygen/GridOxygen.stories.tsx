import type { Meta, StoryObj } from '@storybook/react';
import { GridOxygen } from './GridOxygen';
import { Box, Paper } from '@oxygen-ui/react';

const meta: Meta<typeof GridOxygen> = {
  title: 'Choreo DS/OxygenUI/GridOxygen',
  component: GridOxygen,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof GridOxygen>;

export const Default: Story = {
  args: {
    children: 'GridOxygen Content',
  },
  render: (args) => {
    return (
      <Box>
        <Paper
          sx={{
            padding: 1,
            textAlign: 'center',
          }}
        >
          xs = 8
        </Paper>
      </Box>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';
import { QuestionMark } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { Card, CardContent } from '../Card';
import Question from '@design-system/Icons/generated/Question';
import Info from '@design-system/Icons/generated/Info';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'],
      description: 'Tooltip placement',
    },
    arrow: {
      control: 'boolean',
      description: 'Show arrow on tooltip',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the tooltip',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    title: 'This is a tooltip',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="contained" color="primary">
        Hover me
      </Button>
    </Tooltip>
  ),
};

export const WithIcon: Story = {
  args: {
    title: 'This is a tooltip with an icon',
  },
  render: (args) => {
    return (
      <Tooltip {...args}>
        <QuestionMark />
      </Tooltip>
    );
  },
};

export const WithArrow: Story = {
  args: {
    title: 'This is a tooltip with an arrow',
    arrow: true,
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outlined" color="primary">
        Hover me (with arrow)
      </Button>
    </Tooltip>
  ),
};

export const DifferentPlacements: Story = {
  render: () => {
    return (
      <Card testId="tooltip">
        <CardContent>
          <Box mb={3}>
            <Tooltip title="This is a create Button" placement="top">
              <Button testId="tooltip-action-1-button">Top Tooltip</Button>
            </Tooltip>
          </Box>
          <Box mb={3}>
            <Tooltip title="This is an info icon" placement="bottom">
              <Question />
            </Tooltip>
          </Box>
          <Box mb={3}>
            <Tooltip
              title="Create programs that trigger via events. E.g., Business automation tasks."
              placement="left"
            >
              <Info />
            </Tooltip>
          </Box>
          <Box mb={3}>
            <Tooltip
              title="This tooltip is disabled"
              disabled={true}
            >
              <Button testId="tooltip-action-3-button">Disabled Tooltip</Button>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
    );
  },
};

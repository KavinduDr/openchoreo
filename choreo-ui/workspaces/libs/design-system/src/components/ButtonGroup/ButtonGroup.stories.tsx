import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';
import { Card, CardContent } from '../Card';
import { Box, Typography } from '@mui/material';
import { Button, IconButton } from '../index copy';
import Add from '@design-system/Icons/generated/Add';
import Minus from '@design-system/Icons/generated/Minus';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Choreo DS/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'radio',
        options: ['outlined', 'contained'],
      },
    },
    color: {
      control: {
        type: 'select',
        options: ['primary', 'secondary'],
      },
    },
    size: {
      control: {
        type: 'radio',
        options: ['tiny', 'small', 'medium'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  args: {
    color: 'primary',
    variant: 'outlined',
  },
  render: (args) => {
    return (
      <Card testId="button">
        <CardContent>
          <Box mb={3}>
            <Box mb={1}>
              <Typography>Button Group</Typography>
            </Box>
            <Box display="flex" columnGap="1rem" alignItems="center">
              <ButtonGroup {...args} testId="story">
                <Button
                  disabled={args.disabled}
                  variant={args.variant}
                  testId="btn-contained"
                >
                  Button
                </Button>
                <Button
                  startIcon={<Add />}
                  variant={args.variant}
                  disabled={args.disabled}
                  testId="btn-contained"
                >
                  Button
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
          <Box mb={3}>
            <Box mb={1}>
              <Typography>Icon Button Group</Typography>
            </Box>
            <Box display="flex" columnGap="1rem" alignItems="center">
              <ButtonGroup {...args} testId="story-icon">
                <IconButton
                  variant={args.variant}
                  disabled={args.disabled}
                  testId="story-default"
                  disableRipple={true}
                  className="btn-group-icon-button"
                >
                  <Add />
                </IconButton>
                <IconButton
                  variant={args.variant}
                  disabled={args.disabled}
                  testId="story-rounded"
                  disableRipple={true}
                  className="btn-group-icon-button"
                >
                  <Minus />
                </IconButton>
              </ButtonGroup>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  },
};

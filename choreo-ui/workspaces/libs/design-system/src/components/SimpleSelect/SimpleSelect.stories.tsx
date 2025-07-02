import type { Meta, StoryObj } from '@storybook/react';
import { SimpleSelect } from './SimpleSelect';
import React from 'react';
import { Card, CardContent } from '../Card';
import { Box, Typography } from '@mui/material';
import { SelectMenuItem } from './SelectMenuItem/SelectMenuItem';
import { SelectMenuSubHeader } from './SelectMenuSubHeader/SelectMenuSubHeader';

const meta: Meta<typeof SimpleSelect> = {
  title: 'Components/SimpleSelect',
  component: SimpleSelect,
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
      control: 'select',
      options: ['small', 'medium'],
      description: 'Size of the select component',
      table: {
        type: { summary: 'small | medium' },
        defaultValue: { summary: 'medium' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
    },
  },
};

const testId = 'simple-select';

export default meta;
type Story = StoryObj<typeof SimpleSelect>;

export const Default: Story = {
  args: {
    children: 'SimpleSelect Content',
    size: 'small',
    disabled: false,
  },
  render: function SimpleSelectDefault(_args) {
    const [age, setAge] = React.useState('20');

    const handleChange = (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | (Event & { target: { value: unknown; name: string } })
    ) => {
      setAge(event.target.value as string);
    };
    return (
      <Card testId={testId}>
        <CardContent>
          <Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Size - Medium
              </Typography>
            </Box>
            <Box mb={3}>
              <SimpleSelect
                testId={`${testId}-story`}
                value={age}
                onChange={handleChange}
              >
                <SelectMenuItem testId="story-medium-ten" value={10}>
                  Ten thousand only
                </SelectMenuItem>
                <SelectMenuItem testId="story-medium-twenty" value={20}>
                  Twenty five thousand only
                </SelectMenuItem>
                <SelectMenuItem testId="story-medium-thirty" value={30}>
                  Thirty thousand only
                </SelectMenuItem>
              </SimpleSelect>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Size - Small
              </Typography>
            </Box>
            <Box mb={3}>
              <SimpleSelect
                testId={`${testId}-story`}
                value={age}
                onChange={handleChange}
                size="small"
              >
                <SelectMenuItem testId="story-small-ten" value={10}>
                  Ten thousand only
                </SelectMenuItem>
                <SelectMenuItem testId="story-small-twenty" value={20}>
                  Twenty five thousand only
                </SelectMenuItem>
                <SelectMenuItem testId="story-small-thirty" value={30}>
                  Thirty thousand only
                </SelectMenuItem>
              </SimpleSelect>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                With Description
              </Typography>
            </Box>
            <Box mb={3}>
              <SimpleSelect
                testId={`${testId}-story`}
                value={age}
                onChange={handleChange}
              >
                <SelectMenuItem testId="story-medium-ten" value={10}>
                  Ten thousand only
                </SelectMenuItem>
                <SelectMenuItem
                  testId="story-medium-twenty"
                  value={20}
                  description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                >
                  Twenty five thousand only
                </SelectMenuItem>
                <SelectMenuItem testId="story-medium-thirty" value={30}>
                  Thirty thousand only
                </SelectMenuItem>
              </SimpleSelect>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Others
              </Typography>
            </Box>
            <Box mb={3} maxWidth={230}>
              <SimpleSelect
                testId={`${testId}-story`}
                value={age}
                onChange={handleChange}
              >
                <SelectMenuItem
                  testId="story-max-ten"
                  value={10}
                  description="This is the first item description"
                >
                  Ten thousand only
                </SelectMenuItem>
                <SelectMenuItem testId="story-max-twenty" value={20}>
                  Twenty five thousand only
                </SelectMenuItem>
                <SelectMenuItem testId="story-max-thirty" value={30}>
                  Thirty thousand only
                </SelectMenuItem>
              </SimpleSelect>
            </Box>
            <Box mb={3}>
              <SimpleSelect
                testId={`${testId}-story`}
                value={age}
                onChange={handleChange}
                error
                helperText="This is an error"
              >
                <SelectMenuItem testId="story-error-ten" value={10}>
                  Ten thousand only
                </SelectMenuItem>
                <SelectMenuItem testId="story-error-twenty" value={20}>
                  Twenty five thousand only
                </SelectMenuItem>
                <SelectMenuItem testId="story-error-thirty" value={30}>
                  Thirty thousand only
                </SelectMenuItem>
              </SimpleSelect>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Grouping
              </Typography>
            </Box>
            <Box mb={3}>
              <SimpleSelect
                testId={`${testId}-story`}
                value={age}
                onChange={handleChange}
              >
                <SelectMenuItem testId="story-medium-ten" value={10}>
                  Ten thousand only
                </SelectMenuItem>
                <SelectMenuSubHeader testId="story-sub-header">
                  Category 1
                </SelectMenuSubHeader>
                <SelectMenuItem testId="story-medium-twenty" value={20}>
                  Twenty five thousand only
                </SelectMenuItem>
                <SelectMenuItem testId="story-medium-thirty" value={30}>
                  Thirty thousand only
                </SelectMenuItem>
              </SimpleSelect>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Loading State
              </Typography>
            </Box>
            <Box mb={3}>
              <SimpleSelect
                testId={`${testId}-story`}
                value={null}
                onChange={handleChange}
                isLoading
              >
                <SelectMenuItem testId="story-medium-ten" value={10}>
                  Ten thousand only
                </SelectMenuItem>
              </SimpleSelect>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  },
};

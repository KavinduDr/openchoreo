import type { Meta, StoryObj } from '@storybook/react';
import { InlineEditor } from './InlineEditor';
import { useState } from 'react';
import { Card, CardContent } from '../Card';
import { Box, Typography } from '@mui/material';

const meta: Meta<typeof InlineEditor> = {
  title: 'Choreo DS/InlineEditor',
  component: InlineEditor,
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InlineEditor>;

const testId = 'inline-editor';

export const Default: Story = {
  args: {},
  render: function Default(_args) {
    const [value, setValue] = useState('3000');

    const handleSave = (newValue: string) => {
      setValue(newValue);
    };

    const handleEdit = () => {
      // You can add any other action here.
    };

    return (
      <Card testId={testId}>
        <CardContent>
          <Box>
            <Box mb={1}>
              <Typography>Inline Editor - Small Sizes</Typography>
            </Box>
            <Box mb={3}>
              <InlineEditor
                value={value}
                onSave={handleSave}
                onEdit={handleEdit}
                testId={`${testId}-small`}
                size="small"
                buttonAlign="right"
              />
            </Box>
            <Box mb={1}>
              <Typography>Inline Editor - Medium Sizes</Typography>
            </Box>
            <Box mb={3}>
              <InlineEditor
                value={value}
                onSave={handleSave}
                onEdit={handleEdit}
                testId={`${testId}-medium`}
                size="medium"
                buttonAlign="right"
              />
            </Box>
            <Box mb={1}>
              <Typography>Inline Editor - Action Button Right</Typography>
            </Box>
            <Box mb={3}>
              <InlineEditor
                value={value}
                onSave={handleSave}
                onEdit={handleEdit}
                testId={`${testId}-action-right`}
                size="small"
                buttonAlign="right"
              />
            </Box>
            <Box mb={1}>
              <Typography>Inline Editor - Action Button Bottom</Typography>
            </Box>
            <Box mb={3}>
              <InlineEditor
                value={value}
                onSave={handleSave}
                onEdit={handleEdit}
                testId={`${testId}-action-bottom`}
                size="medium"
                buttonAlign="bottom"
              />
            </Box>
            <Box mb={3}>
              <Box mb={1}>
                <Typography>Inline Editor (Disabled)</Typography>
              </Box>
              <InlineEditor
                value={value}
                onSave={handleSave}
                testId={`${testId}-disabled`}
                size="medium"
                buttonAlign="bottom"
                disabled
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  },
};

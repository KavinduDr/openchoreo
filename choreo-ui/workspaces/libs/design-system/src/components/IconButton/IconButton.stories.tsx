import { Add } from '@mui/icons-material';
import { IconButton } from './IconButton';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent } from '../Card';
import { Box, Typography } from '@mui/material';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the component',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

const testId = 'story';

export const Primary: Story = {
  render: (args) => {
    return (
      <Card testId="icon-button">
        <CardContent>
          <Box mb={3}>
            <Box mb={1}>
              <Typography>Contained</Typography>
            </Box>
            <Box display="flex" gap={8} alignItems="center">
              <IconButton {...args} testId={`${testId}-default`}>
                <Add />
              </IconButton>
              <IconButton {...args} rounded testId={`${testId}-rounded`}>
                <Add />
              </IconButton>
              <IconButton {...args} disabled testId={`${testId}-disabled`}>
                <Add />
              </IconButton>
              <IconButton {...args} size="small" testId={`${testId}-small`}>
                <Add />
              </IconButton>
              <IconButton
                {...args}
                rounded
                size="small"
                testId={`${testId}-rounded-small`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                size="small"
                disabled
                testId={`${testId}-small-disabled`}
              >
                <Add />
              </IconButton>
              <IconButton {...args} size="tiny" testId={`${testId}-tiny`}>
                <Add />
              </IconButton>
              <IconButton
                {...args}
                rounded
                size="tiny"
                testId={`${testId}-rounded-tiny`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                size="tiny"
                disabled
                testId={`${testId}-tiny-disabled`}
              >
                <Add />
              </IconButton>
            </Box>
          </Box>
          <Box mb={3}>
            <Box mb={1}>
              <Typography>Outlined</Typography>
            </Box>
            <Box display="flex" gap={8} alignItems="center">
              <IconButton
                {...args}
                variant="outlined"
                testId={`${testId}-outlined`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                rounded
                variant="outlined"
                testId={`${testId}-outlined-rounded`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                disabled
                variant="outlined"
                testId={`${testId}-outlined-disabled`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                size="small"
                variant="outlined"
                testId={`${testId}-outlined-small`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                rounded
                size="small"
                variant="outlined"
                testId={`${testId}-outlined-small-rounded`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                size="small"
                disabled
                variant="outlined"
                testId={`${testId}-outlined-small-disabled`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                size="tiny"
                variant="outlined"
                testId={`${testId}-outlined-tiny`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                rounded
                size="tiny"
                variant="outlined"
                testId={`${testId}-outlined-tiny-rounded`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                size="tiny"
                disabled
                variant="outlined"
                testId={`${testId}-outlined-tiny-disabled`}
              >
                <Add />
              </IconButton>
            </Box>
          </Box>
          <Box mb={3}>
            <Box mb={1}>
              <Typography>Text</Typography>
            </Box>
            <Box display="flex" gap={8} alignItems="center">
              <IconButton {...args} variant="text" testId={`${testId}-text`}>
                <Add />
              </IconButton>
              <IconButton
                {...args}
                rounded
                variant="text"
                testId={`${testId}-text-rounded`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                disabled
                variant="text"
                testId={`${testId}-text-disabled`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                size="small"
                variant="text"
                testId={`${testId}-text-small`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                rounded
                size="small"
                variant="text"
                testId={`${testId}-text-small-rounded`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                size="small"
                disabled
                variant="text"
                testId={`${testId}-text-small-disabled`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                size="tiny"
                variant="text"
                testId={`${testId}-text-tiny`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                rounded
                size="tiny"
                variant="text"
                testId={`${testId}-text-tiny-rounded`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                size="tiny"
                disabled
                variant="text"
                testId={`${testId}-text-tiny-disabled`}
              >
                <Add />
              </IconButton>
            </Box>
          </Box>
          <Box mb={3}>
            <Box mb={1}>
              <Typography>Subtle</Typography>
            </Box>
            <Box display="flex" gap={8} alignItems="center">
              <IconButton
                {...args}
                variant="subtle"
                testId={`${testId}-subtle`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                rounded
                variant="subtle"
                testId={`${testId}-subtle-rounded`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                disabled
                variant="subtle"
                testId={`${testId}-subtle-disabled`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                size="small"
                variant="subtle"
                testId={`${testId}-subtle-small`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                rounded
                size="small"
                variant="subtle"
                testId={`${testId}-subtle-small-rounded`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                size="small"
                disabled
                variant="subtle"
                testId={`${testId}-subtle-small-disabled`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                size="tiny"
                variant="subtle"
                testId={`${testId}-subtle-tiny`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                rounded
                size="tiny"
                variant="subtle"
                testId={`${testId}-subtle-tiny-rounded`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                size="tiny"
                disabled
                variant="subtle"
                testId={`${testId}-subtle-tiny-disabled`}
              >
                <Add />
              </IconButton>
            </Box>
          </Box>
          <Box mb={3}>
            <Box mb={1}>
              <Typography>Link</Typography>
            </Box>
            <Box display="flex" gap={8} alignItems="center">
              <IconButton {...args} variant="link" testId={`${testId}-link`}>
                <Add />
              </IconButton>
              <IconButton
                {...args}
                rounded
                variant="link"
                testId={`${testId}-link-rounded`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                disabled
                variant="link"
                testId={`${testId}-link-disabled`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                size="small"
                variant="link"
                testId={`${testId}-link-small`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                rounded
                size="small"
                variant="link"
                testId={`${testId}-link-rounded-small`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                size="small"
                disabled
                variant="link"
                testId={`${testId}-link-small-disabled`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                size="tiny"
                variant="link"
                testId={`${testId}-link-tiny`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                rounded
                size="tiny"
                variant="link"
                testId={`${testId}-link-tiny-rounded`}
              >
                <Add />
              </IconButton>
              <IconButton
                {...args}
                size="tiny"
                disabled
                variant="link"
                testId={`${testId}-link-tiny-disabled`}
              >
                <Add />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  },
};

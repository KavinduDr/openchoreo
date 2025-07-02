import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Card, CardContent } from '../Card';
import { Box, Typography } from '@mui/material';
import Add from '@design-system/Icons/generated/Add';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'outlined', 'contained', 'subtle', 'link'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
    },
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    return (
      <Card testId="button">
        <CardContent>
          <Box mb={3}>
            <Box mb={1}>
              <Typography>Contained</Typography>
            </Box>
            <Box display="flex" gap="1rem" alignItems="center">
              <Box>
                <Button variant="contained" testId="btn-contained" {...args}>
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  startIcon={<Add />}
                  variant="contained"
                  testId="btn-contained"
                  {...args}
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  testId="btn-contained"
                  {...args}
                  // component={RouterLink}
                  to="/"
                >
                  Link
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  testId="btn-contained-1"
                  {...args}
                  pill
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  testId="btn-contained"
                  {...args}
                  disabled
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  testId="btn-contained"
                  {...args}
                  size="small"
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  testId="btn-contained"
                  {...args}
                  size="small"
                  pill
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  testId="btn-contained"
                  {...args}
                  size="small"
                  disabled
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  testId="btn-contained"
                  {...args}
                  size="tiny"
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  testId="btn-contained"
                  {...args}
                  size="tiny"
                  disabled
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  testId="btn-contained"
                  {...args}
                  size="tiny"
                  pill
                >
                  Button
                </Button>
              </Box>
            </Box>
          </Box>
          <Box mb={3}>
            <Box mb={1}>
              <Typography>Outlined</Typography>
            </Box>
            <Box display="flex" gap="1rem" alignItems="center">
              <Box>
                <Button variant="outlined" testId="btn-outlined" {...args}>
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  startIcon={<Add />}
                  variant="outlined"
                  testId="btn-outlined"
                  {...args}
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  testId="btn-outlined"
                  {...args}
                  // component={RouterLink}
                  to="/"
                >
                  Link
                </Button>
              </Box>
              <Box>
                <Button variant="outlined" testId="btn-outlined" {...args} pill>
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  testId="btn-outlined"
                  {...args}
                  disabled
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  testId="btn-outlined"
                  {...args}
                  size="small"
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  testId="btn-outlined"
                  {...args}
                  size="small"
                  pill
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  testId="btn-outlined"
                  {...args}
                  size="small"
                  disabled
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  testId="btn-outlined"
                  {...args}
                  size="tiny"
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  testId="btn-outlined"
                  {...args}
                  size="tiny"
                  disabled
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  testId="btn-outlined"
                  {...args}
                  size="tiny"
                  pill
                >
                  Button
                </Button>
              </Box>
            </Box>
          </Box>
          <Box mb={3}>
            <Box mb={1}>
              <Typography>Text</Typography>
            </Box>
            <Box display="flex" gap="1rem" alignItems="center">
              <Box>
                <Button variant="text" testId="btn-text" {...args}>
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  startIcon={<Add />}
                  variant="text"
                  testId="btn-text"
                  {...args}
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="text"
                  testId="btn-text"
                  {...args}
                  // component={RouterLink}
                  to="/"
                >
                  Link
                </Button>
              </Box>
              <Box>
                <Button variant="text" testId="btn-text" {...args} pill>
                  Button
                </Button>
              </Box>
              <Box>
                <Button variant="text" testId="btn-text" {...args} disabled>
                  Button
                </Button>
              </Box>
              <Box>
                <Button variant="text" testId="btn-text" {...args} size="small">
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="text"
                  testId="btn-text"
                  {...args}
                  size="small"
                  pill
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="text"
                  testId="btn-text"
                  {...args}
                  size="small"
                  disabled
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button variant="text" testId="btn-text" {...args} size="tiny">
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="text"
                  testId="btn-text"
                  {...args}
                  size="tiny"
                  disabled
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="text"
                  testId="btn-text"
                  {...args}
                  size="tiny"
                  pill
                >
                  Button
                </Button>
              </Box>
            </Box>
          </Box>
          <Box mb={3}>
            <Box mb={1}>
              <Typography>Subtle</Typography>
            </Box>
            <Box display="flex" gap="1rem" alignItems="center">
              <Box>
                <Button variant="subtle" testId="btn-subtle" {...args}>
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  startIcon={<Add />}
                  variant="subtle"
                  testId="btn-subtle"
                  {...args}
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="subtle"
                  testId="btn-subtle"
                  {...args}
                  // component={RouterLink}
                  to="/"
                >
                  Link
                </Button>
              </Box>
              <Box>
                <Button variant="subtle" testId="btn-subtle" {...args} pill>
                  Button
                </Button>
              </Box>
              <Box>
                <Button variant="subtle" testId="btn-subtle" {...args} disabled>
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="subtle"
                  testId="btn-subtle"
                  {...args}
                  size="small"
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="subtle"
                  testId="btn-subtle"
                  {...args}
                  size="small"
                  pill
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="subtle"
                  testId="btn-subtle"
                  {...args}
                  size="small"
                  disabled
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="subtle"
                  testId="btn-subtle"
                  {...args}
                  size="tiny"
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="subtle"
                  testId="btn-subtle"
                  {...args}
                  size="tiny"
                  disabled
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="subtle"
                  testId="btn-subtle"
                  {...args}
                  size="tiny"
                  pill
                >
                  Button
                </Button>
              </Box>
            </Box>
          </Box>
          <Box mb={3}>
            <Box mb={1}>
              <Typography>Link Button</Typography>
            </Box>
            <Box display="flex" gap="1rem" alignItems="center">
              <Box>
                <Button
                  variant="link"
                  testId="btn-link"
                  {...args}
                  startIcon={<Add />}
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button variant="link" testId="btn-link" {...args}>
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="link"
                  testId="btn-link"
                  {...args}
                  // component={RouterLink}
                  to="/"
                >
                  Link
                </Button>
              </Box>
              <Box>
                <Button variant="link" testId="btn-link" {...args} pill>
                  Button
                </Button>
              </Box>
              <Box>
                <Button variant="link" testId="btn-link" {...args} disabled>
                  Button
                </Button>
              </Box>
              <Box>
                <Button variant="link" testId="btn-link" {...args} size="small">
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="link"
                  testId="btn-link"
                  {...args}
                  size="small"
                  pill
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="link"
                  testId="btn-link"
                  {...args}
                  size="small"
                  disabled
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button variant="link" testId="btn-link" {...args} size="tiny">
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="link"
                  testId="btn-link"
                  {...args}
                  size="tiny"
                  disabled
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="link"
                  testId="btn-link"
                  {...args}
                  size="tiny"
                  pill
                >
                  Button
                </Button>
              </Box>
              <Box>
                <Button
                  variant="link"
                  testId="btn-link"
                  {...args}
                  endIcon={<Add />}
                >
                  Button
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  },
};

export const TemplateSizes: Story = {
  render: (_args) => {
    return (
      <Card testId="button-sizes">
        <CardContent>
          <Box>
            <Box mb={2}>
              <Button
                variant="contained"
                size="tiny"
                testId="btn-link"
                startIcon={<Add />}
              >
                Button
              </Button>
            </Box>
            <Box mb={2}>
              <Button
                variant="contained"
                size="tiny"
                testId="btn-link"
                endIcon={<Add />}
              >
                Button
              </Button>
            </Box>
            <Box mb={2}>
              <Button
                variant="contained"
                size="small"
                testId="btn-link"
                startIcon={<Add />}
              >
                Button
              </Button>
            </Box>
            <Box mb={2}>
              <Button
                variant="contained"
                size="small"
                testId="btn-link"
                endIcon={<Add />}
              >
                Button
              </Button>
            </Box>
            <Box mb={2}>
              <Button
                variant="contained"
                size="medium"
                testId="btn-link"
                startIcon={<Add />}
              >
                Button
              </Button>
            </Box>
            <Box mb={2}>
              <Button
                variant="contained"
                size="medium"
                testId="btn-link"
                endIcon={<Add />}
              >
                Button
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  },
};

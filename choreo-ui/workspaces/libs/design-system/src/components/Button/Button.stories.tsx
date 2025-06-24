import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent } from '../Card';
import { Box, Typography } from '@mui/material';
import { Button } from './Button';
import Add from '@design-system/Icons/generated/Add';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
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
  args: {
    children: 'Primary Button',
    variant: 'contained',
    color: 'primary',
  },
};

export const Default: Story = {
  args: {
    children: 'Default Button',
    variant: 'contained',
    color: 'primary',
    size: 'medium',
  },
  render: (args) => (
    <Card testId="button">
      <CardContent>
        <Box mb={3}>
          <Box mb={1}>
            <Typography>Contained</Typography>
          </Box>
          <Box display="flex" gap="1rem" alignItems="center">
            <Box>
              <Button variant="contained" testId="btn-contained" {...args}>
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button
                startIcon={<Add />}
                variant="contained"
                testId="btn-contained"
                {...args}
              >
                {args.children}
              </Button>
            </Box>
            {/* <Box>
            <Button
              variant="contained"
              testId="btn-contained"
              {...args}
              component={RouterLink}
              to="/"
            >
              Link
            </Button>
          </Box> */}
            <Box>
              <Button
                variant="contained"
                testId="btn-contained-1"
                {...args}
                pill
              >
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                testId="btn-contained"
                {...args}
                disabled
              >
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                testId="btn-contained"
                {...args}
                size="small"
              >
                {args.children}
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
                {args.children}
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
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                testId="btn-contained"
                {...args}
                size="tiny"
              >
                {args.children}
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
                {args.children}
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
                {args.children}
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
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button
                startIcon={<Add />}
                variant="outlined"
                testId="btn-outlined"
                {...args}
              >
                {args.children}
              </Button>
            </Box>
            <Box>
              {/* <Button
              variant="outlined"
              testId="btn-outlined"
              {...args}
              component={RouterLink}
              to="/"
            >
              Link
            </Button> */}
            </Box>
            <Box>
              <Button variant="outlined" testId="btn-outlined" {...args} pill>
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button
                variant="outlined"
                testId="btn-outlined"
                {...args}
                disabled
              >
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button
                variant="outlined"
                testId="btn-outlined"
                {...args}
                size="small"
              >
                {args.children}
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
                {args.children}
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
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button
                variant="outlined"
                testId="btn-outlined"
                {...args}
                size="tiny"
              >
                {args.children}
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
                {args.children}
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
                {args.children}
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
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button
                startIcon={<Add />}
                variant="text"
                testId="btn-text"
                {...args}
              >
                {args.children}
              </Button>
            </Box>
            <Box>
              {/* <Button
              variant="text"
              testId="btn-text"
              {...args}
              component={RouterLink}
              to="/"
            >
              Link
            </Button> */}
            </Box>
            <Box>
              <Button variant="text" testId="btn-text" {...args} pill>
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button variant="text" testId="btn-text" {...args} disabled>
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button variant="text" testId="btn-text" {...args} size="small">
                {args.children}
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
                {args.children}
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
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button variant="text" testId="btn-text" {...args} size="tiny">
                {args.children}
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
                {args.children}
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
                {args.children}
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
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button
                startIcon={<Add />}
                variant="subtle"
                testId="btn-subtle"
                {...args}
              >
                {args.children}
              </Button>
            </Box>
            <Box>
              {/* <Button
              variant="subtle"
              testId="btn-subtle"
              {...args}
              component={RouterLink}
              to="/"
            >
              Link
            </Button> */}
            </Box>
            <Box>
              <Button variant="subtle" testId="btn-subtle" {...args} pill>
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button variant="subtle" testId="btn-subtle" {...args} disabled>
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button
                variant="subtle"
                testId="btn-subtle"
                {...args}
                size="small"
              >
                {args.children}
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
                {args.children}
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
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button
                variant="subtle"
                testId="btn-subtle"
                {...args}
                size="tiny"
              >
                {args.children}
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
                {args.children}
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
                {args.children}
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
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button variant="link" testId="btn-link" {...args}>
                {args.children}
              </Button>
            </Box>
            <Box>
              {/* <Button
              variant="link"
              testId="btn-link"
              {...args}
              component={<RouterLink />}
              to="/"
            >
              Link
            </Button> */}
            </Box>
            <Box>
              <Button variant="link" testId="btn-link" {...args} pill>
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button variant="link" testId="btn-link" {...args} disabled>
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button variant="link" testId="btn-link" {...args} size="small">
                {args.children}
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
                {args.children}
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
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button variant="link" testId="btn-link" {...args} size="tiny">
                {args.children}
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
                {args.children}
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
                {args.children}
              </Button>
            </Box>
            <Box>
              <Button
                variant="link"
                testId="btn-link"
                {...args}
                endIcon={<Add />}
              >
                {args.children}
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  ),
};

import { Avatar } from './Avatar';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent } from '../Card';
import { Box, Typography } from '@mui/material';
import LoudSpeaker from '@design-system/Icons/generated/LoudSpeaker';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the component',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'extraLarge'],
      description: 'Sets the size of the avatar',
    },
    variant: {
      control: 'select',
      options: ['circular', 'rounded'],
      description: 'Sets the shape of the avatar',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    children: 'A',
  },
};

export const AvatarLetters: Story = {
  render: () => {
    return (
      <Card testId="avatar-story">
        <CardContent>
          <Box mb={3}>
            <Typography variant="h6">Small</Typography>
            <Avatar size="small" testId="small">
              H
            </Avatar>
          </Box>
          <Box mb={3}>
            <Typography variant="h6">Medium</Typography>
            <Avatar size="medium" testId="medium">
              H
            </Avatar>
          </Box>
          <Box mb={3}>
            <Typography variant="h6">Large</Typography>
            <Avatar size="large" testId="large">
              H
            </Avatar>
          </Box>
          <Box mb={3}>
            <Typography variant="h6">Extra Large</Typography>
            <Avatar size="extraLarge" testId="extraLarge">
              H
            </Avatar>
          </Box>
        </CardContent>
      </Card>
    );
  },
};

export const AvatarImages: Story = {
  render: () => {
    return (
      <Card testId="avatar-story">
        <CardContent>
          <Box mb={3}>
            <Typography variant="h6">Small</Typography>
            <Avatar
              size="small"
              testId="small"
              alt="Remy Sharp"
              color="default"
            >
              <img
                src="./images/storybook-assets/user-avatar.jpg"
                alt="Avatar"
              />
            </Avatar>
          </Box>
          <Box mb={3}>
            <Typography variant="h6">Medium</Typography>
            <Avatar
              size="medium"
              testId="medium"
              alt="Remy Sharp"
              color="default"
            >
              <img
                src="./images/storybook-assets/user-avatar.jpg"
                alt="Avatar"
              />
            </Avatar>
          </Box>
          <Box mb={3}>
            <Typography variant="h6">Large</Typography>
            <Avatar
              size="large"
              testId="large"
              alt="Remy Sharp"
              color="default"
            >
              <img
                src="./images/storybook-assets/user-avatar.jpg"
                alt="Avatar"
              />
            </Avatar>
          </Box>
          <Box mb={3}>
            <Typography variant="h6">Extra Large</Typography>
            <Avatar
              size="extraLarge"
              testId="extraLarge"
              alt="Remy Sharp"
              color="default"
            >
              <img
                src="./images/storybook-assets/user-avatar.jpg"
                alt="Avatar"
              />
            </Avatar>
          </Box>
        </CardContent>
      </Card>
    );
  },
};

export const AvatarIcons: Story = {
  render: () => {
    return (
      <Card testId="avatar-story">
        <CardContent>
          <Box mb={3}>
            <Typography variant="h6">Small</Typography>
            <Avatar size="small" testId="small" color="secondary">
              <LoudSpeaker />
            </Avatar>
          </Box>
          <Box mb={3}>
            <Typography variant="h6">Medium</Typography>
            <Avatar size="medium" testId="medium" color="secondary">
              <LoudSpeaker />
            </Avatar>
          </Box>
          <Box mb={3}>
            <Typography variant="h6">Large</Typography>
            <Avatar size="large" testId="large" color="secondary">
              <LoudSpeaker />
            </Avatar>
          </Box>
          <Box mb={3}>
            <Typography variant="h6">Extra Large</Typography>
            <Avatar size="extraLarge" testId="extraLarge" color="secondary">
              <LoudSpeaker />
            </Avatar>
          </Box>
        </CardContent>
      </Card>
    );
  },
};

export const AvatarColorVariant: Story = {
  render: () => {
    return (
      <Card testId="avatar-story">
        <CardContent>
          <Box display="flex" gap={4}>
            <Box>
              <Box mb={3}>
                <Typography variant="h6">Primary</Typography>
                <Avatar size="medium" testId="medium" color="primary">
                  <LoudSpeaker />
                </Avatar>
              </Box>
              <Box mb={3}>
                <Typography variant="h6">Secondary</Typography>
                <Avatar size="medium" testId="medium" color="secondary">
                  <LoudSpeaker />
                </Avatar>
              </Box>
              <Box mb={3}>
                <Typography variant="h6">Default</Typography>
                <Avatar size="medium" testId="medium" color="default">
                  <LoudSpeaker />
                </Avatar>
              </Box>
              <Box mb={3}>
                <Typography variant="h6">Success</Typography>
                <Avatar size="medium" testId="medium" color="success">
                  <LoudSpeaker />
                </Avatar>
              </Box>
              <Box mb={3}>
                <Typography variant="h6">Warning</Typography>
                <Avatar size="medium" testId="medium" color="warning">
                  <LoudSpeaker />
                </Avatar>
              </Box>
              <Box mb={3}>
                <Typography variant="h6">Error</Typography>
                <Avatar size="medium" testId="medium" color="error">
                  <LoudSpeaker />
                </Avatar>
              </Box>
            </Box>
            <Box>
              <Box mb={3}>
                <Typography variant="h6">Primary</Typography>
                <Avatar size="medium" testId="medium" color="primary">
                  C
                </Avatar>
              </Box>
              <Box mb={3}>
                <Typography variant="h6">Secondary</Typography>
                <Avatar size="medium" testId="medium" color="secondary">
                  C
                </Avatar>
              </Box>
              <Box mb={3}>
                <Typography variant="h6">Default</Typography>
                <Avatar size="medium" testId="medium" color="default">
                  C
                </Avatar>
              </Box>
              <Box mb={3}>
                <Typography variant="h6">Success</Typography>
                <Avatar size="medium" testId="medium" color="success">
                  C
                </Avatar>
              </Box>
              <Box mb={3}>
                <Typography variant="h6">Warning</Typography>
                <Avatar size="medium" testId="medium" color="warning">
                  C
                </Avatar>
              </Box>
              <Box mb={3}>
                <Typography variant="h6">Error</Typography>
                <Avatar size="medium" testId="medium" color="error">
                  C
                </Avatar>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  },
};

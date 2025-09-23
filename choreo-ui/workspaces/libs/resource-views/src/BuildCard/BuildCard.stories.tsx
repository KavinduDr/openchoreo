import { logger } from '@open-choreo/logging';
import type { Meta, StoryObj } from '@storybook/react';
import { BuildCard } from './BuildCard';

const mockBuild = {
  name: 'Sample Build',
  uuid: 'build-123-456-789',
  componentName: 'api-service',
  projectName: 'my-project',
  orgName: 'my-organization',
  commit: 'abc123def456',
  status: 'completed' as const,
  createdAt: '2024-01-15T10:30:00Z',
};

const meta: Meta<typeof BuildCard> = {
  title: 'Choreo Views/BuildCard',
  component: BuildCard,
  argTypes: {
    build: {
      control: 'object',
      description: 'Build object containing build information',
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
    },
    isSelected: {
      control: 'boolean',
      description: 'Whether the build card is selected',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BuildCard>;

export const Default: Story = {
  args: {
    build: mockBuild,
    onClick: () => logger.log('Build card clicked'),
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    build: mockBuild,
    onClick: () => logger.log('Build card clicked'),
    isSelected: true,
  },
};

export const PendingBuild: Story = {
  args: {
    build: {
      ...mockBuild,
      name: 'Pending Build',
      status: 'pending' as const,
      uuid: 'build-pending-123',
    },
    onClick: () => logger.log('Pending build clicked'),
    isSelected: false,
  },
};

export const FailedBuild: Story = {
  args: {
    build: {
      ...mockBuild,
      name: 'Failed Build',
      status: 'failed' as const,
      uuid: 'build-failed-456',
    },
    onClick: () => logger.log('Failed build clicked'),
    isSelected: false,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { EnvCardBase } from './EnvCardBase';

const meta: Meta<typeof EnvCardBase> = {
  title: 'Choreo Views/EnvCardBase',
  component: EnvCardBase,
  argTypes: {
    envName: {
      control: 'text',
      description: 'Name of the environment',
      table: {
        type: { summary: 'string' },
      },
    },
    onRefresh: {
      action: 'refresh',
      description: 'Refresh environment handler',
    },
    onRedeploy: {
      action: 'redeploy',
      description: 'Redeploy environment handler',
    },
    onStop: {
      action: 'stop',
      description: 'Stop environment handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof EnvCardBase>;

export const Default: Story = {
  args: {
    envName: 'Production',
  },
};

export const WithActions: Story = {
  args: {
    envName: 'Development',
    onRefresh: () => console.log('Refresh clicked'),
    onRedeploy: () => console.log('Redeploy clicked'),
    onStop: () => console.log('Stop clicked'),
  },
};

export const LongEnvironmentName: Story = {
  args: {
    envName: 'Very Long Environment Name That Might Overflow',
  },
};

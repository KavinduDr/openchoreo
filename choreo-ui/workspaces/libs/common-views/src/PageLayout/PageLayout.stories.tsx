import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './PageLayout';

const meta: Meta<typeof PageLayout> = {
  title: 'Choreo Views/PageLayout',
  component: PageLayout,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PageLayout>;

export const Default: Story = {
  args: {
    children: 'PageLayout Content',
    title: 'Components',
    backButtonText: 'Back to Projects',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Environents',
    title: 'Environments',
  },
};

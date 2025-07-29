import type { Meta, StoryObj } from '@storybook/react';
import { ComponentView } from './ComponentView';

const meta: Meta<typeof ComponentView> = {
  title: 'Choreo Views/ComponentView',
  component: ComponentView,
  argTypes: {},
};

const componentViewProps = {
  name: 'ComponentView',
  description: 'ComponentView Description',
  orgName: 'OrgName',
  version: '1.0.0',
  type: 'web-app',
};

export default meta;
type Story = StoryObj<typeof ComponentView>;

export const Default: Story = {
  args: {
    ...componentViewProps,
  },
  render: (args) => <ComponentView {...args} />,
};

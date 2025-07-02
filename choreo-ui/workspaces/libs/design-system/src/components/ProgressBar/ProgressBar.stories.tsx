import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
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
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const LinearDeterminate: Story = {
  render: () => {
    return (
      <ProgressBar
        value={90}
        progressColor="primary"
        determinateColor="secondary"
        variant="determinate"
      />
    );
  },
};

export const LinearIndeterminate: Story = {
  render: () => {
    return (
      <ProgressBar
        value={90}
        progressColor="primary"
        determinateColor="secondary"
        variant="indeterminate"
      />
    );
  },
};

export const LinearDeterminateSizes: Story = {
  render: () => {
    return (
      <>
        <ProgressBar
          value={90}
          progressColor="primary"
          determinateColor="secondary"
          variant="determinate"
        />
        <ProgressBar
          value={90}
          progressColor="primary"
          determinateColor="secondary"
          variant="determinate"
          height="medium"
        />
        <ProgressBar
          value={90}
          progressColor="primary"
          determinateColor="secondary"
          variant="determinate"
          height="large"
        />
      </>
    );
  },
};

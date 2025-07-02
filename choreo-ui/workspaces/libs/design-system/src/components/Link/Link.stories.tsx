import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';
import { Card, CardContent } from '../Card';
import { Box } from '@mui/material';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
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
type Story = StoryObj<typeof Link>;

const testId = 'link';

export const Primary: Story = {
  args: {},
  render: (args) => {
    return (
      <Card testId={testId}>
        <CardContent>
          <Box height={200} width={1} display="flex" gap="1rem">
            <Link href="#" testId={`${testId}-1`} underline="hover" {...args}>
              Link
            </Link>
            <Link
              href="#"
              testId={`${testId}-2`}
              underline="hover"
              color="inherit"
              {...args}
            >
              color=inherit
            </Link>
            <Link
              href="#"
              testId={`${testId}-3`}
              underline="hover"
              variant="body2"
              {...args}
            >
              variant=body2
            </Link>
            <Link
              href="#"
              disabled
              {...args}
              testId={`${testId}-4`}
              underline="none"
            >
              Link Disable
            </Link>
          </Box>
        </CardContent>
      </Card>
    );
  },
};

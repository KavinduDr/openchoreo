import type { Meta, StoryObj } from '@storybook/react';
import { ErrorPage } from './ErrorPage';
import {
  ImageDefaultError,
  Image404NotFound,
  ImageConsoleError,
} from '@open-choreo/design-system';

const meta: Meta<typeof ErrorPage> = {
  title: 'Choreo Views/ErrorPage',
  component: ErrorPage,
  argTypes: {
    image: {
      control: 'object',
      description: 'Error page image or icon',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    title: {
      control: 'text',
      description: 'Error page title',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: 'Error page description',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorPage>;

export const Default: Story = {
  args: {
    image: <ImageDefaultError />,
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Please try again later.',
  },
};

export const NotFound: Story = {
  args: {
    image: <Image404NotFound />,
    title: 'Page not found',
    description: 'The page you are looking for does not exist.',
  },
};

export const ServerError: Story = {
  args: {
    image: <ImageConsoleError />,
    title: 'Server Error',
    description:
      'We are experiencing technical difficulties. Please try again in a few minutes.',
  },
};

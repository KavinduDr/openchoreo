import type { Preview } from '@storybook/react'
import { withTheme } from './Decorator';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        { name: 'Dark', value: '#121212' },
        { name: 'Light', value: '#ffffff' },
      ],
      default: 'Light',
    },
  },
  decorators: [withTheme],
};

export default preview;
import type { Meta, StoryObj } from '@storybook/react';
import { GridContainer, GridItem } from './Grid';

const meta: Meta<typeof GridContainer> = {
  title: 'Choreo DS/Grid',
  component: GridContainer,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Grid content',
    },
    className: {
      control: 'text',
      description: 'CSS class name',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GridContainer>;

export const Default: Story = {
  args: {
    children: (
      <>
        <GridItem size={{ xs: 4, sm: 6, md: 8, lg: 10, xl: 12 }}>
          <div style={{ padding: '16px', backgroundColor: '#f0f0f0', margin: '4px' }}>
            Grid Item 1
          </div>
        </GridItem>
        <GridItem size={{ xs: 4, sm: 6, md: 8, lg: 10, xl: 12 }}>
          <div style={{ padding: '16px', backgroundColor: '#f0f0f0', margin: '4px' }}>
            Grid Item 2
          </div>
        </GridItem>
        <GridItem size={{ xs: 4, sm: 6, md: 8, lg: 10, xl: 12 }}>
          <div style={{ padding: '16px', backgroundColor: '#f0f0f0', margin: '4px' }}>
            Grid Item 3
          </div>
        </GridItem>
      </>
    ),
  },
};

export const WithDifferentSizes: Story = {
  args: {
    children: (
      <>
        <GridItem size={6}>
          <div style={{ padding: '16px', backgroundColor: '#e3f2fd', margin: '4px' }}>
            Half Width (6/12)
          </div>
        </GridItem>
        <GridItem size={6}>
          <div style={{ padding: '16px', backgroundColor: '#e3f2fd', margin: '4px' }}>
            Half Width (6/12)
          </div>
        </GridItem>
        <GridItem size={8}>
          <div style={{ padding: '16px', backgroundColor: '#f3e5f5', margin: '4px' }}>
            Two Thirds (8/12)
          </div>
        </GridItem>
        <GridItem size={4}>
          <div style={{ padding: '16px', backgroundColor: '#f3e5f5', margin: '4px' }}>
            One Third (4/12)
          </div>
        </GridItem>
      </>
    ),
  },
};

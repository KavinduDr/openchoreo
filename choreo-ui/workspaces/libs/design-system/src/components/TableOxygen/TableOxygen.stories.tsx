import type { Meta, StoryObj } from '@storybook/react';
import { TableOxygen } from './TableOxygen';
import { TableBody, TableCell, TableHead, TableRow } from '@oxygen-ui/react';

const meta: Meta<typeof TableOxygen> = {
  title: 'Choreo DS/OxygenUI/TableOxygen',
  component: TableOxygen,
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
type Story = StoryObj<typeof TableOxygen>;

export const Default: Story = {
  args: {
    children: (
      <>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Calories</TableCell>
            <TableCell>Fat (g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Cupcake</TableCell>
            <TableCell>305</TableCell>
            <TableCell>3.7</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Donut</TableCell>
            <TableCell>452</TableCell>
            <TableCell>25.0</TableCell>
          </TableRow>
        </TableBody>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled TableOxygen',
    disabled: true,
  },
};

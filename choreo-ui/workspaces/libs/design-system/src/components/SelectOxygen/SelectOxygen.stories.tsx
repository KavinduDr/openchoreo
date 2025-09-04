import type { Meta, StoryObj } from '@storybook/react';
import { SelectOxygen } from './SelectOxygen';
import { Box, MenuItem, Select, Typography } from '@oxygen-ui/react';

const meta: Meta<typeof SelectOxygen> = {
  title: 'Choreo DS/OxygenUI/SelectOxygen',
  component: SelectOxygen,
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

const optionList = [
  { label: 'The Shawshank Redemption', value: '1994' },
  { label: 'The Godfather', value: '1972' },
  { label: 'The Godfather: Part II', value: '1974' },
  { label: 'The Dark Knight', value: '2008' },
  { label: '12 Angry Men', value: '1957' },
  { label: "Schindler's List", value: '1993' },
  { label: 'Pulp Fiction', value: '1994' },
  { label: 'The Lord of the Rings: The Return of the King', value: '2003' },
  { label: 'The Good, the Bad and the Ugly', value: '1966' },
  { label: 'Fight Club', value: '1999' },
  { label: 'The Lord of the Rings: The Fellowship of the Ring', value: '2001' },
  { label: 'Star Wars: Episode V - The Empire Strikes Back', value: '1980' },
  { label: 'Forrest Gump', value: '1994' },
  { label: 'Inception', value: '2010' },
  { label: 'The Lord of the Rings: The Two Towers', value: '2002' },
  { label: "One Flew Over the Cuckoo's Nest", value: '1975' },
];

const optionListWithIcon = [
  {
    label: 'Amazon S3',
    value: 'amazon',
    icon: 'https://bcentral-dev-packageicons.azureedge.net/images/ballerinax_aws.s3_3.1.0.png',
  },
  {
    label: 'GitHub',
    value: 'github',
    icon: 'https://bcentral-dev-packageicons.azureedge.net/images/ballerinax_github_4.4.0.png',
  },
];

interface OptionType {
  label: string;
  value: string;
}

interface OptionWithIconType extends OptionType {
  icon: string;
}

export default meta;
type Story = StoryObj<typeof SelectOxygen>;

export const Default: Story = {
  args: {
    children: 'SelectOxygen Content',
  },
  render: (_args) => {
    return (
      <Box>
        <Box sx={{ mb: 1 }}>
          <Typography variant="h3">Select</Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Select>
            {optionList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    );
  },
};

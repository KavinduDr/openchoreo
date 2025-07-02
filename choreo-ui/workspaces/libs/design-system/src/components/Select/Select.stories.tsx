import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Branch from '@design-system/Icons/generated/Branch';
import { Chip } from '../Chip';
import { Button } from '../Button';
import Tools from '@design-system/Icons/generated/Tools';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
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

export default meta;
type Story = StoryObj<typeof Select>;

export const Primary: Story = {
  render: function PrimarySelect(args) {
    const { onChange, ...restArgs } = args;
    const [value, setValue] = React.useState(optionList[0]);
    const handleChange = (val: any) => {
      setValue(val);
    };

    const [menuValue, setMenuValue] = React.useState(optionListWithIcon[0]);
    const handleMenuValueChange = (val: any) => {
      setMenuValue(val);
    };

    return (
      <Box maxWidth={800}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box mb={1}>
              <Typography variant="h3">Select</Typography>
            </Box>
            <Box mb={3}>
              <Select
                {...restArgs}
                name="selectList"
                label="Select List"
                labelId="SelectList"
                options={optionList}
                getOptionLabel={(option: any) => option.label}
                onChange={handleChange}
                value={value}
                testId="select-from-list"
              />
            </Box>
            <Box mb={3}>
              <Select
                {...restArgs}
                onChange={handleChange}
                name="selectPlaceholder"
                label="Select Placeholder"
                labelId="SelectPlaceholder"
                options={optionList}
                getOptionLabel={(option: any) => option.label}
                placeholder="Select Option"
                testId="select-placeholder"
                value={value}
              />
            </Box>
            <Box mb={3}>
              <Select
                {...restArgs}
                onChange={handleChange}
                name="selectError"
                label="Select Error"
                labelId="SelectError"
                options={optionList}
                getOptionLabel={(option: any) => option.label}
                helperText="Validation error"
                error
                placeholder="Select Option"
                testId="select-error"
                value={value}
              />
            </Box>
            <Box mb={3}>
              <Select
                {...restArgs}
                onChange={handleChange}
                name="selectDisabled"
                label="Select Disabled"
                labelId="SelectDisabled"
                options={optionList}
                getOptionLabel={(option: any) => option.label}
                placeholder="Select Option"
                testId="select-disabled"
                value={value}
                disabled
              />
            </Box>
            <Box mb={3}>
              <Select
                {...restArgs}
                onChange={handleChange}
                name="selectPlaceholder"
                label="Select with optional"
                labelId="SelectPlaceholder"
                options={optionList}
                getOptionLabel={(option: any) => option.label}
                value={value}
                placeholder="Select Option"
                testId="select-with-optional"
                optional
              />
            </Box>
            <Box mb={3}>
              <Select
                {...restArgs}
                onChange={handleChange}
                name="selectPlaceholder"
                label="Select with tooltip"
                labelId="SelectPlaceholder"
                options={optionList}
                getOptionLabel={(option: any) => option.label}
                placeholder="Select Option"
                value={value}
                tooltip="Tooltip goes here"
                testId="select-with-tooltip"
              />
            </Box>
            <Box mb={3}>
              <Select
                {...restArgs}
                onChange={handleChange}
                name="selectPlaceholder"
                label="Select with Create Button"
                labelId="SelectPlaceholder"
                options={optionList}
                getOptionLabel={(option: any) => option.label}
                placeholder="Select Option"
                value={value}
                optional
                tooltip="Tooltip goes here"
                addBtnText="Create New"
                testId="select-with-create-button"
                onAddClick={() => {}}
              />
            </Box>
            <Box mb={3}>
              <Select
                onChange={handleChange}
                name="selectPlaceholder"
                label="Select with start icon"
                labelId="SelectPlaceholder"
                options={optionList}
                getOptionLabel={(option: any) => option.label}
                placeholder="Select Option"
                value={value}
                optional
                tooltip="Tooltip goes here"
                testId="select-with-start-icon"
                startIcon={<Branch />}
              />
            </Box>
            <Box mb={2}>
              <Typography variant="h4">Select with menu item icon</Typography>
            </Box>
            <Box mb={3}>
              <Select
                {...restArgs}
                name="selectListMenuIcon"
                label="Select List Menu Icon"
                labelId="SelectListMenuIcon"
                options={optionListWithIcon}
                getOptionLabel={(option: any) => option.label}
                getOptionIcon={(option: any) => option.icon}
                onChange={handleMenuValueChange}
                value={menuValue}
                testId="select-list-menu-icon"
              />
            </Box>
            <Box mb={2}>
              <Typography variant="h4">Select with clear</Typography>
            </Box>
            <Box mb={3}>
              <Select
                onChange={handleChange}
                name="selectWithClear"
                label="Select with clear button"
                labelId="SelectWithClear"
                isClearable
                options={optionList}
                getOptionLabel={(option: any) => option.label}
                placeholder="Select Option"
                value={value}
                testId="select-with-clear-button"
              />
            </Box>
            <Box mb={2}>
              <Typography variant="h4">Select with loader</Typography>
            </Box>
            <Box mb={3}>
              <Select
                onChange={handleChange}
                name="selectWithLoader"
                label="Select with loader"
                labelId="SelectWithLoader"
                isClearable
                options={optionList}
                getOptionLabel={(option: any) => option?.label || ''}
                placeholder="Select Option"
                value={null}
                testId="select-with-loader-icon"
                isLoading
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  },
};

export const SelectEndActions: Story = {
  render: function SelectEndActions(args) {
    const { onChange, ...restArgs } = args;
    const [value, setValue] = React.useState(optionList[0]);
    const handleChange = (val: any) => {
      setValue(val);
    };

    return (
      <Box maxWidth={800}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box mb={1}>
              <Typography variant="h3">Select End Actions</Typography>
            </Box>
            <Box mb={3}>
              <Select
                {...restArgs}
                name="selectList"
                label="Select List"
                labelId="SelectList"
                options={optionList}
                getOptionLabel={(option: any) => option.label}
                onChange={handleChange}
                testId="select-end-action"
                value={value}
                optional
                info={
                  <Chip
                    label="action"
                    variant="outlined"
                    size="small"
                    color="primary"
                    testId="select"
                  />
                }
                tooltip="This is tool tip"
                actions={
                  <Button
                    testId="configure"
                    size="small"
                    variant="link"
                    startIcon={<Tools />}
                  >
                    Configure
                  </Button>
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  },
};

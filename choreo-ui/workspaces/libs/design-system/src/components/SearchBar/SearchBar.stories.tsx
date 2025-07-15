import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';
import { Card } from '../Card';
import { Box, CardContent, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { ExpandableSearch } from './ExpandableSearch/ExpandableSearch';

const meta: Meta<typeof SearchBar> = {
  title: 'Choreo DS/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {},
};

// Meta for ExpandableSearch component
const expandableMeta: Meta<typeof ExpandableSearch> = {
  title: 'Choreo DS/SearchBar/ExpandableSearch',
  component: ExpandableSearch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Size of the expandable search',
    },
    direction: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Direction of expansion',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
    },
    searchString: {
      control: 'text',
      description: 'Current search value',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;
type ExpandableStory = StoryObj<typeof ExpandableSearch>;

export const Default: Story = {
  render: () => {
    return (
      <Card testId="search-bar">
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={8}>
              <Box mb={2}>
                <Typography>Size - Small</Typography>
              </Box>
              <SearchBar
                size="small"
                testId="search-bar-default"
                onChange={() => {}}
                placeholder="Search"
              />
            </Grid>
            <Grid size={8}>
              <Box mb={2}>
                <Typography>Size - Medium(default)</Typography>
              </Box>
              <SearchBar
                size="medium"
                testId="search-bar-default"
                onChange={() => {}}
                placeholder="Search"
              />
            </Grid>
            <Grid size={8}>
              <Box mb={2}>
                <Typography>Color - Secondary </Typography>
              </Box>
              <SearchBar
                size="medium"
                testId="search-bar-default"
                onChange={() => {}}
                placeholder="Search"
                color="secondary"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  },
};

export const DefaultRight: Story = {
  render: () => {
    return (
      <Card testId="card-default-search-bar-wrapper">
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={8}>
              <SearchBar
                testId="search-bar-default-right"
                onChange={() => {}}
                placeholder="Search"
                iconPlacement="right"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  },
};

export const Expandable: ExpandableStory = {
  args: {
    size: 'medium',
    direction: 'left',
    placeholder: 'Search...',
    searchString: '',
    testId: 'search-expandable',
  },
  render: function Expandable(args) {
    const [searchVal, setSearchVal] = useState(args.searchString || '');
    return (
      <Card testId="card-expandable-search-wrapper">
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={10}>
              <Box mb={2}>
                <Typography>Expandable Search - {args.size} size, {args.direction} direction</Typography>
              </Box>
              <ExpandableSearch
                {...args}
                onChange={setSearchVal}
                searchString={searchVal}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  },
};

export const ExpandableVariants: Story = {
  render: function ExpandableVariants() {
    const [searchVal, setSearchVal] = useState('');
    return (
      <Card testId="card-expandable-variants-wrapper">
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={10}>
              <Box mb={2}>
                <Typography>Size - Small, Direction - Left</Typography>
              </Box>
              <ExpandableSearch
                size="small"
                testId="search-expandable-small-left"
                onChange={setSearchVal}
                searchString={searchVal}
                direction="left"
                placeholder="Search small left..."
              />
            </Grid>
            <Grid size={10}>
              <Box mb={2}>
                <Typography>Size - Medium, Direction - Left</Typography>
              </Box>
              <ExpandableSearch
                size="medium"
                testId="search-expandable-medium-left"
                onChange={setSearchVal}
                searchString={searchVal}
                direction="left"
                placeholder="Search medium left..."
              />
            </Grid>
            <Grid size={10}>
              <Box mb={2}>
                <Typography>Size - Small, Direction - Right</Typography>
              </Box>
              <ExpandableSearch
                size="small"
                testId="search-expandable-small-right"
                onChange={setSearchVal}
                searchString={searchVal}
                direction="right"
                placeholder="Search small right..."
              />
            </Grid>
            <Grid size={10}>
              <Box mb={2}>
                <Typography>Size - Medium, Direction - Right</Typography>
              </Box>
              <ExpandableSearch
                size="medium"
                testId="search-expandable-medium-right"
                onChange={setSearchVal}
                searchString={searchVal}
                direction="right"
                placeholder="Search medium right..."
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  },
};

export const ExpandableRight: ExpandableStory = {
  args: {
    size: 'medium',
    direction: 'right',
    placeholder: 'Search from right...',
    searchString: '',
    testId: 'search-expandable-right',
  },
  render: function ExpandableRight(args) {
    const [searchVal, setSearchVal] = useState(args.searchString || '');

    return (
      <Card testId="card-expandable-search-right-wrapper">
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={10}>
              <Box mb={2}>
                <Typography>Right Expandable Search - {args.size} size</Typography>
              </Box>
              <ExpandableSearch
                {...args}
                onChange={setSearchVal}
                searchString={searchVal}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  },
};

export const SearchBarWithFilter: Story = {
  render: function SearchBarWithFilter() {
    const [filterValue, setFilterValue] = useState('0');
    const handleFilterChange = (value: string) => {
      setFilterValue(value);
    };
    return (
      <Card testId="search-bar">
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={8}>
              <SearchBar
                testId="search-bar-end-action"
                onChange={() => {}}
                placeholder="Search"
                filterValue={filterValue}
                onFilterChange={handleFilterChange}
                filterItems={[
                  { value: 0, label: 'All' },
                  { value: 1, label: 'Name' },
                  { value: 2, label: 'Description' },
                ]}
              />
            </Grid>
            <Grid size={8}>
              <SearchBar
                testId="search-bar-end-action"
                onChange={() => {}}
                placeholder="Search"
                filterValue={filterValue}
                onFilterChange={handleFilterChange}
                filterItems={[
                  { value: 0, label: 'All' },
                  { value: 1, label: 'Name' },
                  { value: 2, label: 'Description' },
                ]}
                bordered
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  },
};

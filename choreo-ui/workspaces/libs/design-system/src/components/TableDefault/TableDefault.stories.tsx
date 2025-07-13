import type { Meta, StoryObj } from '@storybook/react';
import { TableDefault } from './TableDefault';
import { TableHead } from './TableHead/TableHead';
import { TableRow } from './TableRow/TableRow';
import { TableCell } from './TableCell/TableCell';
import { Tooltip } from '../Tooltip';
import { Checkbox } from '../Checkbox';
import { TableSortLabel } from './TableSortLabel/TableSortLabel';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { Card } from '../Card';
import { TableToolbar } from './TableToolBar/TableToolBar';
import { TableContainer } from './TableContainer/TableContainer';
import { TableBody } from './TableBody/TableBody';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import Tools from '@design-system/Icons/generated/Tools';
import { TableRowNoData } from './TableRowNoData';
import { Pagination } from '../Pagination';

interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): Data {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

const meta: Meta<typeof TableDefault> = {
  title: 'Components/Table/TableDefault',
  component: TableDefault,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'dark', 'white'],
      description: 'The variant of the table',
    },
    testId: {
      control: { type: 'text' },
      description: 'Test ID for the table',
    },
    children: {
      control: false,
      description: 'Table content',
    },
  },
  args: {
    variant: 'default',
    testId: 'table-default',
  },
};

export default meta;
type Story = StoryObj<typeof TableDefault>;

// Basic table with minimal content
export const Basic: Story = {
  args: {
    variant: 'default',
    testId: 'basic-table',
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

// Dark variant
export const Dark: Story = {
  args: {
    ...Basic.args,
    variant: 'dark',
    testId: 'dark-table',
  },
};

// White variant
export const White: Story = {
  args: {
    ...Basic.args,
    variant: 'white',
    testId: 'white-table',
  },
};

// Enhanced table with sorting, selection, and pagination
export const Enhanced: Story = {
  render: (args) => {
    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof Data
    ) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.name);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (value: string) => {
      setRowsPerPage(parseInt(value, 10));
      setPage(0);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const headCells = [
      {
        id: 'name' as keyof Data,
        numeric: false,
        disablePadding: true,
        label: 'Dessert (100g serving)',
      },
      { id: 'calories' as keyof Data, numeric: true, disablePadding: false, label: 'Calories' },
      { id: 'fat' as keyof Data, numeric: true, disablePadding: false, label: 'Fat (g)' },
      { id: 'carbs' as keyof Data, numeric: true, disablePadding: false, label: 'Carbs (g)' },
      { id: 'protein' as keyof Data, numeric: true, disablePadding: false, label: 'Protein (g)' },
    ];

    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

    const descendingComparator = <T,>(a: T, b: T, orderBy: keyof T) => {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    };

    const getComparator = <Key extends keyof Data>(
      order: 'asc' | 'desc',
      orderBy: Key
    ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number => {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    };

    const stableSort = <T,>(array: T[], comparator: (a: T, b: T) => number) => {
      const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    };

    return (
      <Box>
        <Card testId="enhanced-table-story">
          <Box m={3}>
            <TableToolbar numSelected={selected.length} />
            <TableContainer>
              <TableDefault {...args}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Tooltip title="Select all" placement="bottom-start">
                        <Checkbox
                          indeterminate={selected.length > 0 && selected.length < rows.length}
                          checked={rows.length > 0 && selected.length === rows.length}
                          onChange={handleSelectAllClick}
                          disableRipple={true}
                          inputProps={{ 'aria-label': 'select all desserts' }}
                          testId="table-head"
                        />
                      </Tooltip>
                    </TableCell>
                    {headCells.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                      >
                        <TableSortLabel
                          direction={orderBy === headCell.id ? order : 'asc'}
                          onClick={createSortHandler(headCell.id)}
                        >
                          {headCell.label}
                          {orderBy === headCell.id ? (
                            <Box className="visually-hidden">
                              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                          ) : null}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                    <TableCell padding="checkbox" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          onClick={(event) => handleClick(event, row.name)}
                          aria-checked={isItemSelected}
                          key={row.name}
                          disabled={index === 4}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                              disableRipple={true}
                              testId="table-row-checkbox"
                            />
                          </TableCell>
                          <TableCell id={labelId} scope="row" padding="none">
                            <Box display="flex" alignItems="center" gap={1}>
                              <Avatar testId="avatar">
                                {row.name.slice(0, 1)}
                              </Avatar>
                              <Typography variant="caption">
                                {row.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                          <TableCell align="right">
                            <Button
                              size="tiny"
                              variant="link"
                              testId="config"
                              startIcon={<Tools fontSize="inherit" />}
                              onClick={(e: any) => {
                                e.stopPropagation();
                              }}
                            >
                              Config
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </TableDefault>
            </TableContainer>
            <Box px={2} py={1}>
              <Pagination
                rowsPerPageOptions={[5, 10, 25]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                testId="pagination"
              />
            </Box>
          </Box>
        </Card>
      </Box>
    );
  },
  args: {
    variant: 'default',
    testId: 'enhanced-table',
  },
};

// Table with no data
export const NoData: Story = {
  render: (args) => (
    <Box>
      <Card testId="table-story-no-data">
        <Box m={3}>
          <TableToolbar numSelected={0} />
          <TableContainer>
            <TableDefault {...args}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Calories</TableCell>
                  <TableCell>Fat (g)</TableCell>
                  <TableCell>Carbs (g)</TableCell>
                  <TableCell>Protein (g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRowNoData
                  testId="no-data-row"
                  colSpan={5}
                  message="No desserts available"
                />
              </TableBody>
            </TableDefault>
          </TableContainer>
        </Box>
      </Card>
    </Box>
  ),
  args: {
    variant: 'default',
    testId: 'no-data-table',
  },
};

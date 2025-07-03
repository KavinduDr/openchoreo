import {
  styled,
  TableSortLabel as MUITableSortLabel,
  TableSortLabelProps,
} from '@mui/material';

export const StyledTableSortLabel: React.ComponentType<TableSortLabelProps> =
  styled(MUITableSortLabel)({
    '& .MuiTableSortLabel-icon': {
      opacity: 1,
    },
    '&:not(.Mui-active) .MuiTableSortLabel-icon': {
      opacity: 0,
    },
    '&:hover': {
      '& .MuiTableSortLabel-icon': {
        opacity: 1,
      },
    },
  });

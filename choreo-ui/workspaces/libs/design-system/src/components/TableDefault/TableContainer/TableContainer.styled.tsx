import {
  styled,
  TableContainerProps,
  TableContainer as MUITableContainer,
} from '@mui/material';

export const StyledTableContainer: React.ComponentType<TableContainerProps> =
  styled(MUITableContainer)({
    overflow: 'visible',
  });

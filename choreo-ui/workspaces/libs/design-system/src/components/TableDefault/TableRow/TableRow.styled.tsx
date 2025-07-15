import {
  styled,
  TableRow as MUITableRow,
  TableRowProps as MUITableRowProps,
} from '@mui/material';

interface TableRowProps extends MUITableRowProps {
  deletable?: boolean;
  disabled?: boolean;
  disableHover?: boolean;
  noBorderBottom?: boolean;
}

export const StyledTableRow: React.ComponentType<TableRowProps> = styled(
  MUITableRow
)<TableRowProps>(({ theme, disabled, noBorderBottom, disableHover }) => ({
  opacity: disabled ? 0.7 : 1,
  color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
  cursor: disabled ? 'not-allowed' : 'pointer',
  pointerEvents: disabled ? 'none' : 'auto',
  ...(noBorderBottom && {
    '& .MuiTableCell-root': {
      borderBottom: 'none',
    },
  }),
  '&:hover': {
    backgroundColor:
      disabled || disableHover ? 'transparent' : theme.palette.action.hover,
  },
}));

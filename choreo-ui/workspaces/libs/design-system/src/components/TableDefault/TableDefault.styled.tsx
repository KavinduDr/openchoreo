import {
  styled,
  Table as MUITable,
  TableProps as MUITableProps,
} from '@mui/material';
import { ComponentType } from 'react';

export interface StyledTableDefaultProps {
  variant: string;
}

export const StyledTable: ComponentType<
  MUITableProps & StyledTableDefaultProps
> = styled(MUITable, {
  shouldForwardProp: (prop) => prop !== 'disabled' && prop !== 'variant',
})<StyledTableDefaultProps>(({ theme, variant }) => ({
  ...(variant === 'dark' && {
    borderCollapse: 'separate',
    borderSpacing: theme.spacing(0, 1),
    '& .MuiTableBody-root': {
      overflow: 'visible',
      '& .MuiTableRow-root': {
        overflow: 'visible',
        boxShadow: theme.shadows[1],
        borderRadius: theme.spacing(1),
        backgroundColor: theme.palette.background.default,
      },
    },
    '& .MuiTableCell-body': {
      borderBottom: 'none',
      padding: theme.spacing(1, 2),
      '&:first-child': {
        borderLeft: '1px solid transparent',
        borderTopLeftRadius: theme.spacing(1),
        borderBottomLeftRadius: theme.spacing(1),
      },
      '&:last-child': {
        borderRight: '1px solid transparent',
        borderTopRightRadius: theme.spacing(1),
        borderBottomRightRadius: theme.spacing(1),
      },
      '&[data-padding="checkbox"]': {
        backgroundColor: 'transparent',
      },
    },
  }),
  ...(variant === 'white' && {
    borderCollapse: 'separate',
    borderSpacing: theme.spacing(0, 1),
    '& .MuiTableBody-root': {
      '& .MuiTableRow-root': {
        borderRadius: theme.spacing(1),
        transition: 'box-shadow 0.3s ease',
        boxShadow: theme.shadows[1],
        '&:hover': {
          boxShadow: theme.shadows[2],
          '& .MuiTableCell-body': {
            borderTop: `1px solid ${theme.palette.primary.light}`,
            borderBottom: `1px solid ${theme.palette.primary.light}`,
            '&:first-child': {
              borderLeft: `1px solid ${theme.palette.primary.light}`,
            },
            '&:last-child': {
              borderRight: `1px solid ${theme.palette.primary.light}`,
            },

          },
        },
      },
    },
    '& .MuiTableCell-head': {
      opacity: 0.8,
    },
    '& .MuiTableCell-body': {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1, 2),
      transition: 'border 0.3s ease',
      border: '1px solid transparent',
      '&:first-child': {
        borderLeft: '1px solid transparent',
        borderTopLeftRadius: theme.spacing(1),
        borderBottomLeftRadius: theme.spacing(1),
      },
      '&:last-child': {
        borderRight: '1px solid transparent',
        borderTopRightRadius: theme.spacing(1),
        borderBottomRightRadius: theme.spacing(1),
      },
      '&[data-padding="checkbox"]': {
        backgroundColor: 'transparent',
      },
    },
  }),
}));


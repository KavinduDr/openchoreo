import {
  styled,
  ButtonGroup as MuiButtonGroup,
  ButtonGroupProps as MuiButtonGroupProps,
} from '@mui/material';
import { ComponentType } from 'react';

export interface StyledButtonGroupProps extends MuiButtonGroupProps {
  disabled?: boolean;
}

export const StyledButtonGroup: ComponentType<StyledButtonGroupProps> = styled(
  MuiButtonGroup
)<StyledButtonGroupProps>(({ theme }) => ({
  borderRadius: 5,
  boxShadow: 'none',

  // Base styles for all buttons
  '& .MuiButtonGroup': {
    minWidth: 'initial',
  },

  // Add shared styles for both Button and IconButton
  '& .MuiButtonBase-root': {
    minWidth: 'initial',
  },

  // Specific styles for IconButton
  '& .btn-group-icon-button': {
    padding: '6px 16px', // Match padding with regular buttons
    borderRadius: 0, // Remove default border radius

    '&:first-of-type': {
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },

    '&:last-of-type': {
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
  },

  // Contained + Primary
  '&[data-variant="contained"][data-color="primary"]': {
    '& .MuiButtonGroup': {
      borderColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&.Mui-disabled': {
        color: theme.palette.common.white,
      },
      '&:not(:last-child)': {
        borderRightColor: theme.palette.primary.light,
      },
    },

    // Apply same styles to IconButton
    '& .btn-group-icon-button': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      borderColor: theme.palette.primary.main,

      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },

      '&.Mui-disabled': {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.action.disabledBackground,
      },

      '&:not(:last-child)': {
        borderRightColor: theme.palette.primary.light,
      },
    },
  },

  // Contained + Secondary
  '&[data-variant="contained"][data-color="secondary"]': {
    '& .MuiButtonGroup': {
      borderColor: theme.palette.grey[100],
      '&:not(:last-child)': {
        borderColor: theme.palette.grey[100],
        '&.Mui-disabled': {
          borderColor: theme.palette.grey[100],
        },
      },
    },

    // Apply same styles to IconButton
    '& .btn-group-icon-button': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      borderColor: theme.palette.grey[100],

      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
      },

      '&.Mui-disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
      },

      '&:not(:last-child)': {
        borderColor: theme.palette.grey[100],
      },
    },
  },

  // Outlined variant styles
  '&[data-variant="outlined"]': {
    '& .btn-group-icon-button': {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: 'transparent',

      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },

      '&:not(:last-child)': {
        borderRightColor: theme.palette.primary.light,
      },
    },
  },

  // Outlined + Primary
  '&[data-variant="outlined"][data-color="primary"]': {
    '& .btn-group-icon-button': {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,

      '&.Mui-disabled': {
        color: theme.palette.action.disabled,
        borderColor: theme.palette.action.disabledBackground,
      },
    },
  },

  // Outlined + Secondary
  '&[data-variant="outlined"][data-color="secondary"]': {
    '& .btn-group-icon-button': {
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,

      '&.Mui-disabled': {
        color: theme.palette.action.disabled,
        borderColor: theme.palette.action.disabledBackground,
      },
    },
  },

  // Size variants
  '&[data-size="small"] .btn-group-icon-button, &[data-size="tiny"] .btn-group-icon-button':
    {
      padding: '4px 10px', // Smaller padding for small/tiny size
    },

  '&[data-size="medium"] .btn-group-icon-button': {
    padding: '6px 16px',
  },
}));

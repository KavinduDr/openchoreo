import {
  styled,
  ButtonGroup as MuiButtonGroup,
  ButtonGroupProps as MuiButtonGroupProps,
  alpha,
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

  '& .MuiButton-root': {
    minWidth: 'initial',
  },

  '& .MuiButtonBase-root': {
    minWidth: 'initial',
  },

  '& .btn-group-icon-button': {
    padding: '6px 16px',
    borderRadius: 0,

    '&:first-of-type': {
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },

    '&:last-of-type': {
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
  },

  '&[data-variant="contained"][data-color="primary"]': {
    '& .MuiButton-root': {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&.Mui-disabled': {
        color: theme.palette.common.white,
      },
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },

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

  '&[data-variant="contained"][data-color="secondary"]': {
    '& .MuiButton-root': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      borderColor: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        borderColor: theme.palette.secondary.dark,
      },
      '&.Mui-disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
      },
    },

    '& .btn-group-icon-button': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      borderColor: theme.palette.grey[100],

      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        borderColor: theme.palette.secondary.dark,
      },

      '&.Mui-disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
      },

      '&:not(:last-child)': {
        borderColor: theme.palette.grey[100],
      },
    },
  },

  '&[data-variant="outlined"]': {
    '& .MuiButton-root': {
      backgroundColor: 'transparent',
    },

    '& .btn-group-icon-button': {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: 'transparent',

      '&:hover': {
        boxShadow: `1px 1px 3px ${alpha(theme.palette.common.black, 0.1)}`,
      },

      '&:not(:last-child)': {
        borderRightColor: theme.palette.primary.light,
      },
    },
  },

  '&[data-variant="outlined"][data-color="primary"]': {
    '& .MuiButton-root': {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      '&.Mui-disabled': {
        color: theme.palette.action.disabled,
        borderColor: theme.palette.action.disabledBackground,
      },
    },

    '& .btn-group-icon-button': {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,

      '&.Mui-disabled': {
        color: theme.palette.action.disabled,
        borderColor: theme.palette.action.disabledBackground,
      },

      '&:hover': {
        boxShadow: `0 1px 6px 2px ${alpha(theme.palette.common.black, 0.1)}`,
      },
    },
  },

  '&[data-variant="outlined"][data-color="secondary"]': {
    '& .MuiButton-root': {
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
      '&.Mui-disabled': {
        color: theme.palette.action.disabled,
        borderColor: theme.palette.action.disabledBackground,
      },
    },

    '& .btn-group-icon-button': {
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,

      '&.Mui-disabled': {
        color: theme.palette.action.disabled,
        borderColor: theme.palette.action.disabledBackground,
      },
      '&:hover': {
        boxShadow: `0 1px 6px 2px ${alpha(theme.palette.common.black, 0.1)}`,
      },
    },
  },

  '&[data-size="small"] .MuiButton-root, &[data-size="small"] .MuiButton-sizeSmall':
    {
      padding: theme.spacing(0.375, 2),
      gap: theme.spacing(0.75),
      '& .MuiButton-startIcon, & .MuiButton-endIcon': {
        '& > *:first-of-type': {
          fontSize: theme.spacing(1.75),
        },
      },
      '&.link': {
        padding: theme.spacing(0.375, 0),
      },
    },

  '&[data-size="tiny"] .MuiButton-root, &[data-size="tiny"] .MuiButton-sizeSmall, &[data-size="tiny"] .MuiButton-root.tiny':
    {
      padding: theme.spacing(0, 1.5),
      gap: theme.spacing(0.5),
      '& .MuiButton-startIcon, & .MuiButton-endIcon': {
        '& > *:first-of-type': {
          fontSize: theme.spacing(1.5),
        },
      },
      '&.link': {
        padding: 0,
      },
    },

  '&[data-size="small"] .btn-group-icon-button': {
    padding: `${theme.spacing(0.375)} ${theme.spacing(2)}`,
  },

  '&[data-size="tiny"] .btn-group-icon-button': {
    padding: `${theme.spacing(0)} ${theme.spacing(1.5)}`,
  },

  '&[data-size="medium"] .btn-group-icon-button': {
    padding: `${theme.spacing(0.75)} ${theme.spacing(2)}`,
  },

  '&[data-size="tiny"]': {
    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
      '& > *:first-of-type': {
        fontSize: theme.spacing(1.5),
      },
    },
  },
}));

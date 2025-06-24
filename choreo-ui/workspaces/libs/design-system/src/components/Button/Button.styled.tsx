import { Button, ButtonProps } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { ComponentType } from 'react';

export const StyledButton: ComponentType<ButtonProps> = styled(
  Button
)<ButtonProps>(({ theme }) => ({
  borderRadius: theme.spacing(0.625),
  textTransform: 'none',
  fontWeight: 400,
  fontSize: theme.spacing(1.625),
  lineHeight: theme.spacing(3),
  padding: `${theme.spacing(0.875)} ${theme.spacing(2)}`,
  gap: theme.spacing(1),

  '&.pill': {
    borderRadius: theme.spacing(3),
  },

  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1),
    '& > *:first-of-type': {
      fontSize: theme.spacing(2),
    },
  },

  '& .MuiButton-endIcon': {
    marginLeft: theme.spacing(1),
    '& > *:first-of-type': {
      fontSize: theme.spacing(2),
    },
  },

  '&.MuiButton-contained': {
    border: `${theme.spacing(0.125)} solid transparent`,
    '&:hover': {
      boxShadow: theme.shadows[1],
    },
    '&:focus': {
      boxShadow: theme.shadows[2],
    },
    '&.MuiButton-containedPrimary': {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        borderColor: theme.palette.primary.dark,
      },
    },
    '&.MuiButton-containedSecondary': {
      backgroundColor: theme.palette.secondary.light,
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.common.white
          : theme.palette.common.black,
      border: `${theme.spacing(0.125)} solid ${theme.palette.grey[100]}`,
      boxShadow: theme.shadows[1],
      '&:hover': {
        backgroundColor: theme.palette.secondary.light,
        color:
          theme.palette.mode === 'dark'
            ? theme.palette.common.white
            : theme.palette.common.black,
        boxShadow: theme.shadows[1],
      },
      '&:focus': {
        boxShadow: theme.shadows[2],
      },
      '&.Mui-disabled': {
        color:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.common.white, 0.6)
            : theme.palette.common.black,
      },
    },
    '&.MuiButton-containedError': {
      backgroundColor: theme.palette.error.main,
      borderColor: theme.palette.error.main,
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.error.dark,
        borderColor: theme.palette.error.dark,
      },
    },
    '&.MuiButton-containedWarning': {
      backgroundColor: theme.palette.warning.main,
      borderColor: theme.palette.warning.main,
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.warning.dark,
        borderColor: theme.palette.warning.dark,
      },
    },
    '&.MuiButton-containedSuccess': {
      backgroundColor: theme.palette.success.main,
      borderColor: theme.palette.success.main,
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.success.dark,
        borderColor: theme.palette.success.dark,
      },
    },
  },

  '&.MuiButton-outlined': {
    backgroundColor: 'transparent',
    '&:hover': {
      boxShadow: theme.shadows[2],
    },
    '&:focus': {
      boxShadow: theme.shadows[2],
    },
    '&.MuiButton-outlinedPrimary': {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      '&:hover': {
        borderColor: theme.palette.primary.dark,
      },
    },
    '&.MuiButton-outlinedSecondary': {
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.common.white
          : theme.palette.secondary.main,
      border: `${theme.spacing(0.125)} solid ${
        theme.palette.mode === 'dark'
          ? theme.palette.grey[100]
          : theme.palette.secondary.main
      }`,
      '&:hover': {
        borderColor:
          theme.palette.mode === 'dark'
            ? theme.palette.grey[200]
            : theme.palette.secondary.dark,
        backgroundColor:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.common.white, 0.05)
            : alpha(theme.palette.action.hover, 0.05),
      },
      '&.Mui-disabled': {
        color:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.common.white, 0.6)
            : theme.palette.secondary.main,
        borderColor:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.grey[100], 0.6)
            : theme.palette.secondary.main,
      },
    },
    '&.MuiButton-outlinedError': {
      color: theme.palette.error.main,
      borderColor: theme.palette.error.main,
      '&:hover': {
        borderColor: theme.palette.error.dark,
      },
    },
    '&.MuiButton-outlinedWarning': {
      color: theme.palette.warning.main,
      borderColor: theme.palette.warning.main,
      '&:hover': {
        borderColor: theme.palette.warning.dark,
      },
    },
    '&.MuiButton-outlinedSuccess': {
      color: theme.palette.success.main,
      borderColor: theme.palette.success.main,
      '&:hover': {
        borderColor: theme.palette.success.dark,
      },
    },
  },

  '&.MuiButton-text': {
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: alpha(theme.palette.action.hover, 0.05),
    },
    '&.MuiButton-textPrimary': {
      color: theme.palette.primary.main,
    },
    '&.MuiButton-textSecondary': {
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.common.white
          : theme.palette.common.black,
      '&.Mui-disabled': {
        color:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.common.white, 0.6)
            : theme.palette.common.black,
      },
    },
    '&.MuiButton-textError': {
      color: theme.palette.error.main,
    },
    '&.MuiButton-textWarning': {
      color: theme.palette.warning.main,
    },
    '&.MuiButton-textSuccess': {
      color: theme.palette.success.main,
    },
  },

  '&.subtle': {
    border: `${theme.spacing(0.125)} solid ${theme.palette.grey[100]}`,
    boxShadow: `0 ${theme.spacing(0.125)} ${theme.spacing(0.375)} ${alpha(theme.palette.common.black, 0.05)}`,
    backgroundColor: alpha(theme.palette.action.hover, 0.05),
    '&:hover': {
      backgroundColor: alpha(theme.palette.action.hover, 0.1),
      boxShadow: `0 ${theme.spacing(0.125)} ${theme.spacing(0.375)} ${alpha(theme.palette.common.black, 0.1)}`,
    },
    '&:focus': {
      boxShadow: 'none',
    },
    '&.subtle-primary': {
      color: theme.palette.primary.main,
    },
    '&.subtle-secondary': {
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.common.white
          : theme.palette.common.black,
      '&.Mui-disabled': {
        color:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.common.white, 0.6)
            : theme.palette.common.black,
      },
    },
    '&.subtle-error': {
      color: theme.palette.error.main,
    },
    '&.subtle-warning': {
      color: theme.palette.warning.main,
    },
    '&.subtle-success': {
      color: theme.palette.success.main,
    },
  },

  '&.link': {
    borderColor: 'transparent',
    boxShadow: 'none',
    paddingLeft: 0,
    paddingRight: 0,
    minWidth: 'initial',
    backgroundColor: 'transparent',
    '& .MuiButton-startIcon': {
      marginLeft: 0,
    },
    '& .MuiButton-endIcon': {
      marginRight: 0,
    },
    '&:hover': {
      opacity: 0.8,
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    '&.link-primary': {
      color: theme.palette.primary.main,
    },
    '&.link-secondary': {
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.common.white
          : theme.palette.common.black,
      borderColor: 'transparent',
      boxShadow: 'none',
      '&.Mui-disabled': {
        color:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.common.white, 0.6)
            : theme.palette.common.black,
        borderColor: 'transparent',
        boxShadow: 'none',
      },
    },
    '&.link-error': {
      color: theme.palette.error.main,
    },
    '&.link-warning': {
      color: theme.palette.warning.main,
    },
    '&.link-success': {
      color: theme.palette.success.main,
    },
  },

  '&.MuiButton-sizeLarge': {
    padding: `${theme.spacing(1)} ${theme.spacing(2.75)}`,
    fontSize: theme.spacing(2),
    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
      '& > *:first-of-type': {
        fontSize: theme.spacing(2.5),
      },
    },
  },

  '&.MuiButton-sizeSmall': {
    padding: theme.spacing(0.375, 2),
    gap: theme.spacing(0.75),
    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
      '& > *:first-of-type': {
        fontSize: theme.spacing(1.75),
      },
    },
    '&.pill': {
      borderRadius: theme.spacing(2),
    },
    '&.link': {
      padding: `${theme.spacing(0.375)} 0`,
    },
  },

  '&.tiny': {
    padding: theme.spacing(0, 1.5),
    gap: theme.spacing(0.5),
    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
      '& > *:first-of-type': {
        fontSize: theme.spacing(1.5),
      },
    },
    '&.pill': {
      borderRadius: theme.spacing(1.5),
    },
    '&.link': {
      padding: theme.spacing(0),
    },
  },

  '&.Mui-disabled': {
    opacity: 0.5,
    cursor: 'default',
    pointerEvents: 'none',
    color: theme.palette.common.white,
    '&:hover': {
      textDecoration: 'none',
    },
  },

  '&.MuiButton-fullWidth': {
    width: '100%',
  },
}));

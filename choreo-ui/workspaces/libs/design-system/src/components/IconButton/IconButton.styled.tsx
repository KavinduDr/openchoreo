import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import { alpha, Theme } from '@mui/material/styles';

const getFocusShadow = (theme: Theme) =>
  `0 ${theme.spacing(0.125)} ${theme.spacing(0.75)} ${theme.spacing(0.25)} ${alpha(
    theme.palette.common.black,
    0.1
  )}`;

export const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) =>
    !['size', 'color', 'disabled', 'edge'].includes(prop as string),
})(({
  theme,
  size = 'medium',
  color = 'primary',
  disabled,
}: {
  theme: Theme;
  size?: 'small' | 'medium' | 'tiny';
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'info'
    | 'success';
  disabled?: boolean;
}) => {
  const sizeStyles = {
    small: {
      padding: theme.spacing(0.875),
      '& svg': {
        fontSize: theme.spacing(2),
      },
    },
    medium: {
      padding: theme.spacing(1),
      '& > *:first-of-type': {
        fontSize: theme.spacing(2.5),
      },
    },
    tiny: {
      padding: theme.spacing(0.625),
      '& svg': {
        fontSize: theme.spacing(1.375),
      },
    },
  };

  return {
    borderRadius: theme.spacing(0.625),
    ...sizeStyles[size as keyof typeof sizeStyles],
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'default' : 'pointer',
    '&.Mui-disabled': {
      opacity: 0.5,
      cursor: 'default',
      pointerEvents: 'none' as const,
      '&:hover, &:focus': {
        backgroundColor: 'inherit',
        boxShadow: 'none',
        borderColor: 'inherit',
      },
    },
    '&:focus-visible': {
      boxShadow: disabled ? 'none' : getFocusShadow(theme),
    },
    '&[data-icon-button-rounded="true"]': {
      borderRadius: '50%',
    },
    '&[data-icon-button-active="true"]': {
      color: theme.palette.primary.main,
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor:
        alpha(theme.palette.primary.main, 0.08) ||
        alpha(theme.palette.primary.main, 0.1),
      cursor: 'default',
      '&:hover, &:focus': {
        border: `1px solid ${theme.palette.primary.main}`,
        backgroundColor:
          alpha(theme.palette.primary.main, 0.08) ||
          alpha(theme.palette.primary.main, 0.1),
        boxShadow: 'none',
      },
    },
    '&[data-icon-button-inactive="true"]': {
      color: theme.palette.secondary.main,
      border: `1px solid ${theme.palette.secondary.main}`,
      '&:hover': {
        borderColor: theme.palette.secondary.dark,
      },
    },
    '&[data-icon-button-variant="contained"]': {
      '&:hover': {
        boxShadow: disabled
          ? 'none'
          : `0 2px 4px ${alpha(theme.palette.common.black, 0.18)}`,
      },
      '&:focus': {
        boxShadow: disabled
          ? 'none'
          : `0 1px 6px 2px ${alpha(theme.palette.common.black, 0.1)}`,
      },
    },
    '&[data-icon-button-variant="outlined"]': {
      backgroundColor: 'transparent',
      boxShadow: `0 1px 2px ${alpha(theme.palette.common.black, 0.05)}`,
      '&:hover, &:focus': {
        backgroundColor: 'transparent',
        boxShadow: disabled
          ? 'none'
          : `0 1px 6px 2px ${alpha(theme.palette.common.black, 0.1)}`,
      },
    },
    '&[data-icon-button-variant="text"]': {
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: disabled
          ? 'transparent'
          : alpha(theme.palette.common.black, 0.04),
        boxShadow: 'none',
      },
    },
    '&[data-icon-button-variant="link"]': {
      borderColor: 'transparent',
      boxShadow: 'none',
      paddingLeft: 0,
      paddingRight: 0,
      minWidth: 'initial',
      backgroundColor: 'transparent',
      '&:hover': {
        opacity: 0.6,
      },
      '&:hover, &:focus': {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
    },
    '&[data-icon-button-variant="subtle"]': {
      border: `1px solid ${theme.palette.grey[100]}`,
      boxShadow: `0 1px 3px ${alpha(theme.palette.common.black, 0.1)}`,
      backgroundColor: theme.palette.secondary.light,
      '&:hover': {
        backgroundColor: theme.palette.secondary.light,
        boxShadow: `0 1px 3px ${alpha(theme.palette.common.black, 0.1)}`,
      },
      '&:focus': {
        backgroundColor: theme.palette.secondary.light,
        boxShadow: 'none',
      },
    },

    '&[data-icon-button-primaryContained="true"]': {
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    '&[data-icon-button-primaryText="true"]': {
      color: theme.palette.primary.main,
    },
    '&[data-icon-button-primaryOutlined="true"]': {
      color: theme.palette.primary.main,
      border: `1px solid ${theme.palette.primary.main}`,
      '&:hover': {
        borderColor: theme.palette.primary.dark,
      },
    },
    '&[data-icon-button-primarySubtle="true"]': {
      color: theme.palette.primary.main,
    },
    '&[data-icon-button-primaryLink="true"]': {
      color: theme.palette.primary.main,
      borderColor: 'transparent',
      boxShadow: 'none',
      '&$disabled': {
        color: theme.palette.primary.main,
        borderColor: 'transparent',
        boxShadow: 'none',
      },
    },

    '&[data-icon-button-secondaryContained="true"]': {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.common.black,
      border: `1px solid ${theme.palette.grey[100]}`,
      boxShadow: `0 1px 3px ${alpha(theme.palette.common.black, 0.1)}`,
    },
    '&[data-icon-button-secondaryText="true"]': {
      color: theme.palette.common.black,
    },
    '&[data-icon-button-secondaryOutlined="true"]': {
      color: theme.palette.secondary.main,
      border: `1px solid ${theme.palette.secondary.main}`,
      '&:hover': {
        borderColor: theme.palette.secondary.dark,
      },
    },
    '&[data-icon-button-secondarySubtle="true"]': {
      color: theme.palette.common.black,
    },
    '&[data-icon-button-secondaryLink="true"]': {
      color: theme.palette.common.black,
      borderColor: 'transparent',
      boxShadow: 'none',
      '&$disabled': {
        color: theme.palette.common.black,
        borderColor: 'transparent',
        boxShadow: 'none',
      },
    },
    '&[data-icon-button-errorContained="true"]': {
      backgroundColor: theme.palette.error.main,
      border: `1px solid ${theme.palette.error.main}`,
      '&:hover': {
        backgroundColor: theme.palette.error.dark,
        border: `1px solid ${theme.palette.error.dark}`,
      },
    },
    '&[data-icon-button-errorText="true"]': {
      color: theme.palette.error.main,
    },
    '&[data-icon-button-errorOutlined="true"]': {
      color: theme.palette.error.main,
      border: `1px solid ${theme.palette.error.main}`,
      '&:hover': {
        borderColor: theme.palette.error.dark,
      },
    },
    '&[data-icon-button-errorSubtle="true"]': {
      color: theme.palette.error.main,
    },
    '&[data-icon-button-errorLink="true"]': {
      color: theme.palette.error.main,
      borderColor: 'transparent',
      boxShadow: 'none',
      '&$disabled': {
        color: theme.palette.error.main,
        borderColor: 'transparent',
        boxShadow: 'none',
      },
    },
    '&[data-icon-button-successContained="true"]': {
      backgroundColor: theme.palette.success.main,
      border: `1px solid ${theme.palette.success.main}`,
      '&:hover': {
        backgroundColor: theme.palette.success.dark,
        border: `1px solid ${theme.palette.success.dark}`,
      },
    },
    '&[data-icon-button-successText="true"]': {
      color: theme.palette.success.main,
    },
    '&[data-icon-button-successOutlined="true"]': {
      color: theme.palette.success.main,
      border: `1px solid ${theme.palette.success.main}`,
      '&:hover': {
        borderColor: theme.palette.success.dark,
      },
    },
    '&[data-icon-button-successSubtle="true"]': {
      color: theme.palette.success.main,
    },
    '&[data-icon-button-successLink="true"]': {
      color: theme.palette.success.main,
      borderColor: 'transparent',
      boxShadow: 'none',
      '&$disabled': {
        color: theme.palette.success.main,
        borderColor: 'transparent',
        boxShadow: 'none',
      },
    },
    '&[data-icon-button-warningContained="true"]': {
      backgroundColor: theme.palette.warning.main,
      border: `1px solid ${theme.palette.warning.main}`,
      '&:hover': {
        backgroundColor: theme.palette.warning.dark,
        border: `1px solid ${theme.palette.warning.dark}`,
      },
    },
    '&[data-icon-button-warningText="true"]': {
      color: theme.palette.warning.main,
    },
    '&[data-icon-button-warningOutlined="true"]': {
      color: theme.palette.warning.main,
      border: `1px solid ${theme.palette.warning.main}`,
      '&:hover': {
        borderColor: theme.palette.warning.dark,
      },
    },
    '&[data-icon-button-warningSubtle="true"]': {
      color: theme.palette.warning.main,
    },
    '&[data-icon-button-warningLink="true"]': {
      color: theme.palette.warning.main,
      borderColor: 'transparent',
      boxShadow: 'none',
      '&$disabled': {
        color: theme.palette.warning.main,
        borderColor: 'transparent',
        boxShadow: 'none',
      },
    },
  };
});

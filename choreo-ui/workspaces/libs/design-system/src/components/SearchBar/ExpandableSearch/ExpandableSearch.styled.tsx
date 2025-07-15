import { alpha, Box, BoxProps, styled } from '@mui/material';
import { ComponentType } from 'react';

export interface StyledAutofocusFieldProps extends BoxProps {
  disabled?: boolean;
  size?: 'small' | 'medium';
}

export const StyledAutofocusField: ComponentType<StyledAutofocusFieldProps> =
  styled(Box)<StyledAutofocusFieldProps>(
    ({ disabled, size = 'medium', theme }) => ({
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      backgroundColor: 'transparent',

      '& .search': {
        position: 'relative',
        width: '100%',
      },

      '& .inputRootExpandable': {
        color: 'inherit',
        width: '100%',
      },

      '& .inputExpandable': {
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1, 1, 1, 1),
        transition: 'all 0.3s',
        backgroundColor: theme.palette.common.white,
        height: size === 'small' ? theme.spacing(3.75) : theme.spacing(4.75),
        boxSizing: 'border-box',
        '&::placeholder': {
          color: theme.palette.secondary.main,
        },
        '&:focus': {
          boxShadow: 'none',
        },
      },

      '& .inputSmall': {
        height: theme.spacing(3.75),
        '& .MuiSvgIcon-fontSizeSmall': {
          fontSize: theme.spacing(2),
        },
      },

      '& .inputMedium': {
        height: theme.spacing(4.75),
      },
    })
  );

export interface StyledExpandableSearchProps extends BoxProps {
  disabled?: boolean;
  direction?: 'left' | 'right';
  isOpen?: boolean;
}

export const StyledExpandableSearch: ComponentType<StyledExpandableSearchProps> =
  styled(Box)<StyledExpandableSearchProps>(
    ({ disabled, direction = 'left', isOpen = false, theme }) => ({
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      backgroundColor: 'transparent',

      '& .expandableSearchCont': {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid transparent',
        padding: theme.spacing(0, 1, 0, 0),
        transition: 'all 0.3s',

        ...(direction === 'right' && {
          justifyContent: 'flex-end',
        }),

        ...(isOpen && {
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.common.white,
          border: `1px solid ${theme.palette.primary.light}`,
          boxShadow: `0 1px 2px -1px ${alpha(
            theme.palette.common.black,
            0.08
          )}, 0 -3px 9px 0 ${alpha(theme.palette.common.black, 0.04)} inset`,
          flex: 1,
        }),
      },

      '& .expandableSearchWrap': {
        display: 'flex',
        overflow: 'hidden',
        maxWidth: 0,
        transition: 'all 0.3s',
      },

      '& .expandableSearchWrapShow': {
        maxWidth: '100%',
        flexGrow: 1,
      },
    })
  );

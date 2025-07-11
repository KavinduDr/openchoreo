import { alpha, Box, BoxProps, styled } from '@mui/material';
import { ComponentType } from 'react';

export interface StyledRadioCardProps extends BoxProps {
  disabled?: boolean;
}

export const StyledRadioCard: ComponentType<StyledRadioCardProps> = styled(
  Box
)<StyledRadioCardProps>(({ theme }) => ({
  '& .radioCard': {
    position: 'relative',
    height: '100%',
    width: '100%',
  },

  '&[data-radioLabelRoot="true"]': {
    height: '100%',
    overflow: 'hidden',
    display: 'block',
    margin: theme.spacing(0),
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.common.white,
    boxShadow: `0 0 0 1px ${theme.palette.grey[100]}, 0 1px 1px  ${theme.palette.grey[200]}`,
    borderRadius: theme.spacing(1),
    transition: 'all 0.3s',
    '&:hover': {
      boxShadow: `0 0 0 1px ${theme.palette.grey[200]}, 0 1px 1px ${theme.palette.grey[200]}`,
    },
    '&:has(input[type=radio]:checked)': {
      backgroundColor: alpha(theme.palette.primary.main, 0.01),
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
    '& .MuiFormControlLabel-label': {
      width: '100%',
      maxWidth: '100%',
    },
  },
  '&[data-radioLabelRootActive="true"]': {
    backgroundColor: alpha(theme.palette.primary.main, 0.01),
    boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
  },
  '&[data-radioLabelDisabled="true"]': {
    boxShadow: `0 0 0 1px ${theme.palette.grey[100]}, 0 1px 1px  ${theme.palette.grey[200]}`,
    '&:hover': {
      boxShadow: `0 0 0 1px ${theme.palette.grey[100]}, 0 1px 1px  ${theme.palette.grey[200]}`,
    },
  },
  '&[data-radioCardContent="true"]': {
    display: 'flex',
    gap: theme.spacing(2),
  },
  '&[data-radioCardContentCenter="true"]': {
    alignItems: 'center',
  },
  '&[data-radioCardContentTop="true"]': {
    alignItems: 'flex-start',
  },
  '&[data-radioCardDetail="true"]': {
    alignSelf: 'center',
    textAlign: 'left',
    flexGrow: 1,
    maxWidth: '100%',
  },
  '&[data-radioCardDetailWithIcon="true"]': {
    flex: `0 0 calc( 100% - ${theme.spacing(8)}px )`,
    maxWidth: `calc( 100% - ${theme.spacing(8)}px )`,
  },
  '& .radioCardTitle': {
    flexGrow: 1,
  },
  '& .radioCardActions': {
    marginLeft: theme.spacing(1),
  },
  '& .radioCardIcon': {
    display: 'flex',
    maxWidth: theme.spacing(6),
  },
  '&[data-radioIndicator="true"]': {
    position: 'absolute',
    right: theme.spacing(1),
    display: 'none',
    alignItems: 'center',
  },
  '&[data-radioIndicatorVisible="true"]': {
    display: 'flex',
  },
  '&[data-radioIndicatorCenter="true"]': {
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&[data-radioIndicatorTop="true"]': {
    top: 0,
  },
  '&[data-radioLabelRootIndicator="true"]': {
    paddingRight: theme.spacing(6),
  },
  '& .radioDetailContent': {
    marginTop: theme.spacing(1),
  },
  '&[data-checkboxIndicator="true"]': {
    position: 'absolute',
    right: theme.spacing(1),
    display: 'none',
    alignItems: 'center',
  },
  '&[data-checkboxIndicatorVisible="true"]': {
    display: 'flex',
  },
  '&[data-checkboxIndicatorCenter="true"]': {
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&[data-checkboxIndicatorTop="true"]': {
    top: 0,
  },
}));

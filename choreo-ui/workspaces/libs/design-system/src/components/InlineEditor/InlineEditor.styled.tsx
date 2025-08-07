import { Box, BoxProps, styled } from '@mui/material';
import { ComponentType } from 'react';

export interface StyledInlineEditorProps {
  disabled?: boolean;
  buttonAlign: 'bottom' | 'right';
}

export const StyledInlineEditor: ComponentType<
  StyledInlineEditorProps & BoxProps
> = styled(Box)<BoxProps & StyledInlineEditorProps>(({ disabled, theme }) => ({
  '& .inlineEditContainer': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  '& .inlineEditor': {
    padding: 0,
  },
  '& .editContainer': {
    display: 'flex',
    flexDirection: (props: StyledInlineEditorProps) =>
      props.buttonAlign === 'right' ? 'row' : 'column',
    alignItems: (props: StyledInlineEditorProps) =>
      props.buttonAlign === 'right' ? 'center' : 'flex-end',
  },
  '& .iconButtonRight': {
    display: 'flex',
    marginLeft: theme.spacing(1),
    gap: theme.spacing(1),
  },
  '& .iconButtonBottom': {
    display: 'flex',
    marginTop: theme.spacing(1),
    justifyContent: 'flex-end',
    gap: theme.spacing(1),
  },
}));

import React, { useState } from 'react';
import { StyledInlineEditor } from './InlineEditor.styled';
import { Box, ButtonProps } from '@mui/material';
import EditPen from '@design-system/Icons/generated/EditPen';
import { Button } from '../Button';
import { TextInput } from '../TextInput';
import { IconButton } from '../IconButton';
import Tick from '@design-system/Icons/generated/Tick';
import Close from '@design-system/Icons/generated/Close';

export interface InlineEditorProps extends Omit<ButtonProps, 'color'> {
  value: string;
  onSave: (value: string) => void;
  onEdit?: () => void;
  testId: string;
  size?: 'small' | 'medium';
  buttonAlign?: 'bottom' | 'right';
  color?: 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info';
}

/**
 * InlineEditor component
 * @component
 */
export const InlineEditor = React.forwardRef<HTMLDivElement, InlineEditorProps>(
  (
    {
      value,
      onSave,
      testId,
      size = 'medium',
      buttonAlign = 'right',
      onEdit,
      ...rest
    },
    _ref
  ) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    const handleEditClick = () => {
      if (onEdit) {
        onEdit();
      }
      setIsEditing(true);
    };

    const handleSaveClick = () => {
      setIsEditing(false);
      onSave(tempValue);
    };

    const handleCancelClick = () => {
      setIsEditing(false);
      setTempValue(value);
    };

    return (
      <StyledInlineEditor
        className="inlineEditContainer"
        buttonAlign={buttonAlign}
      >
        {!isEditing ? (
          <Box>
            <Button
              variant="link"
              size={size}
              testId={`${testId}-button`}
              {...rest}
              onClick={handleEditClick}
              endIcon={<EditPen />}
              className="inlineEditor"
            >
              {value}
            </Button>
          </Box>
        ) : (
          <Box className="editContainer">
            <TextInput
              testId={`${testId}-value`}
              value={tempValue}
              onChange={(value) => setTempValue(value)}
              size={size}
            />
            <Box
              className={`iconButton${buttonAlign === 'right' ? 'Right' : 'Bottom'}`}
            >
              <IconButton
                size={size}
                variant="subtle"
                onClick={handleSaveClick}
                color="primary"
                testId={`${testId}-save`}
              >
                <Tick fontSize="inherit" />
              </IconButton>
              <IconButton
                size={size}
                variant="subtle"
                color="error"
                onClick={handleCancelClick}
                testId={`${testId}-close`}
              >
                <Close fontSize="inherit" />
              </IconButton>
            </Box>
          </Box>
        )}
      </StyledInlineEditor>
    );
  }
);

InlineEditor.displayName = 'InlineEditor';

export default InlineEditor;

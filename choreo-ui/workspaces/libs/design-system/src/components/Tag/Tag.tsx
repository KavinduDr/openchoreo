import React from 'react';
import { StyledTag } from './Tag.styled';
import { Close } from '@mui/icons-material';

export type colorVariant =
  | 'primary'
  | 'default'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

export type tagVariant = 'filled' | 'outlined' | 'text';

export type tagSize = 'small' | 'medium' | 'large';

export interface TagProps {
  /**
   * The content of the component
   */
  children?: React.ReactNode;
  /**
   * Additional className for the component
   */
  className?: string;
  /**
   * If true, the component will be disabled
   */
  disabled?: boolean;
  /**
   * The color variant of the tag
   */
  color?: colorVariant;
  /**
   * The variant of the tag
   */
  variant?: tagVariant;
  /**
   * The size of the tag
   */
  size?: tagSize;
  testId: string;
  /**
   * The sx prop for custom styles
   */
  sx?: React.CSSProperties;
  /**
   * If true, the tag is read-only and cannot be deleted
   */
  readOnly?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ children, readOnly, size = 'medium', ...props }, ref) => {
    return (
      <StyledTag
        ref={ref}
        data-cyid={props.testId}
        disabled={props.disabled}
        data-size={size}
        className={props.className}
        label={children ? String(children) : undefined}
        deleteIcon={!readOnly ? <Close /> : undefined}
        onDelete={!readOnly ? props.onClick : undefined}
      />
    );
  }
);
Tag.displayName = 'Tag';

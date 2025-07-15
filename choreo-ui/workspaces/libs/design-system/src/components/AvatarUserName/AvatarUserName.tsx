import React from 'react';
import { StyledAvatarUserName } from './AvatarUserName.styled';
import { Avatar } from '../Avatar/Avatar';
import { Typography } from '@mui/material';

export interface AvatarUserNameProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  disabled?: boolean;
  username?: string | 'John Doe';
  hideUsername?: boolean;
  sx?: React.CSSProperties;
}

/**
 * AvatarUserName component
 * @component
 */
export const AvatarUserName = React.forwardRef<
  HTMLDivElement,
  AvatarUserNameProps
>(({ children, className, onClick, disabled = false, ...props }, ref) => {
  return (
    <StyledAvatarUserName
      ref={ref}
      className={className}
      disabled={disabled}
      {...props}
    >
      {disabled ? (
        <>
          <Avatar disabled={true}>{children}</Avatar>
          {!props.hideUsername && props.username && (
            <Typography component="span">{props.username}</Typography>
          )}
        </>
      ) : (
        <>
          <Avatar>{children}</Avatar>
          {!props.hideUsername && props.username && (
            <Typography component="span">{props.username}</Typography>
          )}
        </>
      )}
    </StyledAvatarUserName>
  );
});

AvatarUserName.displayName = 'AvatarUserName';

import React from 'react';
import { AvatarProps, StyledAvatar } from './Avatar.styled';

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ children, testId, ...props }, ref) => {
    return (
      <StyledAvatar
        data-cyid={`${testId}-avatar`}
        ref={ref}
        testId={testId}
        {...props}
      >
        {children}
      </StyledAvatar>
    );
  }
);

Avatar.displayName = 'Avatar';

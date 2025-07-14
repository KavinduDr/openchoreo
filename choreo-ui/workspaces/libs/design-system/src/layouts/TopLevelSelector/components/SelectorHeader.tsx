import React from 'react';
import { Box, Typography } from '@mui/material';
import { CloseIcon } from '@design-system/Icons';
import { IconButton } from '@design-system/components';
import { getLevelLabel, Level } from '../utils';

interface SelectorHeaderProps {
    level: Level;
    onClose?: () => void;
}

/**
 * Header component for the TopLevelSelector showing the level label and close button
 */
export const SelectorHeader: React.FC<SelectorHeaderProps> = ({ level, onClose }) => (
    <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexGrow={1}
    >
        <Typography variant="h6" fontSize={11} color="text.secondary">
            {getLevelLabel(level)}
        </Typography>
        {onClose && (
            <IconButton
                size="tiny"
                color="secondary"
                disableRipple
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    onClose?.();
                }}
                aria-label="Close selector"
            >
                <CloseIcon fontSize="inherit" />
            </IconButton>
        )}
    </Box>
); 
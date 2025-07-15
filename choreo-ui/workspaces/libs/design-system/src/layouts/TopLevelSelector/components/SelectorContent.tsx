import React from 'react';
import { Box, Typography } from '@mui/material';
import { ChevronDownIcon } from '@design-system/Icons';
import { IconButton } from '@design-system/components';
import { LevelItem } from '../utils';

interface SelectorContentProps {
  selectedItem: LevelItem;
  onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disableMenu?: boolean;
}

/**
 * Content component for the TopLevelSelector showing the selected item and dropdown button
 */
export const SelectorContent: React.FC<SelectorContentProps> = ({
  selectedItem,
  onOpen,
  disableMenu = false,
}) => (
  <Box display="flex" alignItems="center" gap={1} marginRight={5}>
    <Typography variant="h6">{selectedItem.label}</Typography>
    {!disableMenu && (
      <IconButton
        testId="selector-dropdown"
        size="tiny"
        disableRipple
        onClick={onOpen}
        aria-label="Open selector menu"
      >
        <ChevronDownIcon />
      </IconButton>
    )}
  </Box>
);

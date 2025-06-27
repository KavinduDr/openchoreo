import React, { useState } from 'react';
import {
  StyledPopover,
  StyledTopLevelSelector,
} from './TopLevelSelector.styled';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { AddIcon, ChevronDownIcon, CloseIcon } from '@design-system/Icons';
import { Button } from '../../components/Button';
import { IconButton, SearchBar } from '@design-system/components';

export enum Level {
  ORGANIZATION = 'organization',
  PROJECT = 'project',
  COMPONENT = 'component',
}

export interface LevelItem {
  label: string;
  id: string;
}

export interface TopLevelSelectorProps {
  className?: string;
  items: LevelItem[];
  recentItems: LevelItem[];
  selectedItem: LevelItem;
  level: Level;
  isHighlighted?: boolean;
  disabled?: boolean;
  onSelect: (item: LevelItem) => void;
  onClick?: (level: Level) => void;
  onClose?: () => void;
}

const getLevelLabel = (level: Level) => {
  switch (level) {
    case Level.ORGANIZATION:
      return 'Organization';
    case Level.PROJECT:
      return 'Project';
    case Level.COMPONENT:
      return 'Component';
  }
};

/**
 * TopLevelSelector component
 * @component
 */
export const TopLevelSelector = React.forwardRef<
  HTMLDivElement,
  TopLevelSelectorProps
>(
  (
    {
      items,
      selectedItem,
      onSelect,
      isHighlighted,
      disabled,
      onClick,
      level,
      recentItems = [],
      onClose,
    },
    ref
  ) => {
    const [search, setSearch] = useState('');
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = () => {
      if (!disabled) {
        onClick?.(level);
      }
    };

    const handleSelect = (item: LevelItem) => {
      if (!disabled) {
        onSelect(item);
      }
    };

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
      onClose?.();
    };

    return (
      <StyledTopLevelSelector
        ref={ref}
        onClick={handleClick}
        disabled={disabled}
        variant="outlined"
        isHighlighted={isHighlighted}
      >
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexGrow={1}
          >
            <Typography variant="body2" fontSize={11} color="text.secondary">
              {getLevelLabel(level)}
            </Typography>
            <IconButton
              size="tiny"
              color="secondary"
              disableRipple
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" gap={1} marginRight={5}>
            <Typography
              variant="body1"
              fontSize={14}
              fontWeight={450}
              color="text.primary"
            >
              Sample Project
            </Typography>
            <IconButton size="tiny" disableRipple onClick={handleOpen}>
              <ChevronDownIcon />
            </IconButton>
          </Box>
        </Box>
        <StyledPopover
          id={`${level}-popover`}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box display="flex" flexDirection="column" gap={1} p={1}>
            <SearchBar
              inputValue={search}
              onChange={(value) => setSearch(value)}
              testId="top-level-selector-search"
              placeholder="Search"
              // startIcon={<SearchIcon fontSize="inherit" />}
            />
            <Box display="flex" gap={1}>
              <Button variant="text" startIcon={<AddIcon fontSize="inherit" />}>
                Create Component
              </Button>
            </Box>
            {recentItems && recentItems.length > 0 && (
              <>
                <Divider />
                <Box display="flex" flexDirection="column">
                  <Typography variant="body2" color="text.secondary">
                    Recent
                  </Typography>
                  <List>
                    {recentItems.map((item) => (
                      <ListItem disablePadding key={item.id}>
                        <ListItemButton
                          onClick={() => handleSelect(item)}
                          selected={item.id === selectedItem.id}
                        >
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </>
            )}
            {items && items.length > 0 && (
              <>
                <Divider />
                <Box display="flex" flexDirection="column">
                  <Typography variant="body2" color="text.secondary">
                    All {getLevelLabel(level)}s
                  </Typography>
                  <List>
                    {items.map((item) => (
                      <ListItem disablePadding key={item.id}>
                        <ListItemButton
                          onClick={() => handleSelect(item)}
                          selected={item.id === selectedItem.id}
                        >
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </>
            )}
          </Box>
        </StyledPopover>
      </StyledTopLevelSelector>
    );
  }
);

TopLevelSelector.displayName = 'TopLevelSelector';

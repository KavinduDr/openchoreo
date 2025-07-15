import React, { useMemo } from 'react';
import { Box, Divider } from '@mui/material';
import { AddIcon } from '@design-system/Icons';
import { Button, SearchBar } from '@design-system/components';
import { ItemList } from './ItemList';
import { LevelItem, Level, getLevelLabel } from '../utils';

interface PopoverContentProps {
    search: string;
    onSearchChange: (value: string) => void;
    recentItems: LevelItem[];
    items: LevelItem[];
    selectedItem: LevelItem;
    onSelect: (item: LevelItem) => void;
    onCreateNew?: () => void;
    level: Level;
}

/**
 * Content component for the TopLevelSelector popover containing search, create button, and item lists
 */
export const PopoverContent: React.FC<PopoverContentProps> = ({
    search,
    onSearchChange,
    recentItems,
    items,
    selectedItem,
    onSelect,
    onCreateNew,
    level,
}) => {
    const filteredItems = useMemo(() => {
        if (!search.trim()) return items;
        return items.filter((item) =>
            item.label.toLowerCase().includes(search.toLowerCase())
        );
    }, [items, search]);

    const filteredRecentItems = useMemo(() => {
        if (!search.trim()) return recentItems;
        return recentItems.filter((item) =>
            item.label.toLowerCase().includes(search.toLowerCase())
        );
    }, [recentItems, search]);

    return (
        <Box display="flex" flexDirection="column" gap={1} p={0.5}>
            <SearchBar
                inputValue={search}
                size="small"
                bordered
                onChange={onSearchChange}
                testId="top-level-selector-search"
                placeholder="Search"
            />
            {onCreateNew && (
                <Box display="flex" gap={1}>
                    <Button
                        variant="text"
                        startIcon={<AddIcon fontSize="inherit" />}
                        onClick={onCreateNew}
                        disableRipple
                    >
                        Create {getLevelLabel(level)}
                    </Button>
                </Box>
            )}
            {filteredRecentItems.length > 0 && (
                <>
                    <Divider />
                    <ItemList
                        title="Recent"
                        items={filteredRecentItems}
                        onSelect={onSelect}
                    />
                </>
            )}

            {filteredItems.length > 0 && (
                <>
                    <Divider />
                    <ItemList
                        title={`All ${getLevelLabel(level)}s`}
                        items={filteredItems}
                        selectedItemId={selectedItem.id}
                        onSelect={onSelect}
                    />
                </>
            )}
        </Box>
    );
}; 
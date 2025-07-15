import React, { useRef } from 'react';
import {
  StyledAutofocusField,
  StyledExpandableSearch,
} from './ExpandableSearch.styled';
import { Box, InputBase } from '@mui/material';
import { IconButton } from '@design-system/components/IconButton';
import Close from '@design-system/Icons/generated/Close';
import Search from '@design-system/Icons/generated/Search';
import clsx from 'clsx';

export interface AutofocusFieldProps {
  onChange: (data: any) => void;
  onClearClick: () => void;
  onBlur: (data: any) => void;
  searchQuery: string;
  inputReference: React.RefObject<HTMLInputElement | null>;
  size?: 'small' | 'medium';
  placeholder?: string;
  testId: string;
}

/**
 * SearchBar component
 * @component
 */
export const AutofocusField = React.forwardRef<
  HTMLDivElement,
  AutofocusFieldProps
>(({ ...props }, ref) => {
  return (
    <StyledAutofocusField
      ref={ref}
      size={props.size}
      onChange={props.onChange}
      onBlur={props.onBlur}
      className="search"
    >
      <InputBase
        inputRef={props.inputReference}
        value={props.searchQuery}
        endAdornment={
          props.searchQuery && (
            <IconButton
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => {
                props.onClearClick();
                e.preventDefault();
              }}
              color="secondary"
              size="tiny"
              data-testid="search-clear-icon"
              testId={`${props.testId}-clear`}
              textVariant="link"
            >
              <Close fontSize="inherit" />
            </IconButton>
          )
        }
        onChange={(e) => props.onChange(e.target.value)}
        onBlur={() => props.onBlur(props.searchQuery)}
        placeholder={props.placeholder || 'Search...'}
        className={`inputExpandable input${props.size ? props.size.charAt(0).toUpperCase() + props.size.slice(1) : ''}`}
        data-testid={props.testId}
        aria-label="text-field"
        data-cyid={`${props.testId}-search-field`}
        fullWidth
      />
    </StyledAutofocusField>
  );
});

AutofocusField.displayName = 'AutofocusField';

export interface ExpandableSearchProps {
  searchString: string;
  onChange: (value: string) => void;
  direction?: 'left' | 'right';
  placeholder?: string;
  testId: string;
  size?: 'small' | 'medium';
}

export const ExpandableSearch = React.forwardRef<
  HTMLDivElement,
  ExpandableSearchProps
>(({ ...props }, ref) => {
  const inputReference = useRef<HTMLInputElement>(null);
  const [isSearchShow, setSearchShow] = React.useState(false);

  const {
    searchString,
    onChange,
    direction = 'left',
    placeholder,
    testId,
    size = 'medium',
  } = props;

  const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSearchFieldBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value === '') {
      setSearchShow(false);
    }
  };

  const onClearClick = () => {
    if (searchString === '') {
      setSearchShow(false);
    } else {
      onChange('');
    }
    inputReference?.current?.focus();
  };

  const onSearchClick = () => {
    setSearchShow(true);
    setTimeout(() => {
      inputReference?.current?.focus();
    }, 100);
  };

  return (
    <StyledExpandableSearch
      ref={ref}
      data-cyid={`${testId}-expandable-search`}
      direction={direction}
      isOpen={isSearchShow}
    >
      <Box
        className={clsx(
          'expandableSearchCont',
          {
            'expandableSearchContOpen': isSearchShow,
            'expandableSearchCont': !isSearchShow,
          }
        )}
      >
        {(direction === 'left' || (direction === 'right' && isSearchShow)) && (
          <IconButton
            onClick={onSearchClick}
            size="small"
            data-testid="search-icon"
            testId="search-icon"
            color="secondary"
            textVariant="text"
            disabled={isSearchShow}
            className="searchIconButton"
          >
            <Search fontSize="inherit" />
          </IconButton>
        )}

        <Box
          className={clsx(
            'expandableSearchWrap',
            {
              'expandableSearchWrapShow': isSearchShow,
            }
          )}
        >
          <InputBase
            inputRef={inputReference}
            value={searchString}
            onChange={handleSearchFieldChange}
            onBlur={handleSearchFieldBlur}
            size={size === 'small' ? 'small' : 'medium'}
            placeholder={placeholder || 'Search...'}
            className={`inputExpandable input${size ? size.charAt(0).toUpperCase() + size.slice(1) : ''}`}
            data-testid={`${testId}-search-input`}
            aria-label="text-field"
            data-cyid={`${testId}-search-field`}
            fullWidth
            endAdornment={
              (isSearchShow || searchString) && (
                <IconButton
                  onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => {
                    onClearClick();
                    e.preventDefault();
                  }}
                  color="secondary"
                  size="tiny"
                  data-testid="search-clear-icon"
                  testId={`${testId}-clear`}
                  textVariant="link"
                  className="clearIconButton"
                >
                  <Close fontSize="inherit" />
                </IconButton>
              )
            }
          />
        </Box>

        {direction === 'right' && !isSearchShow && (
          <IconButton
            onClick={onSearchClick}
            size="small"
            data-testid="search-icon"
            testId="search-icon"
            color="secondary"
            textVariant="text"
            disabled={isSearchShow}
            className="searchIconButton"
          >
            <Search fontSize="inherit" />
          </IconButton>
        )}
      </Box>
    </StyledExpandableSearch>
  );
});

ExpandableSearch.displayName = 'ExpandableSearch';

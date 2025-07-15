import { Box, Tooltip, Typography } from '@mui/material';
import { StyledTableToolbar } from './TableToolBar.styled';
import { IconButton } from '@design-system/components/IconButton';
import Delete from '@design-system/Icons/generated/Delete';
import Filters from '@design-system/Icons/generated/Filters';

export interface TableToolbarProps {
  numSelected: number;
}

export const TableToolbar: React.FC<TableToolbarProps> = ({ numSelected }) => {
  return (
    <StyledTableToolbar>
      <Box display="flex" alignItems="center" gap={2}>
        {numSelected > 0 ? (
          <>
            <Typography color="inherit" variant="h5" component="h5">
              {numSelected} selected
            </Typography>
            <Tooltip title="Delete">
              <IconButton
                color="secondary"
                textVariant="link"
                aria-label="delete"
                testId="delete"
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Typography variant="h5" component="h5">
            Nutrition
          </Typography>
        )}
      </Box>

      {numSelected === 0 && (
        <Box>
          <Tooltip title="Filter list">
            <IconButton
              color="secondary"
              textVariant="link"
              aria-label="filter list"
              testId="filters"
            >
              <Filters />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </StyledTableToolbar>
  );
};

TableToolbar.displayName = 'TableToolbar';

import {
  Avatar,
  Box,
  Button,
  DataTable,
  DeleteIcon,
  IconButton,
  RefreshIcon,
  Rotate,
  TimeIcon,
  Typography,
  useChoreoTheme,
} from '@open-choreo/design-system';
import { DataTableColumn } from '@open-choreo/design-system/dist/components/DataTable/DataTable';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

export interface ResourceTableItem {
  id: string;
  name: string;
  description: string;
  type: string;
  lastUpdated: Date;
  href?: string;
}

export type ResourceKind = 'project' | 'component' | 'organization';

export interface ResourceTableProps {
  resources: ResourceTableItem[];
  onDeleteMember?: (id: string, name: string) => void;
  resourceKind: ResourceKind;
  enableAvatar?: boolean;
  onRefresh?: () => void;
  isLoading?: boolean;
  actions?: React.ReactNode;
}


export function ResourceTable(props: ResourceTableProps) {
  const { resources, onDeleteMember, resourceKind, enableAvatar, onRefresh, isLoading, actions } = props;
  const theme = useChoreoTheme();
  const navigate = useNavigate();
  const intl = useIntl();

  const DeleteBtn = ({ onClick }: { onClick: (event: React.MouseEvent<HTMLButtonElement>) => void }) => (
    <Button
      color="error"
      onClick={onClick}
      size="small"
      variant="outlined"
      testId="delete-button"
    >
      <DeleteIcon fontSize="small" />
      Delete
    </Button>
  );

  const handleResourceClick = (resource: ResourceTableItem) => {
    navigate(resource.href || '');
  };

  const getResourceKindDisplayName = useCallback((resourceKind: ResourceKind) => {
    switch (resourceKind) {
      case 'project':
        return intl.formatMessage({ id: "resourceTable.title.project", defaultMessage: "Projects" });
      case 'component':
        return intl.formatMessage({ id: "resourceTable.title.component", defaultMessage: "Components" });
      case 'organization':
        return intl.formatMessage({ id: "resourceTable.title.organization", defaultMessage: "Organizations" });
      default:
        return intl.formatMessage({ id: "resourceTable.title.resource", defaultMessage: "Resources" });
    }
  }, [resourceKind]);

  const resourceListTitle = useMemo(() => {
    switch (resourceKind) {
      case 'project':
        return intl.formatMessage({ id: "resourceTable.title.project", defaultMessage: "Project Listing" });
      case 'component':
        return intl.formatMessage({ id: "resourceTable.title.component", defaultMessage: "Component Listing" });
      case 'organization':
        return intl.formatMessage({ id: "resourceTable.title.organization", defaultMessage: "Organization Listing" });
      default:
        return intl.formatMessage({ id: "resourceTable.title.resource", defaultMessage: "Resource Listing" });
    }
  }, [resourceKind]);

  const resourceListColumns: DataTableColumn<ResourceTableItem>[] = useMemo(() => [
    {
      title: getResourceKindDisplayName(resourceKind),
      field: 'name',
      width: '25%',
      render: (rowData: ResourceTableItem) => {
        const { id, name } = rowData;
        return (
          <Box display="flex" alignItems="center" gap={8} key={id}>
            {enableAvatar && (
              <Avatar>
                {name.charAt(0).toUpperCase()}
              </Avatar>
            )}
            <Typography variant="body1" color="text.primary">{name}</Typography>
          </Box>
        );
      },
    },
    {
      title: intl.formatMessage({ id: "resourceTable.title.description", defaultMessage: "Description" }),
      field: 'description',
      width: '25%',
      render: (rowData: ResourceTableItem) => {
        const { description } = rowData;
        return (
          <Typography variant="body1" color="text.primary">{description}</Typography>
        );
      },
    },
    {
      title: intl.formatMessage({ id: "resourceTable.title.type", defaultMessage: "Type" }),
      field: 'type',
      width: '25%',
      render: (rowData: ResourceTableItem) => {
        const { type } = rowData;
        return (
          <Typography variant="body1" color="text.primary">{type}</Typography>
        );
      },
    },
    {
      title: intl.formatMessage({ id: "resourceTable.title.lastUpdated", defaultMessage: "Last Updated" }),
      field: 'lastUpdated',
      align: 'right',
      width: '25%',
      render: (rowData: ResourceTableItem, isHover: boolean) =>
      (
        <Box display="flex" alignItems="center" gap={8} key={rowData.id}>
          {
            isHover && rowData?.id && onDeleteMember ? (
              <DeleteBtn
                onClick={(event) => {
                  event.stopPropagation();
                  onDeleteMember(rowData?.id, rowData?.name);
                }}
              />
            ) :
              (
                <>
                  <TimeIcon fontSize="inherit" color='secondary' />
                  <Typography variant="body1" color="text.primary">{dayjs(rowData.lastUpdated).format('DD/MM/YYYY HH:mm')}</Typography>
                </>
              )
          }
        </Box>
      ),
    },
  ], [resourceKind, enableAvatar, onDeleteMember, getResourceKindDisplayName]);

  return (
    <Box display='flex' flexDirection='column' gap={theme.spacing(1)}>
      <DataTable<ResourceTableItem>
        actions={actions}
        enableFrontendSearch
        getRowId={(rowData) => rowData.id}
        columns={resourceListColumns}
        testId="table"
        variant="white"
        isLoading={!!isLoading}
        data={resources}
        totalRows={resources.length}
        tableTitle={resourceListTitle}
        titleActions={
          <Box display="flex" alignItems="center" gap={theme.spacing(1)}>
            {onRefresh && (
              <IconButton onClick={onRefresh} size="small" variant="outlined" color="primary"  >
                <Rotate disabled={!isLoading}>
                  <RefreshIcon color='primary' />
                </Rotate>
              </IconButton>
            )}
          </Box>
        }
        onRowClick={handleResourceClick}
      />
    </Box>
  );
}

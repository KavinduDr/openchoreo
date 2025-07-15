import { getResourceDescription, getResourceDisplayName, Resource } from '@open-choreo/definitions';
import {
  ArrowLeftLongIcon,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  RefreshIcon,
  Rotate,
  Typography,
  useChoreoTheme,
} from '@open-choreo/design-system';
import { FormattedMessage } from 'react-intl';

export interface ResourcePageLayoutProps {
  resource: Resource;
  testId: string;
  children: React.ReactNode;
  backUrl?: string;
  backButtonText?: string;
  isRefreshing?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
}

export function ResourcePageLayout(props: ResourcePageLayoutProps) {
  const { resource, testId, children, backUrl, backButtonText, isRefreshing, onRefresh } = props;
  const theme = useChoreoTheme();

  const resourceDisplayName = getResourceDisplayName(resource);
  const resourceDescription = getResourceDescription(resource);
  const resourceDisplayNameFirstLetter = resourceDisplayName.charAt(0).toUpperCase();

  return (
    <Box
      testId={`page-layout-${testId}`}
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
      flexDirection="column"
      gap={2}
      backgroundColor={theme.pallet.background.default}
      padding={theme.spacing(4, 6)}
      color={theme.pallet.text.primary}
    >
      {backUrl && (
        <Button
          variant="link"
          href={backUrl}
          startIcon={<ArrowLeftLongIcon />}
          testId={`page-layout-back-button-${testId}`}
        >
          {backButtonText ?? 'Back to previous page'}
        </Button>
      )}
      <Box
        display="flex"
        flexDirection="column"
        gap={16}
        flexGrow={1}
        width="100%"
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <Box display="flex" alignItems="flex-start" gap={theme.spacing(2)}>
              <Avatar width={theme.spacing(10)} height={theme.spacing(10)} variant='circular' color='primary' sx={{fontSize: theme.spacing(4)}}>
                {resourceDisplayNameFirstLetter}
              </Avatar>
              <Box display="flex" flexDirection="column" gap={theme.spacing(0.25)} padding={theme.spacing(1, 0.5)}>
                <Box display="flex" alignItems="center" gap={theme.spacing(0.5)}>
                  <Typography variant="h2">{resourceDisplayName}</Typography>
                  {onRefresh && (
                  <IconButton testId={`page-layout-refresh-button-${testId}`} size='small' onClick={onRefresh}>
                    <Rotate disabled={!isRefreshing} color={theme.pallet.primary.main}>
                        <RefreshIcon fontSize='small' />
                      </Rotate>
                    </IconButton>
                  )}
                </Box>
                <Typography variant="body1">{resourceDescription ? resourceDescription : <FormattedMessage id="resource-page-layout.no-description" defaultMessage="No description provided." />}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" gap={theme.spacing(2)} padding={theme.spacing(1, 0)}>
          <Divider />
          {children}
        </Box>
      </Box>
    </Box>
  );
}

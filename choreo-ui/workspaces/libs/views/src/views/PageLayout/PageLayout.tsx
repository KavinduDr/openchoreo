import {
  ArrowLeftLongIcon,
  Box,
  Button,
  Typography,
  useChoreoTheme,
} from '@open-choreo/design-system';

export interface PageLayoutProps {
  testId: string;
  children: React.ReactNode;
  title: string;
  description?: string;
  backUrl?: string;
  backButtonText?: string;
}

export function PageLayout({
  testId,
  children,
  title,
  description,
  backUrl,
  backButtonText,
}: PageLayoutProps) {
  const theme = useChoreoTheme();

  return (
    <Box
      testId={`page-layout-${testId}`}
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
      flexDirection="column"
      gap={2}
      backgroundColor={theme.pallet.background.default}
      padding={theme.spacing(2)}
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
          <Typography variant="h2">{title}</Typography>
          {description && (
            <Typography variant="body1">{description}</Typography>
          )}
        </Box>
        {children}
      </Box>
    </Box>
  );
}

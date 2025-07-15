import {
  Box,
  Image404NotFound,
  ImageConsoleError,
  ImageDefaultError,
  Typography,
  useChoreoTheme,
} from '@open-choreo/design-system';
import { FormattedMessage } from 'react-intl';

export interface ErrorPageProps {
  image: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function ErrorPage(props: ErrorPageProps) {
  const { image, title, description } = props;
  const theme = useChoreoTheme();
  return (
    <Box
      padding={theme.spacing(8)}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={theme.spacing(4)}
      height="50vh"
    >
      {image}
      <Typography variant="h2">{title}</Typography>
      <Typography variant="body1" color={theme.pallet.text.secondary}>
        {description}
      </Typography>
    </Box>
  );
}

export interface PresetErrorPageProps {
  preset: 'default' | '404' | '500';
}

function getTitle(code: 'default' | '404' | '500') {
  switch (code) {
    case 'default':
      return <FormattedMessage id="views.errorPage.default.title" defaultMessage="Something went wrong" />;
    case '404':
      return <FormattedMessage id="views.errorPage.404.title" defaultMessage="Page not found" />;
    case '500':
      return <FormattedMessage id="views.errorPage.500.title" defaultMessage="Server error" />;
  }
}

function getDescription(code: 'default' | '404' | '500') {
  switch (code) {
    case 'default':
      return <FormattedMessage id="views.errorPage.default.description" defaultMessage="An unexpected error occurred. Please try again later." />;
    case '404':
      return <FormattedMessage id="views.errorPage.404.description" defaultMessage="The page you are looking for does not exist." />;
    case '500':
      return <FormattedMessage id="views.errorPage.500.description" defaultMessage="We are experiencing technical difficulties. Please try again in a few minutes." />;
  }
}

function getImage(code: 'default' | '404' | '500') {
  switch (code) {
    case 'default':
      return <ImageDefaultError />;
    case '404':
      return <Image404NotFound />;
    case '500':
      return <ImageConsoleError />;
  }
}

export function PresetErrorPage(props: PresetErrorPageProps) {
  const { preset } = props;
  return (
    <ErrorPage
      description={getDescription(preset)}
      title={getTitle(preset)}
      image={getImage(preset)}
    />
  );
}

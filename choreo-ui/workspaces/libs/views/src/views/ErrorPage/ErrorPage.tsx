import {
  Box,
  Image404NotFound,
  ImageConsoleError,
  ImageDefaultError,
  Typography,
  useChoreoTheme,
} from '@open-choreo/design-system';

export interface ErrorPageProps {
  image: React.ReactNode;
  title: string;
  description: string;
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
      return 'Something went wrong';
    case '404':
      return 'Page not found';
    case '500':
      return 'Server error';
  }
}

function getDescription(code: 'default' | '404' | '500') {
  switch (code) {
    case 'default':
      return 'An unexpected error occurred. Please try again later.';
    case '404':
      return 'The page you are looking for does not exist.';
    case '500':
      return 'We are experiencing technical difficulties. Please try again in a few minutes.';
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

import { Box, ImageBuilding } from '@open-choreo/design-system';

interface FullPageLoaderProps {
  relative?: boolean;
}

export function FullPageLoader(props: FullPageLoaderProps) {
  const { relative = false } = props;
  return (
    <Box
      testId="full-page-loader"
      display='flex'
      alignItems='center'
      justifyContent='center'
      width='100%'
      height='100vh'
      position={relative ? 'relative' : 'absolute'}
    >
      <ImageBuilding />
    </Box>
  );
}

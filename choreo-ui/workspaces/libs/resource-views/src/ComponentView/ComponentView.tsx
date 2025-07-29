import {
  Box,
  Card,
  CardContent,
  CardHeading,
  Typography,
} from '@open-choreo/design-system';

export interface ComponentviewProps {
  name: string;
  description: string;
  orgName: string;
  version: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export function ComponentView(props: ComponentviewProps) {
  return (
    <Card testId="componentview">
      <CardHeading title={props.name} testId="componentview" />
      <CardContent>
        <Box>
          <Typography variant="body1">{props.description}</Typography>
        </Box>
        <Box>
          <Typography variant="body1">{props.orgName}</Typography>
        </Box>
        <Box>
          <Typography variant="body1">{props.version}</Typography>
        </Box>
        <Box>
          <Typography variant="body1">{props.type}</Typography>
        </Box>
        <Box>
          <Typography variant="body1">{props.createdAt}</Typography>
        </Box>
        <Box>
          <Typography variant="body1">{props.updatedAt}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

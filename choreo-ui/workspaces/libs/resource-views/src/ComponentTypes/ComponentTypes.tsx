import {
  Box,
  Card,
  CardContent,
  ImageNode,
  ImageReact,
  TableCell,
  TableRow,
  Typography,
} from '@open-choreo/design-system';

export interface ComponentProps {
  type: string;
  webAppType: string;
}

export interface ComponentListProps {
  heading?: string;
  components?: ComponentProps[];
}

function getIcon(webAppType: string) {
  switch (webAppType) {
    case 'react':
      return (
        <Box
          width="20px"
          height="20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ImageReact fontSize="small" />
        </Box>
      );
    case 'nodejs':
      return (
        <Box
          width="20px"
          height="20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ImageNode fontSize="small" />
        </Box>
      );
    default:
      return null;
  }
}

export function ComponentTypes(props: ComponentListProps) {
  const { heading, components = [] } = props;

  // Group by type and webAppType
  const grouped = components.reduce<
    Record<string, { type: string; webAppType: string; count: number }>
  >((acc, comp) => {
    const key = `${comp.type}|${comp.webAppType}`;
    if (!acc[key]) {
      acc[key] = { ...comp, count: 0 };
    }
    acc[key].count += 1;
    return acc;
  }, {});

  const rows = Object.values(grouped);
  const total = rows.reduce((sum, row) => sum + row.count, 0);

  return (
    <Card testId="componenttypes">
      <CardContent>
        {heading && <Typography variant="h4">{heading}</Typography>}
        <Box>
          {rows.map((row) => (
            <TableRow key={row.type + row.webAppType} disableHover={true}>
              <TableCell align="left">
                <Typography variant="body1">{row.type}</Typography>
              </TableCell>
              <TableCell align="center">{getIcon(row.webAppType)}</TableCell>
              <TableCell align="right">
                <Typography variant="body1">{row.count}</Typography>
              </TableCell>
            </TableRow>
          ))}
          <TableRow disableHover={true}>
            <TableCell align="left">
              <Typography variant="h5">Total</Typography>
            </TableCell>
            <TableCell />
            <TableCell align="right">
              <Typography variant="h5">{total}</Typography>
            </TableCell>
          </TableRow>
        </Box>
      </CardContent>
    </Card>
  );
}

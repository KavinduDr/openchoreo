import {
  Box,
  Card,
  Typography,
  NoDataMessage,
  useChoreoTheme,
  alpha,
  ImageProjectHome,
  TimeIcon,
  CardActionArea,
} from '@open-choreo/design-system';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export interface Resource {
  id: string;
  name: string;
  description: string;
  type: string;
  lastUpdated: string;
  href?: string;
}

export interface ResourceListProps {
  resources?: Resource[];
  cardWidth?: string | number;
}

export function ResourceList(props: ResourceListProps) {
  const { resources = [], cardWidth = 330 } = props;
  const navigate = useNavigate();
  const theme = useChoreoTheme();

  const handleResourceClick = (resource: Resource) => {
    navigate(resource.href || '');
  };

  if (resources?.length === 0) {
    return <NoDataMessage />;
  }

  return (
    <Box padding={2} display="flex" flexDirection="row" flexWrap="wrap" gap={10}>
      {(
        resources?.map((resource) => (
          <Box width={cardWidth}>
            <Card
              key={resource.id}
              testId={resource.id}
              boxShadow='dark'
              onClick={() => handleResourceClick(resource)}
            >
              <CardActionArea testId={`${resource.id}-card-action-area`}>
                <Box
                  display="flex"
                  justifyContent='flex-start'
                  gap={theme.spacing(1)}
                  alignItems='center'
                  padding={theme.spacing(3, 3, 0, 3)}
                  width='100%'
                  height={theme.spacing(10)}
                >
                  <Box display="flex" alignItems="center">
                    <ImageProjectHome width={40} height={40} />
                  </Box>
                  <Box width="80%" padding={theme.spacing(0, 0, 1, 0)}>
                    <Typography variant="h4" noWrap color={alpha(theme.pallet.text.primary, 0.87)}>
                      {resource.name}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  color="text.secondary"
                  overflow="hidden"
                  width="100%"
                  padding={theme.spacing(3)}
                >
                  <Box display="flex" alignItems="center" gap={theme.spacing(1)}>
                    <TimeIcon fontSize="inherit" />
                    <Typography variant="body2" color={theme.pallet.text.secondary}>
                      {dayjs(resource.lastUpdated).fromNow()}
                    </Typography>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Box>
        ))
      )}
    </Box>
  );
}

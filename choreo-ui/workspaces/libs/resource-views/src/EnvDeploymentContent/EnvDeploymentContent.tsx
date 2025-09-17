import {
  BindingStatus,
  Binding,
} from '@open-choreo/definitions';
import { Box, Status, Typography } from '@open-choreo/design-system';
export interface EnvDeploymentContentProps {
  binding?: Binding;
}

const statusSeverity = {
  [BindingStatus.ACTIVE]: 'success',
  [BindingStatus.FAILED]: 'error',
  [BindingStatus.IN_PROGRESS]: 'warning',
  [BindingStatus.SUSPENDED]: 'warning',
  [BindingStatus.NOT_YET_DEPLOYED]: 'info',
};

export function EnvDeploymentContent(props: EnvDeploymentContentProps) {
  const { binding } = props;

  return (
    <Box display="flex" flexDirection="column" width="100%" gap={2}>
      <Status
        severity={
          statusSeverity[
          binding?.status?.status as keyof typeof statusSeverity
          ] as 'success' | 'error' | 'warning' | 'info'
        }
        title="Deployment Status"
        status={binding?.status?.status}
      />
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h6">Deployment Status</Typography>
        <Typography variant="body1">
          {binding?.webApplicationBinding?.endpoints
            .map(
              (endpoint) =>
                endpoint?.public?.uri +
                ' ' +
                endpoint?.project?.uri +
                ' ' +
                endpoint?.type
            )
            .join(', ')}
        </Typography>
        <Typography variant="body1">
          {binding?.webApplicationBinding?.image}
        </Typography>
      </Box>
    </Box>
  );
}

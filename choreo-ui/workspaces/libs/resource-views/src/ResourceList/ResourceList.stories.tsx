import type { Meta, StoryObj } from '@storybook/react';
import { Resource, ResourceList } from './ResourceList';
import {
  Box,
  IconButton,
  OpenProjectIcon,
  SettingsIcon,
  TimeIcon,
  Tooltip,
  Typography,
} from '@open-choreo/design-system';
import { IntlProvider } from 'react-intl';

const resources: Resource[] = [
  {
    id: '1',
    name: 'API Gateway',
    description:
      'A service that acts as a reverse proxy to accept all API calls, aggregate various services, and return the appropriate result.',
    type: 'Service',
    lastUpdated: '2024-01-15',
    href: '/resources/api-gateway',
  },
  {
    id: '2',
    name: 'User Management',
    description: '',
    type: 'Service',
    lastUpdated: '2024-01-10',
    href: '/resources/user-management',
  },
  {
    id: '3',
    name: 'Database Cluster',
    description:
      'Distributed database system providing high availability and scalability for data storage.',
    type: 'Infrastructure',
    lastUpdated: '2024-01-08',
    href: '/resources/database-cluster',
  },
  {
    id: '4',
    name: 'Load Balancer',
    description:
      'Distributes incoming network traffic across multiple servers to ensure optimal resource utilization.',
    type: 'Infrastructure',
    lastUpdated: '2024-01-05',
    href: '/resources/load-balancer',
  },
  {
    id: '5',
    name: 'Monitoring Dashboard',
    description:
      'Real-time monitoring and alerting system for tracking application performance and health metrics.',
    type: 'Tool',
    lastUpdated: '2024-01-12',
    href: '/resources/monitoring-dashboard',
  },
];

const meta: Meta<typeof ResourceList> = {
  title: 'Choreo Views/ResourceList',
  component: ResourceList,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ResourceList>;

export const Default: Story = {
  args: {
    resources: resources,
    footerResourceListCardLeft: (
      <Box display="flex" alignItems="center" gap={4}>
        <TimeIcon fontSize="inherit" />
        <Tooltip
          title={`Last updated: ${new Date(resources[0].lastUpdated).toLocaleDateString()}`}
        >
          <Typography variant="body1" color="text.secondary">
            {new Date(resources[0].lastUpdated).toLocaleDateString()}
          </Typography>
        </Tooltip>
      </Box>
    ),
    footerResourceListCardRight: (
      <>
        <Tooltip title="Open project with vs code">
          <IconButton color="secondary" size="small">
            <OpenProjectIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Project settings">
          <IconButton color="secondary" size="small">
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </>
    ),
  },
  render: (args) => {
    return (
      <IntlProvider locale="en" messages={{}}>
        <ResourceList {...args} />
      </IntlProvider>
    );
  },
};

export const Empty: Story = {
  args: {
    resources: [],
    footerResourceListCardLeft: (
      <Box display="flex" alignItems="center" gap={4}>
        <TimeIcon fontSize="inherit" />
        <Tooltip
          title={`Last updated: ${new Date(resources[0].lastUpdated).toLocaleDateString()}`}
        >
          <Typography variant="body1" color="text.secondary">
            {new Date(resources[0].lastUpdated).toLocaleDateString()}
          </Typography>
        </Tooltip>
      </Box>
    ),
    footerResourceListCardRight: (
      <>
        <Tooltip title="Open project with vs code">
          <IconButton color="secondary" size="small">
            <OpenProjectIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Project settings">
          <IconButton color="secondary" size="small">
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </>
    ),
  },
  render: (args) => {
    return (
      <IntlProvider locale="en" messages={{}}>
        <ResourceList {...args} />
      </IntlProvider>
    );
  },
};

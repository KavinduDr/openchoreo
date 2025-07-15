import type { Meta, StoryObj } from '@storybook/react';
import { ResourceTable, ResourceTableItem } from './ResourceTable';
import { Button } from '@open-choreo/design-system';

const resources: ResourceTableItem[] = [
  {
    id: '1',
    name: 'API Gateway',
    description: 'A service that acts as a reverse proxy to accept all API calls, aggregate various services, and return the appropriate result.',
    type: 'Service',
    lastUpdated: new Date('2024-01-15'),
    href: '/resources/api-gateway'
  },
  {
    id: '2',
    name: 'User Management',
    description: 'Handles user authentication, authorization, and profile management across the application.',
    type: 'Service',
    lastUpdated: new Date('2024-01-10'),
    href: '/resources/user-management'
  },
  {
    id: '3',
    name: 'Database Cluster',
    description: 'Distributed database system providing high availability and scalability for data storage.',
    type: 'Infrastructure',
    lastUpdated: new Date('2024-01-08'),
    href: '/resources/database-cluster'
  },
  {
    id: '4',
    name: 'Load Balancer',
    description: 'Distributes incoming network traffic across multiple servers to ensure optimal resource utilization.',
    type: 'Infrastructure',
    lastUpdated: new Date('2024-01-05'),
    href: '/resources/load-balancer'
  },
  {
    id: '5',
    name: 'Monitoring Dashboard',
    description: 'Real-time monitoring and alerting system for tracking application performance and health metrics.',
    type: 'Tool',
    lastUpdated: new Date('2024-01-12') ,
    href: '/resources/monitoring-dashboard'
  },
];

const meta: Meta<typeof ResourceTable> = {
  title: 'Choreo Views/ResourceTable',
  component: ResourceTable,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ResourceTable>;

export const Default: Story = {
  args: {
    resources: resources,
    resourceKind: 'component',
    enableAvatar: true,
    onDeleteMember: () => { },
    onRefresh: () => { },
    actions: <Button color="primary" size="small" testId="add-button">Create Element</Button>
  },
};

export const Empty: Story = {
  args: {
    resources: [],
    resourceKind: 'component',
  },
};

export const SingleResource: Story = {
  args: {
    resources: [resources[0]],
    resourceKind: 'component',
  },
};

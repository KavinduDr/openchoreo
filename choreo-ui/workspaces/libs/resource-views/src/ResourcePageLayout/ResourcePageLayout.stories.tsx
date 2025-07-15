import type { Meta, StoryObj } from '@storybook/react';
import { ResourcePageLayout } from './ResourcePageLayout';
import { Resource } from '@open-choreo/definitions';
import { Typography } from '@open-choreo/design-system';

const organizationItem: Resource = {
  name: 'acme-corp',
  displayName: 'ACME Corporation',
  description: 'A leading technology company specializing in innovative solutions.',
  createdAt: '2024-01-15',
  status: 'Active',
  namespace: 'acme-corp',
  orgName: 'acme-corp'
};

const projectItem: Resource = {
  name: 'ecommerce-platform',
  displayName: 'E-commerce Platform',
  description: 'A comprehensive e-commerce solution with payment processing and inventory management.',
  createdAt: '2024-01-15',
  status: 'Active',
  orgName: 'acme-corp',
  deploymentPipeline: 'production'
};

const componentItem: Resource = {
  name: 'user-service',
  displayName: 'User Service',
  description: 'Handles user authentication, authorization, and profile management.',
  type: 'Service',
  createdAt: '2024-01-15',
  status: 'Active',
  orgName: 'acme-corp',
  projectName: 'ecommerce-platform',
  repositoryUrl: 'https://github.com/acme/user-service',
  branch: 'main'
};

const meta: Meta<typeof ResourcePageLayout> = {
  title: 'Choreo Views/ResourcePageLayout',
  component: ResourcePageLayout,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ResourcePageLayout>;

export const Organization: Story = {
  args: {
    resource: organizationItem,
    testId: 'organization',
    backUrl: '/organizations',
    backButtonText: 'Back to Organizations',
    children: (
      <Typography variant="body1">
        This is the organization page content. You can add any components here to display organization-specific information.
      </Typography>
    ),
  },
};

export const Project: Story = {
  args: {
    resource: projectItem,
    testId: 'project',
    backUrl: '/projects',
    backButtonText: 'Back to Projects',
    children: (
      <Typography variant="body1">
        This is the project page content. You can add project-specific components here like deployment status, configuration, etc.
      </Typography>
    ),
  },
};

export const Component: Story = {
  args: {
    resource: componentItem,
    testId: 'component',
    backUrl: '/components',
    backButtonText: 'Back to Components',
    children: (
      <Typography variant="body1">
        This is the component page content. You can add component-specific information like logs, metrics, configuration, etc.
      </Typography>
    ),
  },
};

export const WithoutBackButton: Story = {
  args: {
    resource: componentItem,
    testId: 'component-no-back',
    children: (
      <Typography variant="body1">
        This example shows the layout without a back button.
      </Typography>
    ),
  },
};

export const WithoutActions: Story = {
  args: {
    resource: organizationItem,
    testId: 'organization-no-actions',
    backUrl: '/organizations',
    backButtonText: 'Back to Organizations',
    children: (
      <Typography variant="body1">
        This example shows the layout without action buttons in the header.
      </Typography>
    )
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { RadioCard } from './RadioCard';
import React from 'react';
import {
  Box,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { Card, CardContent } from '../Card';
import { RadioGroup } from '../RadioGroup';
import ChoreoNotificationImg from '../../Images/generated/ServiceColor';
import Edit from '@design-system/Icons/generated/Edit';
import Delete from '@design-system/Icons/generated/Delete';
import { MoreVert } from '@mui/icons-material';

const meta: Meta<typeof RadioCard> = {
  title: 'Choreo DS/RadioCard',
  component: RadioCard,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the element',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

const testId = 'radio-card';

export default meta;
type Story = StoryObj<typeof RadioCard>;

export const VerticalTemplate: Story = {
  render: function Template(_args) {
    const [value, setValue] = React.useState('restAPI');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue((event.target as HTMLInputElement).value);
    };
    return (
      <Box maxWidth={800}>
        <Card testId={`${testId}-vertical`}>
          <CardContent>
            <RadioGroup
              defaultValue="restAPI"
              aria-label="apiType"
              name="apiType"
              value={value}
              onChange={handleChange}
              testId="vertical-default-options"
            >
              <RadioCard
                title="RestAPI"
                description="This report contains data related to response mediation latency in all the API versions."
                value="restAPI"
                active={value === 'restAPI'}
                icon={<ChoreoNotificationImg />}
                testId={`${testId}-api`}
              />
              <RadioCard
                title="API Proxy"
                description="API Proxy Desc"
                value="apiProxy"
                icon={<ChoreoNotificationImg />}
                testId={`${testId}-proxy`}
              />
              <RadioCard
                title="Other"
                description="Other Desc"
                value="other"
                active={value === 'other'}
                icon={<ChoreoNotificationImg />}
                testId={`${testId}-other`}
              />
              <RadioCard
                title="Disabled"
                description="Disabled Desc"
                value="disabled"
                active={value === 'disabled'}
                icon={<ChoreoNotificationImg />}
                disabled
                testId={`${testId}-disabled`}
              />
            </RadioGroup>
          </CardContent>
        </Card>
      </Box>
    );
  },
};

export const HorizontalTemplate: Story = {
  render: function HorizontalTemplate(_args) {
    const [value, setValue] = React.useState('restAPI');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue((event.target as HTMLInputElement).value);
    };
    return (
      <Box p={5}>
        <RadioGroup
          defaultValue="restAPI"
          aria-label="ApiType"
          name="apiType"
          value={value}
          onChange={handleChange}
          direction="row"
          testId="horizaontal-default-options"
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4, lg: 4, xl: 3 }}>
              <RadioCard
                title="RestAPI"
                description="RestAPI Description goes here, RestAPI long description goes here"
                value="restAPI"
                active={value === 'restAPI'}
                icon={<ChoreoNotificationImg />}
                testId={`${testId}-horizontal-rest`}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 4, xl: 3 }}>
              <RadioCard
                title="API Proxy"
                description="API Proxy Description goes here"
                value="apiProxy"
                active={value === 'apiProxy'}
                icon={<ChoreoNotificationImg />}
                testId={`${testId}-horizontal-proxy`}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 4, xl: 3 }}>
              <RadioCard
                title="Other"
                description="Other description."
                value="other"
                active={value === 'other'}
                icon={<ChoreoNotificationImg />}
                testId={`${testId}-horizontal-other`}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 4, xl: 3 }}>
              <RadioCard
                title="Disabled"
                description="Disabled Description goes here"
                value="disabled"
                active={value === 'disabled'}
                icon={<ChoreoNotificationImg />}
                disabled
                testId={`${testId}-horizontal-disabled`}
              />
            </Grid>
          </Grid>
        </RadioGroup>
      </Box>
    );
  },
};

export const IndicatorTemplate: Story = {
  render: function IndicatorTemplate(_args) {
    const [value, setValue] = React.useState('restAPI');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue((event.target as HTMLInputElement).value);
    };
    return (
      <Box display="flex" gap={8}>
        <Box maxWidth={500}>
          <Card testId={`${testId}-horizontal-1`}>
            <CardContent>
              <RadioGroup
                defaultValue="restAPI"
                aria-label="apiType"
                name="apiType1"
                value={value}
                onChange={handleChange}
                testId="indicator-default-options"
              >
                <RadioCard
                  title="RestAPI"
                  description="This report contains data related to response mediation latency in all the API versions."
                  value="restAPI"
                  active={value === 'restAPI'}
                  indicator={true}
                  testId={`${testId}-indicator-rest`}
                />
                <RadioCard
                  title="API Proxy"
                  description="API Proxy Desc"
                  value="apiProxy"
                  active={value === 'apiProxy'}
                  indicator={true}
                  testId={`${testId}-indicator-proxy`}
                />
                <RadioCard
                  title="Other"
                  description="Other Desc"
                  value="other"
                  active={value === 'other'}
                  indicator={true}
                  testId={`${testId}-indicator-other`}
                />
                <RadioCard
                  title="Disabled"
                  description="Disabled Desc"
                  value="disabled"
                  active={value === 'disabled'}
                  indicator={true}
                  disabled
                  testId={`${testId}-indicator-disabled`}
                />
              </RadioGroup>
            </CardContent>
          </Card>
        </Box>
        <Box maxWidth={500}>
          <Card testId={`${testId}-horizontal-2`}>
            <CardContent>
              <RadioGroup
                defaultValue="restAPI"
                aria-label="apiType"
                name="apiType2"
                testId="indicator-icon-default-options"
                value={value}
                onChange={handleChange}
              >
                <RadioCard
                  title="RestAPI"
                  description="This report contains data related to response mediation latency in all the API versions."
                  value="restAPI"
                  active={value === 'restAPI'}
                  icon={<ChoreoNotificationImg />}
                  indicator
                  testId={`${testId}-indicator-icon-rest-desc`}
                />
                <RadioCard
                  title="API Proxy"
                  description="API Proxy Desc"
                  value="apiProxy"
                  active={value === 'apiProxy'}
                  icon={<ChoreoNotificationImg />}
                  indicator
                  testId={`${testId}-indicator-icon-proxy-desc`}
                />
                <RadioCard
                  title="Other"
                  description="Other Desc"
                  value="other"
                  active={value === 'other'}
                  icon={<ChoreoNotificationImg />}
                  indicator
                  testId={`${testId}-indicator-icon-other-desc`}
                />
                <RadioCard
                  title="Disabled"
                  description="Disabled Desc"
                  value="disabled"
                  active={value === 'disabled'}
                  icon={<ChoreoNotificationImg />}
                  indicator
                  disabled
                  testId={`${testId}-indicator-icon-disabled-desc`}
                />
              </RadioGroup>
            </CardContent>
          </Card>
        </Box>
      </Box>
    );
  },
};

export const IndicatorTemplateContent: Story = {
  render: function IndicatorTemplateContent(_args) {
    const [value, setValue] = React.useState('restAPI');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue((event.target as HTMLInputElement).value);
    };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const actionsTwoItems = (
      <Box display="flex" gap={8}>
        <IconButton color="secondary" size="small">
          <Edit fontSize="inherit" />
        </IconButton>
        <IconButton color="secondary" size="small">
          <Delete fontSize="inherit" />
        </IconButton>
      </Box>
    );
    const actionsMoreItems = (
      <div>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
          size="small"
        >
          <MoreVert color="secondary" fontSize="small" />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
        >
          <MenuItem>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <Typography variant="inherit">Edit</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <Typography variant="inherit">Delete</Typography>
          </MenuItem>
        </Menu>
      </div>
    );

    return (
      <>
        <Box display="flex" gap={8}>
          <Box>
            <Card testId={`${testId}-horizontal-3`}>
              <CardContent>
                <RadioGroup
                  defaultValue="restAPI"
                  aria-label="apiType"
                  name="apiType1"
                  value={value}
                  onChange={handleChange}
                  testId="story-indicator-default-options"
                >
                  <RadioCard
                    title="RestAPI"
                    value="restAPI"
                    active={value === 'restAPI'}
                    icon={<ChoreoNotificationImg />}
                    indicator
                    testId={`${testId}-indicator-rest-desc`}
                  />
                  <RadioCard
                    title="API Proxy"
                    description="API Proxy Desc"
                    value="apiProxy"
                    active={value === 'apiProxy'}
                    icon={<ChoreoNotificationImg />}
                    indicator
                    testId={`${testId}-indicator-proxy-desc`}
                  />
                  <RadioCard
                    title="Other"
                    description="Other Desc"
                    value="other"
                    active={value === 'other'}
                    icon={<ChoreoNotificationImg />}
                    indicator
                    testId={`${testId}-indicator-other-desc`}
                  />
                  <RadioCard
                    title="Disabled"
                    description="Disabled Desc"
                    value="disabled"
                    active={value === 'disabled'}
                    icon={<ChoreoNotificationImg />}
                    indicator
                    disabled
                    testId={`${testId}-indicator-disabled-desc`}
                  />
                </RadioGroup>
              </CardContent>
            </Card>
          </Box>
          <Box>
            <Card testId={`${testId}-horizontal-4`}>
              <CardContent>
                <RadioGroup
                  defaultValue="restAPI"
                  aria-label="apiType"
                  name="apiType2"
                  value={value}
                  onChange={handleChange}
                  testId="story-apiType2-indicator-default-options"
                >
                  <RadioCard
                    title="RestAPI"
                    value="restAPI"
                    active={value === 'restAPI'}
                    icon={<ChoreoNotificationImg />}
                    actions={actionsTwoItems}
                    testId={`${testId}-indicator-icon-rest`}
                    content={
                      <Box display="flex" flexDirection="column">
                        <Typography variant="body1" color="secondary">
                          This report contains data related to response
                          mediation latency in all the API versions.
                        </Typography>
                      </Box>
                    }
                  />
                  <RadioCard
                    title="API Proxy"
                    description="API Proxy Desc"
                    value="apiProxy"
                    active={value === 'apiProxy'}
                    icon={<ChoreoNotificationImg />}
                    actions={actionsTwoItems}
                    testId={`${testId}-indicator-icon-proxy`}
                  />
                  <RadioCard
                    title="Other"
                    description="Other Desc"
                    value="other"
                    active={value === 'other'}
                    icon={<ChoreoNotificationImg />}
                    actions={actionsMoreItems}
                    testId={`${testId}-indicator-icon-other`}
                  />
                  <RadioCard
                    title="Disabled"
                    description="Disabled Desc"
                    value="disabled"
                    active={value === 'disabled'}
                    icon={<ChoreoNotificationImg />}
                    actions={actionsTwoItems}
                    disabled
                    testId={`${testId}-indicator-icon-disabled`}
                  />
                </RadioGroup>
              </CardContent>
            </Card>
          </Box>
        </Box>
        <Box maxWidth={500} mt={3}>
          <Typography variant="h3" gutterBottom>
            Icon Placement
          </Typography>
          <Card testId={`${testId}-horizontal-5`}>
            <CardContent>
              <RadioGroup
                defaultValue="restAPI"
                aria-label="apiType"
                name="apiType2"
                value={value}
                onChange={handleChange}
                testId="story-action-indicator-default-options"
              >
                <RadioCard
                  title="RestAPI"
                  value="restAPI"
                  active={value === 'restAPI'}
                  icon={<ChoreoNotificationImg />}
                  actions={actionsTwoItems}
                  iconPlacement="top"
                  content={
                    <Box display="flex" flexDirection="column">
                      <Typography variant="body1" color="secondary">
                        This report contains data related to response mediation
                        latency in all the API versions.
                      </Typography>
                      <Typography variant="body1" color="secondary">
                        This report contains data related to response mediation
                        latency in all the API versions.
                      </Typography>
                      <Typography variant="body1" color="secondary">
                        This report contains data related to response mediation
                        latency in all the API versions.
                      </Typography>
                      <Typography variant="body1" color="secondary">
                        This report contains data related to response mediation
                        latency in all the API versions.
                      </Typography>
                    </Box>
                  }
                  testId={`${testId}-indicator-icon-rest`}
                />
                <RadioCard
                  title="API Proxy"
                  description="API Proxy Desc"
                  value="apiProxy"
                  active={value === 'apiProxy'}
                  icon={<ChoreoNotificationImg />}
                  actions={actionsTwoItems}
                  testId={`${testId}-indicator-icon-proxy`}
                  iconPlacement="center"
                  content={
                    <Box display="flex" flexDirection="column">
                      <Typography variant="body1" color="secondary">
                        This report contains data related to response mediation
                        latency in all the API versions.
                      </Typography>
                      <Typography variant="body1" color="secondary">
                        This report contains data related to response mediation
                        latency in all the API versions.
                      </Typography>
                      <Typography variant="body1" color="secondary">
                        This report contains data related to response mediation
                        latency in all the API versions.
                      </Typography>
                      <Typography variant="body1" color="secondary">
                        This report contains data related to response mediation
                        latency in all the API versions.
                      </Typography>
                    </Box>
                  }
                />
              </RadioGroup>
            </CardContent>
          </Card>
        </Box>
      </>
    );
  },
};

export const CheckboxContentIndicatorTemplate: Story = {
  render: function CheckboxContentIndicatorTemplate(_args) {
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
    const handleSelect = (
      event: React.ChangeEvent<HTMLInputElement>,
      value: string
    ) => {
      if (event.target.checked) {
        setSelectedItems((prevSelectedItems) => [...prevSelectedItems, value]);
      } else {
        setSelectedItems((prevSelectedItems) =>
          prevSelectedItems.filter((item) => item !== value)
        );
      }
    };

    const values = ['Rest API', 'API Proxy', 'Cron Job'];
    return (
      <Box display="flex" gap={8} maxWidth={500}>
        <Card testId={`${testId}-radio-card`}>
          <CardContent>
            {values.map((value) => (
              <Box mb={2} key={value}>
                <RadioCard
                  key={value}
                  title={value}
                  description={`This report contains data related to response mediation
                  latency in all the ${value} versions.`}
                  value={value}
                  active={selectedItems.includes(value)}
                  icon={<ChoreoNotificationImg />}
                  indicator
                  enableCheckboxMode
                  onToggleSelect={(event) => handleSelect(event, value)}
                  testId={`${testId}-indicator-icon-${value}-desc`}
                />
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
    );
  },
};

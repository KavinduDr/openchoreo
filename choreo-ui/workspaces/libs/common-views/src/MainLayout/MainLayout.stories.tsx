import {
  Box,
  MenuHomeFilledIcon,
  MenuHomeIcon,
  MenuOverviewFilledIcon,
  MenuOverviewIcon,
  NavItemExpandableSubMenu,
} from '@open-choreo/design-system';
import { MainLayout } from './MainLayout';
import { Level, LevelSelector } from './components/LevelSelector';
import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

const menuItems: NavItemExpandableSubMenu[] = [
  {
    icon: <MenuHomeIcon fontSize="inherit" />,
    title: 'Home',
    selectedIcon: <MenuHomeFilledIcon fontSize="inherit" />,
    id: 'home-1',
    subMenuItems: [
      {
        icon: <MenuHomeIcon fontSize="inherit" />,
        title: 'Home 2',
        selectedIcon: <MenuHomeFilledIcon fontSize="inherit" />,
        id: 'home-2',
      },
      {
        icon: <MenuHomeIcon fontSize="inherit" />,
        title: 'Home 1',
        selectedIcon: <MenuHomeFilledIcon fontSize="inherit" />,
        id: 'home-3',
      },
    ],
  },
  {
    icon: <MenuOverviewIcon fontSize="inherit" />,
    title: 'Overview',
    selectedIcon: <MenuOverviewFilledIcon fontSize="inherit" />,
    id: 'overview',
  },
];

const rightElement = <Box height="100%">This is the Right Element</Box>;

const header = (
  <Box flexGrow={1} height="100%" display="flex">
    This is the Header
  </Box>
);

const footer = (
  <Box flexGrow={1} height="100%" display="flex">
    This is the Footer
  </Box>
);

const MainLayoutWithState = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | undefined>(
    menuItems[0].id
  );
  return (
    <MainLayout
      menuItems={menuItems}
      rightSidebar={rightElement}
      header={header}
      footer={footer}
      onMenuItemClick={setSelectedMenuItem}
      selectedMenuItem={selectedMenuItem}
    >
      MainLayout Content - Selected: {selectedMenuItem}
    </MainLayout>
  );
};

const meta: Meta<typeof MainLayout> = {
  title: 'Choreo Views/MainLayout',
  component: MainLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export default meta;

type Story = StoryObj<typeof MainLayout>;

export const Layout: Story = {
  render: () => <MainLayoutWithState />,
};

// story for level selector
export const TopLevelSelector: StoryObj<typeof LevelSelector> = {
  render: () => <LevelSelector level={Level.TOP} />,
};

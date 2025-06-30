import {
  type PluginExtension,
  PluginExtensionType,
} from "@open-choreo/plugin-core";
import React from "react";
import { MenuHomeFilledIcon, MenuHomeIcon } from "@open-choreo/design-system";

export const navigation: PluginExtension = {
  type: PluginExtensionType.NAVIGATION,
  icon: () => <MenuHomeIcon fontSize="inherit" />,
  iconSelected: () => <MenuHomeFilledIcon fontSize="inherit" />,
  name: "Overview",
  // submenu: [
  //     {
  //         icon: () => <MenuOverviewIcon fontSize="inherit" />,
  //         iconSelected: () => <MenuOverviewFilledIcon fontSize="inherit" />,
  //         name: "Overview 1",
  //         path: "/overview/1",
  //     },
  //     {
  //         icon: () => <MenuOverviewIcon fontSize="inherit" />,
  //         iconSelected: () => <MenuOverviewFilledIcon fontSize="inherit" />,
  //         name: "Overview 2",
  //         path: "/overview/2",
  //     },
  //     {
  //         icon: () => <MenuObserveIcon fontSize="inherit" />,
  //         iconSelected: () => <MenuObserveFilledIcon fontSize="inherit" />,
  //         name: "Overview 3",
  //         path: "/overview/3",
  //     },
  // ],
};

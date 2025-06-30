import type { PluginManifest } from '@open-choreo/plugin-core';
import { overviewPlugin } from '@open-choreo/plugin-overview';
import { levelSelectorPlugin } from '@open-choreo/plugin-top-level-selector';
import { topRightMenuPlugin } from '@open-choreo/top-right-menu';
import { apiClientPlugin } from '@open-choreo/api-client';

export const pluginRegistry: PluginManifest[] = [overviewPlugin, levelSelectorPlugin, topRightMenuPlugin, apiClientPlugin];
 
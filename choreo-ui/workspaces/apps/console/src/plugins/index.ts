import type { PluginManifest } from '@open-choreo/plugin-core';
import { choreoContextPlugin } from '@open-choreo/choreo-context';

// Lazy load all plugins
const overviewPlugin = () => import('@open-choreo/plugin-overview').then(module => module.overviewPlugin);
const levelSelectorPlugin = () => import('@open-choreo/plugin-top-level-selector').then(module => module.levelSelectorPlugin);
const topRightMenuPlugin = () => import('@open-choreo/top-right-menu').then(module => module.topRightMenuPlugin);
const resourceListingPlugin = () => import('@open-choreo/resource-list').then(module => module.resourceListingPlugin);

// Export the plugin registry as a function that returns promises
export const getPluginRegistry = async (): Promise<PluginManifest[]> => {
  const [overview, levelSelector, topRightMenu, resourceListing] = await Promise.all([
    overviewPlugin(),
    levelSelectorPlugin(),
    topRightMenuPlugin(),
    resourceListingPlugin()
  ]);
  
  return [overview, levelSelector, topRightMenu, choreoContextPlugin, resourceListing];
};

// For backward compatibility, export a synchronous version that loads plugins on demand
export const pluginRegistry: PluginManifest[] = [];
 
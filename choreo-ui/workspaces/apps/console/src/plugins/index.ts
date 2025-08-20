import type { PluginManifest } from '@open-choreo/plugin-core';
// import { choreoContextPlugin } from '@open-choreo/choreo-context';

// Lazy load all plugins
const overviewPlugin = () => import('@open-choreo/overviews').then(module => module.overviewPlugin);
const levelSelectorPlugin = () => import('@open-choreo/plugin-top-level-selector').then(module => module.levelSelectorPlugin);
const topRightMenuPlugin = () => import('@open-choreo/top-right-menu').then(module => module.topRightMenuPlugin);
const projectListingPlugin = () => import('@open-choreo/project-listing').then(module => module.projectListingPlugin);
const componentListingPlugin = () => import('@open-choreo/component-listing').then(module => module.componentListingPlugin);
const deploymentPlugin = () => import('@open-choreo/deployment').then(module => module.deploymentPlugin);

// Export the plugin registry as a function that returns promises
export const getPluginRegistry = async (): Promise<PluginManifest[]> => {
  const [overview, levelSelector, topRightMenu, projectListing, componentListing, deployment] = await Promise.all([
    overviewPlugin(),
    levelSelectorPlugin(),
    topRightMenuPlugin(),
    projectListingPlugin(),
    componentListingPlugin(),
    deploymentPlugin()
  ]);
  
  return [overview, levelSelector, topRightMenu,
     projectListing, componentListing, deployment];
};

// For backward compatibility, export a synchronous version that loads plugins on demand
export const pluginRegistry: PluginManifest[] = [];
 
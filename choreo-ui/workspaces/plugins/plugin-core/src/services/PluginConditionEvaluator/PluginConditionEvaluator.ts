import {
  usePathMatchComponent,
  usePathMatchProject,
  usePathMatchOrg,
  useComponentType,
} from "@open-choreo/choreo-context";
import { usePluginRegistry } from "../../Providers";
import { useMemo } from "react";

// Helper to get current context
export function GetCurrentContext() {
  const componentMatch = usePathMatchComponent();
  const projectMatch = usePathMatchProject();
  const orgMatch = usePathMatchOrg();
  const componentType = useComponentType(); // on the component level the component type is recieved from the context

  if (componentMatch) return "component";
  if (projectMatch) return "project";
  if (orgMatch) return "org";
  return "global";
}

// Build context object for eval()
export function BuildContextObject() {
  const componentMatch = usePathMatchComponent();
  const projectMatch = usePathMatchProject();
  const orgMatch = usePathMatchOrg();
  const componentType = useComponentType();

  return {
    // Boolean flags for current level
    component: !!componentMatch,
    project: !!projectMatch,
    org: !!orgMatch,
    global: !componentMatch && !projectMatch && !orgMatch,

    // Component type for type comparisons
    type: componentType,

    // Common component types as boolean flags
    "web-app": componentType === "WebApplication",
    "web-service": componentType === "WebService",
    api: componentType === "API",
    frontend: componentType === "Frontend",
    backend: componentType === "Backend",
    microservice: componentType === "Microservice",

    // String values for exact comparisons
    componentType: componentType,
  };
}

// Main evaluation function using eval()
export function evaluateWhenExpression(
  when: string | undefined,
  context: any,
): boolean {
  if (!when) return true; // No condition means always render

  try {
    // Create a safe evaluation context with only the properties we want to expose
    const evalContext = {
      ...context,
      // Add any additional helper functions if needed
      // For example: isType: (type) => context.type === type,
    };

    // Use eval() with the controlled context
    return eval(when);
  } catch (error) {
    console.warn(`Failed to evaluate condition "${when}":`, error);
    return false; // Fail safe - don't render if evaluation fails
  }
}

// Hook to get filtered extensions based on when conditions
export function useFilteredExtensions(extensionPoint: any) {
  const pluginRegistry = usePluginRegistry();
  const context = BuildContextObject();

  return useMemo(() => {
    return pluginRegistry.flatMap((plugin) =>
      plugin.extensions
        .filter((extension: any) => {
          // First filter by extension point
          if (extension.extensionPoint.id !== extensionPoint.id) {
            return false;
          }

          // Then evaluate the when condition
          return evaluateWhenExpression(extension.when, context);
        })
        .map((extension: any) => ({
          ...extension,
          pluginName: plugin.name,
        })),
    );
  }, [pluginRegistry, context, extensionPoint.id]);
}

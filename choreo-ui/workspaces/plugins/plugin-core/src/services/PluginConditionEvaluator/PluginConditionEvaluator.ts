import { useMemo } from "react";
import {
  usePathMatchComponent,
  usePathMatchProject,
  usePathMatchOrg,
  useUrlParams,
  useSelectedProject,
  useSelectedOrganization,
  useSelectedComponent,
} from "@open-choreo/choreo-context";
import { logger } from "@open-choreo/logging";
import { usePluginRegistry } from "../../Providers";

// Helper to get current context
export function GetCurrentContext() {
  const componentMatch = usePathMatchComponent();
  const projectMatch = usePathMatchProject();
  const orgMatch = usePathMatchOrg();

  if (componentMatch) return "component";
  if (projectMatch) return "project";
  if (orgMatch) return "org";
  return "global";
}

// Build context object for evaluation
export function BuildContextObject() {
  const { orgHandle } = useUrlParams();
  // Fetch objects using hooks
  const { data: componentObj } = useSelectedComponent();
  const { data: projectObj } = useSelectedProject();
  const { data: orgObj } = useSelectedOrganization();
  // You may need a useOrg hook if you want org details, otherwise just use orgHandle

  const componentType = componentObj?.data?.type || "";

  return {
    level: componentObj
      ? "component"
      : projectObj
        ? "project"
        : orgHandle
          ? "org"
          : "global",
    component: componentObj || null,
    project: projectObj || null,
    org: orgObj || null, // Replace with org object if you have a hook for it
    global: !componentObj && !projectObj && !orgHandle,
    type: componentType,
    // "web-app": componentType === "WebApplication",
    // "web-service": componentType === "WebService",
    // api: componentType === "API",
    // frontend: componentType === "Frontend",
    // backend: componentType === "Backend",
  };
}

// Evaluate complex when expressions
export function evaluateWhenExpression(
  when: string | undefined,
  context: Record<string, any>,
): boolean {
  if (!when) return true; // If no when condition, always render

  try {
    // const level = context.level || "global"; // Default to global if not set
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const component = context.component?.data || null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const project = context.project?.data || null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const org = context.org?.data || null;
    // console.log("component: ", context.component?.data);
    // console.log("organization: ", context.org?.data);

    // console.log(component, project, org);

    const result = eval(when);

    return result;
  } catch (error) {
    logger.error("Error evaluating when expression:", when, error);
    return false;
  }
}

// Evaluate a single condition
// function evaluateSingleCondition(
//   condition: string,
//   context: Record<string, any>
// ): boolean {
//   // Handle equality comparisons like "type === 'web-app'"
//   const equalityMatch = condition.match(/^(\w+)\s*===\s*['"]([^'"]+)['"]$/);
//   if (equalityMatch) {
//     const [, key, value] = equalityMatch;
//     return context[key] === value;
//   }

//   // Handle simple boolean checks like "component", "web-app"
//   if (condition in context) {
//     return !!context[condition];
//   }

//   // Handle string values that should be compared to type
//   if (context.type && context.type === condition) {
//     return true;
//   }

//   return false;
// }

// Hook to get filtered extensions based on when conditions
export function useFilteredExtensions(extensionPoint: any) {
  const pluginRegistry = usePluginRegistry();
  const context = BuildContextObject();

  return useMemo(() => {
    return pluginRegistry.flatMap((plugin) =>
      plugin.extensions.filter((entry) => {
        // First check if extension point matches
        const extensionPointMatches =
          entry.extensionPoint.id === extensionPoint.id &&
          entry.extensionPoint.type === extensionPoint.type;

        if (!extensionPointMatches) return false;

        // Then evaluate when condition
        return evaluateWhenExpression(entry.when, context);
      }),
    );
  }, [pluginRegistry, extensionPoint, context]);
}

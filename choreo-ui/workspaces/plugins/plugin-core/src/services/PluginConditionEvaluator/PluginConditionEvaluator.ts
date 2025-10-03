/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
export function BuildContextObject(): {
  isLoading: boolean;
  level: string;
  component: any;
  project: any;
  org: any;
  global: boolean;
  type: string;
} {
  const { orgHandle } = useUrlParams();
  // Fetch objects using hooks
  // const { data: componentObj } = useSelectedComponent();
  // const { data: projectObj } = useSelectedProject();
  // const { data: orgObj } = useSelectedOrganization();
  const componentResult = useSelectedComponent();
  const projectResult = useSelectedProject();
  const orgResult = useSelectedOrganization();
  // You may need a useOrg hook if you want org details, otherwise just use orgHandle

  // console.log("componentObj: ", componentResult);
  // console.log("projectObj: ", projectResult);
  // console.log("orgObj: ", orgResult);
  const componentType = componentResult?.data?.data.type || "";

  return {
    isLoading:
      componentResult.isLoading ||
      projectResult.isLoading ||
      orgResult.isLoading,
    // FIX: Check .data property instead of the whole result object
    level: componentResult.data
      ? "component"
      : projectResult.data
        ? "project"
        : orgHandle
          ? "org"
          : "global",
    component: componentResult.data || null,
    project: projectResult.data || null,
    org: orgResult.data || null,
    global: !componentResult.data && !projectResult.data && !orgHandle,
    type: componentType,
  };
}

enum States {
  isLoading = "loading",
  isReady = "ready",
  isError = "error",
  // ... other states
  true = "true", // This is the "truthy" state
  false = "false", // This is the "falsy" state
}

// Evaluate complex when expressions
export function evaluateWhenExpression(
  when: string | undefined,
  context: Record<string, any>,
): States {
  if (!when) return States.true;

  // console.log("Evaluating when expression:", when);
  // console.log("With context:", context);

  // checking if context is loading
  if (context.isLoading) return States.isLoading;

  try {
    const component = context.component?.data || null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const project = context.project?.data || null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const org = context.org?.data || null;

    const result = eval(when);
    // console.log("When expression result:", result);

    // FIX: Convert boolean to States enum
    return result ? States.true : States.false;
  } catch (error) {
    // console.error("Error evaluating when expression:", when, error);
    return States.false;
  }
}

// Hook to get filtered extensions based on when conditions
export function useFilteredExtensions(extensionPoint: any) {
  const pluginRegistry = usePluginRegistry();
  const context = BuildContextObject();

  return useMemo(() => {
    // If context is loading, return loading state immediately
    if (context.isLoading) {
      // console.log("Context is loading, returning loading state");
      return {
        extensions: [],
        isLoading: true,
        hasData: false,
      };
    }

    const extensions = pluginRegistry.flatMap((plugin) =>
      plugin.extensions.filter((entry) => {
        const extensionPointMatches =
          entry.extensionPoint.id === extensionPoint.id &&
          entry.extensionPoint.type === extensionPoint.type;

        if (!extensionPointMatches) return false;

        // console.log("Evaluating extension:", entry);
        // console.log("context for evaluation:", context);
        const evaluationResult = evaluateWhenExpression(entry.when, context);
        // console.log(evaluationResult);
        // console.log("Extension:", entry.extensionPoint);
        // console.log("Evaluation result:", evaluationResult);
        // console.log(
        //   "Will include:",
        //   evaluationResult === States.true ||
        //   evaluationResult === States.isReady,
        // );
        return (
          evaluationResult === States.true ||
          evaluationResult === States.isReady
        ); // here should return true or false. since we returning States.true or States.isReady we need to
        // check that when rendering.
      }),
    );

    // Check if any extension returned loading state
    const hasLoadingExtensions = pluginRegistry.some((plugin) =>
      plugin.extensions.some((entry) => {
        const extensionPointMatches =
          entry.extensionPoint.id === extensionPoint.id &&
          entry.extensionPoint.type === extensionPoint.type;

        if (!extensionPointMatches) return false;

        const evaluationResult = evaluateWhenExpression(entry.when, context);
        // console.log(evaluationResult);
        return evaluationResult === States.isLoading;
      }),
    );

    // console.log("extensions: ", extensions);
    // console.log("hasLoadingExtensions: ", hasLoadingExtensions);
    // console.log("hasLoadingExtensions: ", States.isLoading);
    // console.log("has data: ", extensions.length > 0);
    // console.log(extensionPoint);

    return {
      extensions,
      isLoading: hasLoadingExtensions,
      hasData: extensions.length > 0,
    };
  }, [pluginRegistry, extensionPoint, context]);
}

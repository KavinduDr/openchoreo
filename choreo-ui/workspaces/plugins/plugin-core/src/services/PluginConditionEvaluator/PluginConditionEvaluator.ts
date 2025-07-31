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

// Build context object for evaluation
export function BuildContextObject() {
  const componentMatch = usePathMatchComponent();
  const projectMatch = usePathMatchProject();
  const orgMatch = usePathMatchOrg();
  const componentType = useComponentType();
  // console.log("componentType", componentType);

  return {
    level: componentMatch
      ? "component"
      : projectMatch
        ? "project"
        : orgMatch
          ? "org"
          : "global",
    component: !!componentMatch,
    project: !!projectMatch,
    org: !!orgMatch,
    global: !componentMatch && !projectMatch && !orgMatch,
    type: componentType || "",
    // Add boolean flags for common component types
    "web-app": componentType === "WebApplication",
    "web-service": componentType === "WebService",
    api: componentType === "API",
    frontend: componentType === "Frontend",
    backend: componentType === "Backend",
  };
}

// Evaluate complex when expressions
export function evaluateWhenExpression(
  when: string | undefined,
  context: Record<string, any>,
): boolean {
  if (!when) return true; // If no when condition, always render

  try {
    // Split by logical operators
    // const conditions = when.split(/\s+(?:&&|\|\|)\s+/);
    // const operators = when.match(/\s+(?:&&|\|\|)\s+/g) || [];
    // console.log(conditions, operators);
    const level = context.level;
    const type = context.type;
    // console.log(eval(when));

    // if (conditions.length === 1) {
    //   // Single condition
    //   return evaluateSingleCondition(conditions[0].trim(), context);
    // }

    // // Multiple conditions with logical operators
    // let result = evaluateSingleCondition(conditions[0].trim(), context);

    // for (let i = 0; i < operators.length; i++) {
    //   const operator = operators[i].trim();
    //   const nextCondition = conditions[i + 1].trim();
    //   const nextResult = evaluateSingleCondition(nextCondition, context);

    //   if (operator === "&&") {
    //     result = result && nextResult;
    //   } else if (operator === "||") {
    //     result = result || nextResult;
    //   }
    // }

    const result = eval(when);

    return result;
  } catch (error) {
    console.error("Error evaluating when expression:", when, error);
    return false;
  }
}

// Evaluate a single condition
function evaluateSingleCondition(
  condition: string,
  context: Record<string, any>,
): boolean {
  // Handle equality comparisons like "type === 'web-app'"
  const equalityMatch = condition.match(/^(\w+)\s*===\s*['"]([^'"]+)['"]$/);
  if (equalityMatch) {
    const [, key, value] = equalityMatch;
    return context[key] === value;
  }

  // Handle simple boolean checks like "component", "web-app"
  if (condition in context) {
    return !!context[condition];
  }

  // Handle string values that should be compared to type
  if (context.type && context.type === condition) {
    return true;
  }

  return false;
}

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

import {
  Binding,
  Environment,
  TargetEnvironmentRef,
} from "@open-choreo/definitions";

export interface EnrichedEnvironment extends Environment {
  binding?: Binding;
  targetEnvironments?: TargetEnvironmentRef[];
}

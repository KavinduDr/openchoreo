import React, {
  createContext,
  Dispatch,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useComponent, useComponentList, useOrganizationList } from "../hooks";
import { UseQueryResult } from "@tanstack/react-query";
import {
  Component,
  ComponentList,
  OrganizationList,
  Project,
  ProjectList,
} from "@open-choreo/api-client";
import { useProject, useProjectList } from "../hooks/useProjects";
import {
  genaratePath,
  useComponentHandle,
  useOrgHandle,
  useProjectHandle,
} from "@open-choreo/plugin-core";
import { useNavigate } from "react-router";
import {
  ComponentItem,
  getResourceName,
  OrganizationItem,
  ProjectItem,
} from "@open-choreo/definitions";
import {
  appStateReducer,
  IAppState,
  IAppStateAction,
  initialState,
} from "../reducers/appState";

export interface GlobalState {
  componentQueryResult: UseQueryResult<Component, Error> | null;
  componentListQueryResult: UseQueryResult<ComponentList, Error> | null;
  projectListQueryResult: UseQueryResult<ProjectList, Error> | null;
  projectQueryResult: UseQueryResult<Project, Error> | null;
  organizationListQueryResult: UseQueryResult<OrganizationList, Error> | null;
  selectedOrganization: OrganizationItem | null;
  selectedProject: ProjectItem | null;
  selectedComponent: ComponentItem | null;
  appState: IAppState;
  dispatch: Dispatch<IAppStateAction>;
}

export const GlobalStateContext = createContext<GlobalState>({
  componentQueryResult: null,
  componentListQueryResult: null,
  projectListQueryResult: null,
  projectQueryResult: null,
  organizationListQueryResult: null,
  selectedOrganization: null,
  selectedProject: null,
  selectedComponent: null,
  appState: initialState,
  dispatch: () => {},
});

export function GlobalStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [appState, dispatch] = useReducer(appStateReducer, initialState);

  const projectHandle = useProjectHandle();
  const componentHandle = useComponentHandle();
  const orgHandle = useOrgHandle();
  const navigate = useNavigate();
  const componentQueryResult = useComponent(
    orgHandle,
    projectHandle,
    componentHandle
  );
  const componentListQueryResult = useComponentList(orgHandle, projectHandle);
  const projectListQueryResult = useProjectList(orgHandle);
  const projectQueryResult = useProject(orgHandle, projectHandle);
  const organizationListQueryResult = useOrganizationList();

  useEffect(() => {
    if (
      !orgHandle &&
      organizationListQueryResult.data?.data?.items.length > 0
    ) {
      navigate(
        genaratePath({
          orgHandle: organizationListQueryResult.data.data.items[0].name,
        })
      );
    }
  }, [orgHandle, organizationListQueryResult.data]);

  const selectedOrganization = useMemo(() => {
    return organizationListQueryResult?.data?.data?.items.find(
      (org) => org.name === orgHandle
    );
  }, [organizationListQueryResult, orgHandle]);

  const selectedProject = useMemo(() => {
    return projectQueryResult?.data?.data;
  }, [projectQueryResult]);

  const selectedComponent = useMemo(() => {
    return componentQueryResult?.data?.data;
  }, [componentQueryResult]);

  return (
    <GlobalStateContext.Provider
      value={{
        componentQueryResult,
        componentListQueryResult,
        projectListQueryResult,
        projectQueryResult,
        organizationListQueryResult,
        selectedOrganization,
        selectedProject,
        selectedComponent,
        appState,
        dispatch,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

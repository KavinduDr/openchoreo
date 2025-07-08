import React, { createContext, useEffect, useMemo } from "react";
import { useComponent, useComponentList, useOrganizationList } from "../hooks";
import { UseQueryResult } from "@tanstack/react-query";
import {
  Component,
  ComponentList,
  OrganizationList,
  Project,
  ProjectList,
} from "@open-choreo/choreo-api";
import { useProject, useProjectList } from "../hooks/useProjects";
import {
  genaratePath,
  useComponentHandle,
  useOrgHandle,
  useProjectHandle,
} from "@open-choreo/plugin-core";
import { OrganizationItem } from "@open-choreo/choreo-api/dist/src/types/types";
import { useNavigate } from "react-router";

export interface GlobalState {
  componentQueryResult: UseQueryResult<Component, Error> | null;
  componentListQueryResult: UseQueryResult<ComponentList, Error> | null;
  projectListQueryResult: UseQueryResult<ProjectList, Error> | null;
  projectQueryResult: UseQueryResult<Project, Error> | null;
  organizationListQueryResult: UseQueryResult<OrganizationList, Error> | null;
  selectedOrganization: OrganizationItem | null;
}

export const GlobalStateContext = createContext<GlobalState>({
  componentQueryResult: null,
  componentListQueryResult: null,
  projectListQueryResult: null,
  projectQueryResult: null,
  organizationListQueryResult: null,
  selectedOrganization: null,
});

export function GlobalStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const projectHandle = useProjectHandle();
  const componentHandle = useComponentHandle();
  const orgHandle = useOrgHandle();
  const navigate = useNavigate();
  const componentQueryResult = useComponent(
    orgHandle,
    projectHandle,
    componentHandle,
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
        }),
      );
    }
  }, [orgHandle, organizationListQueryResult.data]);

  const selectedOrganization = useMemo(() => {
    return organizationListQueryResult?.data?.data?.items.find(
      (org) => org.name === orgHandle,
    );
  }, [organizationListQueryResult, orgHandle]);

  return (
    <GlobalStateContext.Provider
      value={{
        componentQueryResult,
        componentListQueryResult,
        projectListQueryResult,
        projectQueryResult,
        organizationListQueryResult,
        selectedOrganization,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

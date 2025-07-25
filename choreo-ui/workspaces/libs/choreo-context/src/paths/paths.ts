export enum BasePathPatterns {
  ORG_LEVEL = "organization/:orgHandle",
  PROJECT_LEVEL = "organization/:orgHandle/project/:projectHandle",
  COMPONENT_LEVEL = "organization/:orgHandle/project/:projectHandle/component/:componentHandle",
}

export enum PathsPatterns {
  ORG_LEVEL = `${BasePathPatterns.ORG_LEVEL}/*`,
  PROJECT_LEVEL = `${BasePathPatterns.PROJECT_LEVEL}/*`,
  COMPONENT_LEVEL = `${BasePathPatterns.COMPONENT_LEVEL}/*`,
}

export const genaratePath = (
  params: {
    orgHandle?: string;
    projectHandle?: string;
    componentHandle?: string;
    subPath?: string;
  },
  searchParams: Record<string, string> = {},
) => {
  const { orgHandle, projectHandle, componentHandle, subPath } = params;
  const searchParamsString = Object.entries(searchParams)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  if (componentHandle) {
    return `/organization/${orgHandle}/project/${projectHandle}/component/${componentHandle}${
      subPath ? `/${subPath}` : ""
    }?${searchParamsString}`;
  } else if (projectHandle) {
    return `/organization/${orgHandle}/project/${projectHandle}${
      subPath ? `/${subPath}` : ""
    }?${searchParamsString}`;
  } else if (orgHandle) {
    return `/organization/${orgHandle}${
      subPath ? `/${subPath}` : ""
    }?${searchParamsString}`;
  }
};

export const defaultPath = "organization/default";

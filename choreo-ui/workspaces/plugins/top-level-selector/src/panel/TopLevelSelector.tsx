import {
  AnimateSlide,
  Box,
  Level,
  LevelItem,
  TopLevelSelector,
  useChoreoTheme,
} from "@open-choreo/design-system";
import { useGlobalState } from "@open-choreo/api-client";
import {
  genaratePath,
  useComponentHandle,
  useOrgHandle,
  useProjectHandle,
} from "@open-choreo/plugin-core";
import { useNavigate } from "react-router";

const Panel: React.FC = () => {
  const theme = useChoreoTheme();
  const {
    projectQueryResult,
    componentQueryResult,
    componentListQueryResult,
    projectListQueryResult,
    organizationListQueryResult,
    selectedOrganization,
  } = useGlobalState();

  const projectName = projectQueryResult?.data?.data?.name;
  const componentName = componentQueryResult?.data?.data?.name;
  const projectList = projectListQueryResult?.data;
  const componentList = componentListQueryResult?.data;
  const organizationList = organizationListQueryResult?.data;

  const orgHandle = useOrgHandle();
  const projectHandle = useProjectHandle();
  const componentHandle = useComponentHandle();

  const navigate = useNavigate();

  const orgHome = genaratePath({ orgHandle });
  const projectHome = genaratePath({ orgHandle, projectHandle });
  const componentHome = genaratePath({
    orgHandle,
    projectHandle,
    componentHandle,
  });

  const navigateToOrg = (org: LevelItem) => {
    navigate(genaratePath({ orgHandle: org.id }));
  };

  const navigateToProject = (project: LevelItem) => {
    navigate(genaratePath({ orgHandle, projectHandle: project.id }));
  };

  const navigateToComponent = (component: LevelItem) => {
    navigate(
      genaratePath({ orgHandle, projectHandle, componentHandle: component.id }),
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={theme.spacing(1)}
      padding={theme.spacing(0, 2)}
      alignItems="center"
      height="100%"
    >
      <TopLevelSelector
        items={organizationList?.data?.items?.map((org) => ({
          label: org.displayName,
          id: org.name,
        }))}
        recentItems={[]}
        selectedItem={{
          label: selectedOrganization?.displayName,
          id: selectedOrganization?.name,
        }}
        level={Level.ORGANIZATION}
        isHighlighted={!projectName}
        onClick={() => {
          navigate(orgHome);
        }}
        onSelect={(item) => {
          navigateToOrg(item);
        }}
      />
      {projectName && (
        <AnimateSlide show={!!projectName} unmountOnExit>
          <TopLevelSelector
            items={
              projectList?.data.items?.map((project) => ({
                label: project.name,
                id: project.name,
              })) || []
            }
            recentItems={[]}
            selectedItem={{ label: projectName, id: projectName }}
            isHighlighted={!componentName}
            level={Level.PROJECT}
            onClose={() => navigate(orgHome)}
            onClick={() => {
              navigate(projectHome);
            }}
            onSelect={(item) => {
              navigateToProject(item);
            }}
          />
        </AnimateSlide>
      )}
      {componentName && (
        <AnimateSlide show={!!componentName} unmountOnExit>
          <TopLevelSelector
            items={
              componentList?.data?.items?.map((component) => ({
                label: component.name,
                id: component.name,
              })) || []
            }
            recentItems={[]}
            selectedItem={{ label: componentName, id: componentName }}
            isHighlighted={true}
            level={Level.COMPONENT}
            onClose={() => navigate(projectHome)}
            onClick={() => {
              navigate(componentHome);
            }}
            onSelect={(item) => {
              navigateToComponent(item);
            }}
          />
        </AnimateSlide>
      )}
    </Box>
  );
};

export default Panel;

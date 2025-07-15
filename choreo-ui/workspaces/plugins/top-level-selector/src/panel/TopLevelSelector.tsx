import {
  AnimateSlide,
  Box,
  Level,
  LevelItem,
  TopLevelSelector,
  useChoreoTheme,
} from "@open-choreo/design-system";
import {
  useSelectedOrganization,
  useSelectedProject,
  useProjectList,
  useSelectedComponent,
  useOrganizationList,
  useComponentList,
} from "@open-choreo/choreo-context";
import {
  getResourceDisplayName,
  getResourceName,
} from "@open-choreo/definitions";
import {
  genaratePath,
  useComponentHandle,
  useOrgHandle,
  useProjectHandle,
} from "@open-choreo/plugin-core";
import { useNavigate } from "react-router";

const Panel: React.FC = () => {
  const theme = useChoreoTheme();

  const orgHandle = useOrgHandle();
  const projectHandle = useProjectHandle();
  const componentHandle = useComponentHandle();
  const res = useSelectedOrganization();

  const { data: selectedOrganization } = useSelectedOrganization();

  const { data: selectedProject } = useSelectedProject();

  const { data: selectedComponent } = useSelectedComponent();

  const { data: organizationList } = useOrganizationList();
  const { data: projectList } = useProjectList(orgHandle);
  const { data: componentList } = useComponentList(orgHandle, projectHandle);

  const projectDisplayName = getResourceDisplayName(selectedProject?.data);
  const componentDisplayName = getResourceDisplayName(selectedComponent?.data);
  const orgDisplayName = getResourceDisplayName(selectedOrganization?.data);
  const projectName = getResourceName(selectedProject?.data);
  const componentName = getResourceName(selectedComponent?.data);
  const orgName = getResourceName(selectedOrganization?.data);

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
          label: getResourceDisplayName(org),
          id: org.name,
        }))}
        recentItems={[]}
        selectedItem={{
          label: selectedOrganization?.displayName,
          id: selectedOrganization?.name,
        }}
        level={Level.ORGANIZATION}
        isHighlighted={!projectDisplayName}
        onClick={() => {
          navigate(orgHome);
        }}
        onSelect={(item) => {
          navigateToOrg(item);
        }}
      />
      {projectDisplayName && (
        <AnimateSlide show={!!projectDisplayName} unmountOnExit>
          <TopLevelSelector
            items={
              projectList?.data?.items?.map((project) => ({
                label: getResourceDisplayName(project),
                id: project.name,
              })) || []
            }
            recentItems={[]}
            selectedItem={{ label: projectDisplayName, id: projectName }}
            isHighlighted={!componentDisplayName}
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
      {componentDisplayName && (
        <AnimateSlide show={!!componentDisplayName} unmountOnExit>
          <TopLevelSelector
            items={
              componentList?.data?.items?.map((component) => ({
                label: getResourceDisplayName(component),
                id: component.name,
              })) || []
            }
            recentItems={[]}
            selectedItem={{
              label: componentDisplayName,
              id: componentName,
            }}
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

import { Box, Toggler, useChoreoTheme } from "@open-choreo/design-system";
import { useColorMode } from "@open-choreo/choreo-context";
import React from "react";

const TopRightMenuPanel: React.FC = () => {
  const theme = useChoreoTheme();
  const { colorMode, setColorMode } = useColorMode();
  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={theme.spacing(1)}
      padding={theme.spacing(0, 2)}
      alignItems="center"
      height="100%"
    >
      <Toggler
        key={colorMode}
        onClick={() => {
          setColorMode(colorMode === "light" ? "dark" : "light");
        }}
        checked={colorMode === "light"}
        color="primary"
        size="small"
      />
    </Box>
  );
};

export default TopRightMenuPanel;

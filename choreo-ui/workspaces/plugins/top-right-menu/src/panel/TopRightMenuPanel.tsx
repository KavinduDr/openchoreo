import { Box, Typography, useChoreoTheme } from "@open-choreo/design-system";
import React from "react";

const TopRightMenuPanel: React.FC = () => {
  const theme = useChoreoTheme();
  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={theme.spacing(1)}
      padding={theme.spacing(0, 2)}
      alignItems="center"
      height="100%"
    >
      <Box
        display="flex"
        flexDirection="row"
        backgroundColor="secondary.light"
        gap={theme.spacing(1)}
        alignItems="center"
        padding={theme.spacing(0.5)}
      >
        <Typography variant="h4">TopRightMenu</Typography>
      </Box>
    </Box>
  );
};

export default TopRightMenuPanel;

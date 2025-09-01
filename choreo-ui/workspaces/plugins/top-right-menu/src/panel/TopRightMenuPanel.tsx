import React from "react";
// import { useAuthContext } from "@asgardeo/auth-react";
import { useAuth } from "@open-choreo/auth-core";
import { useColorMode } from "@open-choreo/choreo-context";
import {
  Box,
  Button,
  Toggler,
  useChoreoTheme,
} from "@open-choreo/design-system";

const TopRightMenuPanel: React.FC = () => {
  const theme = useChoreoTheme();
  const { colorMode, setColorMode } = useColorMode();
  const { user, isAuthenticated, login, logout } = useAuth();
  console.log(user, isAuthenticated);
  return (
    <>
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
      {!user && <Button onClick={() => login()}>Sign In</Button>}
      {user && <Button onClick={() => logout()}>Sign Out</Button>}
    </>
  );
};

export default TopRightMenuPanel;

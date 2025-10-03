import React from "react";
// import { useAuthContext } from "@asgardeo/auth-react";
import { useAuth } from "@open-choreo/auth-core";
import { useColorMode } from "@open-choreo/choreo-context";
import {
  Box,
  Toggler,
  useChoreoTheme,
  Button,
} from "@open-choreo/design-system";
import { useNavigate } from "react-router";

const TopRightMenuPanel: React.FC = () => {
  const theme = useChoreoTheme();
  const { colorMode, setColorMode } = useColorMode();
  const { user, isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();
  // eslint-disable-next-line no-console
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
      {!user && (
        <Button
          onClick={() => {
            navigate("/auth/login");
            login();
          }}
        >
          Sign In
        </Button>
      )}
      {user && (
        <Button
          onClick={() => {
            navigate("/");
            logout();
          }}
        >
          Sign Out
        </Button>
      )}
    </>
  );
};

export default TopRightMenuPanel;

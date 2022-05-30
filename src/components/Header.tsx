import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Link } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { User } from "../models/user";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const drawerWidth: number = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface Props {
  name?: string;
}

const Header = ({ name }: Props) => {
  const [user, setUser] = useState(new User());

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("user");

      setUser(
        new User(
          data.id,
          data.first_name,
          data.last_name,
          data.email,
          data.role
        )
      );
    };

    getUser();
  }, []);

  const logout = async () => {
    await axios.post("logout", {});
  };

  return (
    <AppBar position="fixed">
      <Box sx={{ display: "flex" }}>
        <Typography
          variant="h6"
          noWrap
          sx={{
            flexGrow: 1,
            height: 70,
            marginLeft: 3,
            alignItems: "center",
            display: "flex",
          }}
        >
          {name}
        </Typography>
        <Link
          href="/profile"
          variant="subtitle1"
          underline="none"
          sx={{
            display: "flex",
            height: 70,
            marginLeft: 3,
            alignItems: "center",
            justifyContent: "flex-end",
            mr: 3,
            color: "white",
          }}
        >
          {user.name}
        </Link>
        <Link
          href="/login"
          underline="none"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            color: "white",
            pr: 4,
            alignItems: "center",
          }}
          onClick={logout}
        >
          Sign Out
        </Link>
      </Box>
    </AppBar>
  );
};

export default Header;

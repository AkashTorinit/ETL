import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem as MenuItemDropdown,
  Tooltip,
} from "@mui/material"
import axios from "axios"
import { Box, styled } from "@mui/system"
import React, { memo } from "react"
import Link from "next/link"
import useUser from "./hooks/useUser"
import Router from "next/router"
import { useCookies } from "react-cookie"

interface ApplicationAppBarProps {
  title?: string;
  secondaryTitle?: string;
  subtitle?: string;
  secondarySubtitle?: string;
}

interface MenuItemType {
  url: string;
  label: string;
}

const ApplicationAppBar = ({ title }: ApplicationAppBarProps) => {
  const user: any = useUser();
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie, removeCookie] = useCookies(["tok"]);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const fetchData = async (data: any) => {
    // eslint-disable-next-line quotes
    const page = data.page - 1;
    const skipRecords = page * data.rowsPerPage;
    //

    return await axios.get(
      `/api/getUsers?limit=${data.rowsPerPage}&skip=${skipRecords}&sortBy=${data.sort_column}&sort=${data.sort_type}`
    );
  };

  const menuOptions = [
    { label: "Upload File", url: "/uploadFile" },
    { label: "Uploaded File", url: "/allFiles" },
  ];

  const adminMenuOptions = [
    { label: "Dashboard", url: "/dashboard" },
    { label: "Add User", url: "/addUser" },
  ];

  const LinkItem = styled("a")({
    "&:hover": {
      color: "red",
      textDecoration: "underline",
      textDecorationColor: "red",
      textDecorationThickness: "3px",
      textUnderlineOffset: "10px",
      cursor: "pointer",
    },
  });

  const style = {
    TypographyStyle: {
      fontFamily: "futura-pt",
      fontSize: "18px",
      marginLeft: "30px",
    },
  };

  const MenuItem = (x: MenuItemType) => {
    return (
      <Typography key={x.url} style={style.TypographyStyle}>
        <Link href={x.url} passHref>
          <LinkItem>{x.label}</LinkItem>
        </Link>
      </Typography>
    );
  };

  const handleLogout = () => {
    removeCookie("tok");
    document.cookie = "tok=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    Router.push("/login");
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      sx={{
        padding: "2px",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width={"100%"}
        >
          <Box display={"flex"} flexDirection={"row"} alignItems="center">
            <img
              src="vercel.svg"
              alt="vercel logo"
              height="40px"
              width="40px"
              style={{ cursor: "pointer" }}
            />
            <Typography paddingLeft="15px">{title}</Typography>
          </Box>
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="center"
            marginLeft={"30px"}
          >
            {/* Other Options */}
            <Box display="flex" alignItems="center">
              {user.role === "ADMIN"
                ? adminMenuOptions.map((x) => {
                    return MenuItem(x);
                  })
                : menuOptions.map((x) => {
                    return MenuItem(x);
                  })}
            </Box>
            {/* Dropdown Options */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      user.profilePicture === "undefined" ||
                      !user.profilePicture
                        ? "/v2/user-placeholder.png"
                        : user.profilePicture
                    }
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* Below options are for the users  */}
                <Link href={"/account/profile"} passHref>
                  <MenuItemDropdown>
                    <Typography
                      component="span"
                      fontFamily={"futura-pt"}
                      fontSize="18px"
                      textAlign="center"
                    >
                      Profile
                    </Typography>
                  </MenuItemDropdown>
                </Link>
                <Link href={"/account/changePassword"} passHref>
                  <MenuItemDropdown>
                    <Typography
                      component="span"
                      fontFamily={"futura-pt"}
                      fontSize="18px"
                      textAlign="center"
                    >
                      Change Password
                    </Typography>
                  </MenuItemDropdown>
                </Link>
                <MenuItemDropdown onClick={() => handleLogout()}>
                  <Typography
                    component="span"
                    fontFamily={"futura-pt"}
                    fontSize="18px"
                    textAlign="center"
                  >
                    Logout
                  </Typography>
                </MenuItemDropdown>
              </Menu>
            </Box>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default memo(ApplicationAppBar);

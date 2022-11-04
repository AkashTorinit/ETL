import * as React from 'react';
import Box from '@mui/material/Box';
import {IconButton,List,Divider,ListItem,ListItemText,ListItemButton,Collapse,Drawer,CssBaseline,Toolbar} from "@mui/material";
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Link from "next/link";
import { useCookies } from "react-cookie";
import Router from "next/router";
import useUser from '../application/hooks/useUser'
import { useRouter } from "next/router";

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
const drawerWidth = 325;

export default function PermanentDrawerLeft(title:any) {
  const [cookie, setCookie, removeCookie] = useCookies(["tok"]);
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openfile, setOpenfile] = React.useState(false);
  const [opensetting, setOpensetting] = React.useState(false);
  const [select, setSelect] = React.useState<any>();
  // const [selectFile, setSelectFile] = React.useState<any>();
  // const [selectSettings, setSelectSettings] = React.useState<any>();
  const user = useUser()
  const handleClick = () => {
    setOpen(!open);
    setOpensetting(false)
    setOpenfile(false)
    
  };


  const handleAdminClick = (e:any,index:number) => {
    setSelect(index)
    console.log(index)
    setMobileOpen(!mobileOpen);
    // setMobileOpen(!mobileOpen);
  }
  const handleClickfile = () => {
    setOpenfile(!openfile);
    setOpensetting(false)
    setOpen(false)
  
    // setMobileOpen(!mobileOpen);
  };
  const handleClicksettings = () => {
    setOpensetting(!opensetting);
    setOpen(false)
    setOpenfile(false)
   
    // setMobileOpen(!mobileOpen);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleLogout = () => {
    // console.log(window.location.host);
    removeCookie('tok');
    document.cookie = 'tok=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    Router.push("/login");
  };
  const router = useRouter();
  React.useEffect(()=>{

    if(router.pathname.includes('dashboard'))
    {
       setSelect(0);

    }
    else if(router.pathname.includes('addUser'))
    {
      setSelect(1);
    }
    else if(router.pathname.includes('adminFiles'))
    {
      setSelect(2);
    }
    else if(router.pathname.includes('profile'))
    {
      setSelect(3);
    }
    else if(router.pathname.includes('account/changePassword'))
    {
      setSelect(4);
    }

  },[])

  const drawer = (
    <div>
        <Toolbar />
        <List >
    <ListItem >
      <AccountCircleIcon sx={{width: 48, height: 70}}/>
      <ListItemButton>
        <ListItemText primary={user?.email}/>
        </ListItemButton>
    </ListItem>
</List>
        <Divider />
        <List sx={{"&:hover": {
                        backgroundColor: "#35363D",
                        color: "white",
                        "& .MuiListItemIcon-root": {
                          color: "yellow"
                        }
                      }}}>
          <ListItem disablePadding onClick={handleClick} >
            <ListItemButton>
              <ListItemText primary={"Users"} />
            </ListItemButton>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </List>
        <Divider />
        <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{paddingBottom:'0',paddingTop:'0'}}>
          {['List of users', 'Add users'].map((text, index) => (
            <Link href={text ==  'List of users' ? "/dashboard" : text ==  'Add users' ? "/addUser" :"" } passHref>
            <ListItem onClick={(e:any) => handleAdminClick(e,index)}key={text} disablePadding sx={{backgroundColor:index == select ? "#37D9BD" : "" ,cursor:'pointer'}}>
              <ListItemButton >
                <ListItemText secondary={text} />
              </ListItemButton>
            </ListItem>
            </Link>
          ))}
        </List>
        </Collapse>
        <Divider />
        <List sx={{"&:hover": {
                        backgroundColor: "#35363D",
                        color: "white",
                        "& .MuiListItemIcon-root": {
                          color: "#35363D"
                        }
                      }}}>
          <ListItem disablePadding onClick={handleClickfile} >
            <ListItemButton>
                <ListItemText primary={"Files"} />
                </ListItemButton>
                {openfile ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
        </List>
        <Divider />
        <Collapse in={openfile} timeout="auto" unmountOnExit>
        <List sx={{paddingBottom:'0',paddingTop:'0'}}>
          {['List of Files'].map((text, index) => (
             <Link href={"/adminFiles"} passHref>
            <ListItem onClick={(e:any) => handleAdminClick(e,index+2)} key={text} disablePadding sx={{backgroundColor:index+2 == select ? "#37D9BD" : "" ,cursor:'pointer'}}>
            <ListItemButton>
                <ListItemText secondary={text} />
              </ListItemButton>
            </ListItem>
            </Link>
          ))}
        </List>
        </Collapse>
        <Divider />
        <List sx={{"&:hover": {
                        backgroundColor: "#35363D",
                        color: "white",
                        "& .MuiListItemIcon-root": {
                          color: "yellow"
                        }
                      }}}>
          <ListItem disablePadding onClick={handleClicksettings} >
            <ListItemButton>
                <ListItemText primary={"Settings"} />
                </ListItemButton>
                {opensetting ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
        </List>
        <Divider />
        <Collapse in={opensetting} timeout="auto" unmountOnExit>
        <List sx={{paddingBottom:'0',paddingTop:'0'}}>
          {['Profile', 'Change Password'].map((text, index) => (
            <Link href={text ==  'Profile' ? "/account/profile" : text ==  'Change Password' ? "/account/changePassword" :"" } passHref>
            <ListItem  onClick={(e:any) => handleAdminClick(e,index+3)} key={text} disablePadding sx={{backgroundColor:index+3 == select ? "#37D9BD" : "" ,cursor:'pointer'}}>
              <ListItemButton>
                <ListItemText
secondary={text} />
              </ListItemButton>
            </ListItem>
            </Link>
          ))}
        </List>
        </Collapse>
        <Divider />
        <List sx={{"&:hover": {
                        backgroundColor: "#35363D",
                        color: "white",
                        "& .MuiListItemIcon-root": {
                          color: "#35363D"
                        }
                      }}}>
          <ListItem disablePadding >
            <ListItemButton onClick={() => handleLogout()}>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
    </div>
  );


  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' },color:'darkblue' ,width:'65px'}}
            >
            <MenuIcon/>
            </IconButton>
        </AppBar>
        

    {/* <Hidden xsDown implementation='css'>    */}
      <Drawer
        sx={{
          display: { xs: "block", sm: "none" },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: "#E2E8EA"
          },
        }}
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        // container={container}
      >
        {drawer}
        </Drawer>
      
  

      <Drawer
          variant="permanent"
          
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#E2E8EA"
             
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default' }}
      >
         {/* <DenseTable /> */}
      </Box>
    </Box>
  );
}
import * as React from "react";
import Box from "@mui/material/Box";
import { AppBar,IconButton  } from "@mui/material";
import { styled } from '@mui/material/styles';
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useUser from "../../components/application/hooks/useUser";
import Router from "next/router";
import CircleIcon from "@mui/icons-material/Circle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import LockResetIcon from "@mui/icons-material/LockReset";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from '@mui/icons-material/Menu';
import { borderBottom } from "@mui/system";
import { useRouter } from "next/router";
const drawerWidth = 312;
const handleLogout = () => {
  Router.push("/login");
};
interface Props {
  window?: () => Window;
}



export default function DrawerBar(props: Props) {
  const { window } = props;
  const user = useUser();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [opensetting, setOpensetting] = React.useState(false);
  const [select, setSelect] = React.useState<any>();
  const [title,setTitle]=React.useState<string>('');
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleListItemClick = (e:any,index: number) => {
    e.preventDefault()
    if (index === 1) {
      Router.push("/uploadFile");
    }
    if (index === 2) {
      Router.push("/allFiles");
    }
    setSelect(index);
    setTitle('')
    setMobileOpen(!mobileOpen);
  };
  const handleClicksettings = () => {
    setOpensetting(!opensetting);
  };
  const handleTitle=(text:string)=>{
        setTitle(text)
        setSelect(5);
        setMobileOpen(!mobileOpen);
  }

  React.useEffect(()=>{

    if(router.pathname.includes('uploadFile'))
    {
       setSelect(1);

    }
    else if(router.pathname.includes('allFiles'))
    {
      setSelect(2);
    }
    else if(router.pathname.includes('profile'))
    {
      setTitle('0')
    }
    else if(router.pathname.includes('profile'))
    {
      setTitle('Profile')
    }
    else if(router.pathname.includes('changePassword'))
    {
      setTitle('Change Password')
    }

  },[])
  const router = useRouter();
    const drawer = (
       <div>
       <Divider />
      <List sx={{ backgroundColor: "#35363E", paddingBottom: "0",paddingTop:'0' }}>
        {[`${user?.email}`, "DASHBOARD", "FILES"].map((text, index) => (
          <ListItem
            key={index}
            sx={{ borderBottom: "1px solid #ddd", padding: "20px",backgroundColor:index == select ? "#37D9BD" : "" ,cursor:'pointer'}}
            disablePadding
            onClick={(e:any) => handleListItemClick(e,index)}
          >
               <ListItemIcon>
                {index === 0 ? (
                  <AccountCircleIcon
                    sx={{ color: "#FFFFFF" }}
                    className="sidebar_avatar"
                  />
                ) : index === 1 ? (
                  <CircleIcon
                    sx={{ color: "#00AE8F" }}
                    className="sidebar_green"
                  />
                ) : (
                  <CircleIcon
                    sx={{ color: "#FF813A" }}
                    className="sidebar_orange"
                  />
                )}
              </ListItemIcon>
              <ListItemText key={text}  primary={text} />
            {/* </Button> */}
          </ListItem>
        ))}
      </List>
      <List sx={{paddingBottom:'0'}}>
        <ListItem
          sx={{ borderBottom: "1px solid #ddd", padding: "10px",cursor:'pointer',paddingBottom:'0px !important' }}
          disablePadding
          onClick={handleClicksettings}
          key={'Settings-list'}
        >
          <ListItemButton sx={{marginBottom:'18px'}}  key={'Settings-btn'}>
            <ListItemIcon
              sx={{
                width: "32px",
                height: "32px",
                minWidth: "45px !important",
                color: "#FFFFFF",
              }}
              key={'Settings-icon'}
            >
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText  key={'Settings'} primary={"SETTINGS"} />
          </ListItemButton>
          {opensetting ? <ExpandLess sx={{marginBottom:'22px'}} /> : <ExpandMore sx={{marginBottom:'22px'}} />}
        </ListItem>
      </List>
     
      <Collapse in={opensetting} >
        <List sx={{paddingTop:'0'}}>
          {["Profile", "Change Password"].map((text, index) => (
            <Link
              key={index}
              href={
                text == "Profile"
                  ? "/account/profile"
                  : text == "Change Password"
                  ? "/account/changePassword"
                  : ""
              }
              passHref
            >
              <ListItem
                sx={{
                  padding:'10px',      
                  backgroundColor:(title===text)? "#37D9BD":'',
                  cursor:'pointer',
                  paddingTop:'0'
                }}
                onClick={(e:any)=>{handleTitle(text)}}
                key={index+3}
                disablePadding
              >
                <ListItemButton key={index+6}>
                  {/* <ListItemIcon>
                                { index === 0 ? <AccountCircleIcon sx={{color:'#FFFFFF',marginLeft:'13px'}} className="sidebar_avatar"/> :  <LockResetIcon sx={{marginLeft:'13px',color:'#FFFFFF'}} className="sidebar_green"/>
                                }
               </ListItemIcon> */}
                  <ListItemText sx={{marginLeft:'10px'}} key={text} primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Collapse>
      <Divider sx={{ bgcolor: "white", marginTop: "-10px" }} />
      {/* <Divider sx={{ bgcolor: "white" }} /> */}
      <List sx={{ backgroundColor: "#35363E" }}>
        {["LOGOUT"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={handleLogout}
            sx={{
              backgroundColor: "#35363E",
              borderBottom: "1px solid #ddd",
              padding: "10px",
              cursor:'pointer'
            }}
          >
            <ListItemButton key={'logout_btn'}>
              <ListItemIcon key={'logout_icon'} sx={{ height: "32px", width: "32px" }}>
                {index === 1 ? (
                  <InboxIcon />
                ) : (
                  <LogoutIcon sx={{ marginLeft: "6px", color: "#FFFFFF" }} />
                )}
              </ListItemIcon>
              <ListItemText key={'logout'} sx={{marginLeft:'-3px'}} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box>
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
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#35363E",
              color:'white'
            },
          }}
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
              backgroundColor: "#35363E",
              color: "#FFFFFF",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
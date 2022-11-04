import React, { useState,memo,useEffect } from "react";
import { useRouter } from 'next/router'

import dynamic from "next/dynamic";
import { Box } from "@mui/material";
// import UserTableView from "./userTableView";
const UserTableView = dynamic(() => import("./userTableView"));
// import SearchBar from "../application/SearchBar";
// import PermanentDrawerLeft from "../drawerbar/drawerbar"

function DashboardComponent() {
  const [searchValueList, setSearchValueList] = useState<string[]>([""]);
  const [search, setSearch] = useState<string>("");


  const router = useRouter()


 

useEffect(() => {
  router.beforePopState(({ url, as, options }) => {


    if (as == '/login' || router.pathname == '/dashboard') {
      
      
      history.go(1);
      return false
    }

    return true
  })
}, [])
  return (
    <>
    <Box sx={{display: 'flex'}}>
    {/* <PermanentDrawerLeft /> */}
      {/* <SearchBar
        search={search}
        setSearch={setSearch}
        searchValueList={searchValueList}
        setSearchValueList={setSearchValueList}
      /> */}
      <Box padding={"30px"} sx={{marginLeft:{md:'19rem',sm:'0rem'},width:'100%'}}>
        <UserTableView search={searchValueList[0]} />
      </Box>
      </Box>
    </>
  );
}

export default memo(DashboardComponent);

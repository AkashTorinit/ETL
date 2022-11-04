import React, { SyntheticEvent, useState, useEffect } from "react";
import { Input, Box, Grid, Button } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Modal from "@mui/material/Modal";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import jwt from "jwt-decode";
import { useCookies } from "react-cookie";
import BasicTable from "./ListItemTable";
interface ProfileDataType {
  imagePath: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
}
export function DisplayAllFileComponent(user: any) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [allimages, setAllimages] = useState<any>();
  const [Link, setLink] = useState<any>();
  const [cookie, setCookie, removeCookie] = useCookies(["tok"]);
  const [img, setimg] = React.useState("");
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  // setOpen(true)
  useEffect(() => {
    fetchimages();
  }, []);
  function searchuser(e: any) {
    const result = allimages.filter((obj: any) => {
      return (
        obj.first_name == e.target.value.toLowerCase() ||
        obj.last_name.toLowerCase() == e.target.value.toLowerCase() ||
        `${obj.first_name.toLowerCase()} ${obj.last_name.toLowerCase()}` ==
          e.target.value.toLowerCase() ||
        obj.email.toLowerCase() == e.target.value.toLowerCase() ||
        obj.uploaded_record_url.substring(64).toLowerCase() ==
          e.target.value.toLowerCase()
      );
    });

    // :point_down:️ [{name: 'Alice', department: 'accounting'},
    //     {name: 'Carl', department: 'accounting'}]

    if (result.length) {
      setAllimages(result);
    } else {
      fetchimages();
    }
  }
  const fetchimages = async () => {
    const getuserIdjwt: any = jwt(cookie.tok);
    if (getuserIdjwt.userId) {
      let response = await axios.get(`/api/getallimages`);

      setAllimages(response?.data?.records);
    }
  };
  return (
    <>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <h1 style={{ color: "#37D9BD", textAlign: "left" }}> Files</h1>
             
                <Box>
                  <input
                  style={{
                    background: "#E2E8EA",
                    borderRadius: "8px",
                    border: "none",
                    width: "324px",
                    height: "36px",
                  }}
                    type="text"
                    className="searchTerm "
                    placeholder="Search files"
                    onChange={(e) => searchuser(e)}
                  ></input>
                </Box>
              </Box> */}

        {allimages ? (
          <BasicTable allimages={allimages} searchuser={searchuser} />
        ) : null}
      </Box>
    </>
  );
}

export default DisplayAllFileComponent;

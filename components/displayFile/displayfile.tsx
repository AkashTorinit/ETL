import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Input, Box, Grid, Button } from "@mui/material";
import jwt from "jwt-decode";
import { useCookies } from "react-cookie";
import DrawerBar from "../../pages/uploadFile/DrawerBar";
interface ProfileDataType {
  imagePath: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
}
export function DisplayFileComponent(user: any) {
  const [allImages, setAllImages] = useState<any>();
  const [cookie, setCookie, removeCookie] = useCookies(["tok"]);
  const [searchItem, setSearchItem] = useState<any>("");
  useEffect(() => {
    fetchimages();
  }, []);
  const fetchimages = async () => {
    const getuserIdjwt: any = jwt(cookie.tok);
    if (getuserIdjwt.userId) {
      const response = await axios.get(
        `/api/getUsersImages?userId=${getuserIdjwt.userId}`
      );
      setAllImages(response?.data?.records);
    }
  };
  return (
    <>
      {/* <Grid
              container
              justifyContent="center"
              wrap="wrap"
              sx={{
                  backgroundColor: "rgb(255, 255, 255)",
                  height: "100vh",
                  marginLeft:{md: "10%",sm:'0'},
                  width: "auto",
              }}
          >
              <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  xl={12}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
              >
                  <Box
                      sx={{
                          width: {md:"100%",sm:"100vw"},
                          height: "100vh",
                          backgroundColor: "rgb(255, 255, 255)",
                          textAlign: "center",
                          padding: {md:"2rem 1.875rem 5rem 1.875rem",sm:'0'},
                          marginLeft: {md:"4rem",sm:'0rem'},
                          overflowY: "scroll",
                          scrollbarWidth: "10px",
                          scrollbarColor: "#6969DD #E0E0E0",
                      }}
                  >
                      <Box className="displayFile__search" sx={{ textAlign: "right" }}>
                          <SearchIcon
                              sx={{
                                  width: "50px",
                                  color: "black",
                                  marginBottom: "-10px",
                                  marginRight: "-7px",
                                  marginTop:'80px'
                              }}
                          />
                          <input
                              type="search"
                              placeholder="Search Here"
                              onChange={(e) => {
                                  setSearchItem(e.target.value)
                              }}
                              style={{
                                  background: "#E2E8EA",
                                  borderRadius: "8px",
                                  border: "none",
                                  width: "324px",
                                  height: "36px",
                              }}
                          />
                      </Box>
                      <h1 className="File_Heading" style={{ color: "#37D9BD", textAlign: "left",marginLeft:'10rem' }}> Files</h1>
                      <div className="UserFile__Container">
                        <Box sx={{width:'100%',display:'flex'}}>
                          <List sx={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                            <ListItem>
                              <ListItemText className="li_name" disableTypography sx={{color:'#37D9BD',fontSize:'18px',fontWeight:'700',flex:'2',padding: "15px",minWidth:{md:'434px',sm:'auto'}}}>File Name</ListItemText>
                              </ListItem>
                              <ListItem sx={{marginLeft:'-7rem'}}>
                              <ListItemText className="li_time" disableTypography sx={{color:'#37D9BD',fontSize:'18px',fontWeight:'700',textAlign:'center',flex:'1',padding: "15px"}}>Upload Time</ListItemText>
                              </ListItem>
                              <ListItem className="ul_comment" sx={{marginRight:'184px',marginLeft:'-6rem'}}>
                              <ListItemText className="li_comment"  disableTypography sx={{color:'#37D9BD',fontSize:'18px',fontWeight:'700',textAlign:'center',flex:'1',padding: "15px",paddingLeft:'0'}}>User Comment</ListItemText>
                              </ListItem>
                          </List>
                        </Box>
                          <List style={{ backgroundColor: "" }}>
                              {allImages
                                  ? allImages
                                      .filter((allimage: any) => {
                                          if (searchItem == "") {
                                              return allimage
                                          } else if (
                                              allimage?.filename
                                                  .toLowerCase()
                                                  .includes(searchItem?.toLowerCase())
                                          )
                                          {
                                              return allimage
                                          }
                                      })
                                      .map((allimage: any) => {
                                        
                                          return (
                                              <ListItem key={allimage.uploaded_record_id} disablePadding>
                                                  <div className = "userFile_name"
                                                      style={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                          justifyContent: "space-between",
                                                          width: "100%",
                                                          height: "67px",
                                                          padding: "36px 0",
                                                      }}
                                                  >
                                                      <span
                                                        
                                                          style={{
                                                              display: "flex",
                                                              justifyContent: "space-around",
                                                              alignItems: "center",
                                                              width: "100%",
                                                              borderBottom: "1px solid #C9D0D5",
                                                          }}
                                                      >
                                                          {
                                                              <ListItemText className="userFile_filename" key={allimage.uploaded_record_id+'a'}
                                                                  sx={{ color: "black", padding: "15px",flex:"2" ,wordBreak:'break-all',maxWidth:'404px'}}
                                                                  disableTypography
                                                                  primary={ allimage?.filename}
                                                              />
                                                          }
                                                          {
                                                              
                                                              <ListItemText className="userFile_date" key={allimage.uploaded_record_id+'b'}
                                                                  sx={{ color: "black", padding: "15px",flex:'1',wordWrap: 'break-word' }}
                                                                  disableTypography
                                                                  primary={new Date(allimage.created_date_time).toLocaleString()}
                                                              />
                                                          }
                                                           {
                                                              <ListItemText className="userFile_comment" key={allimage.uploaded_record_id+'c'}
                                                                  sx={{ color: "black", padding: "15px",flex:'1',wordWrap: 'break-word' }}
                                                                  disableTypography
                                                                  primary={allimage?.user_comments ? allimage?.user_comments : "-----" }
                                                              />
                                                          }
                                                          <Button
                                                              size="small"
                                                              className="view_btn"
                                                              onClick={() => {
                                                                window.open(allimage?.uploaded_record_url, "_blank")
                                                              }}
                                                              sx={{
                                                                  background: "#FFFFFF",
                                                                  border: "1px solid #37D9BD",
                                                                  borderRadius: "32px",
                                                                  width: "87px",
                                                                  height: "38px",
                                                                  padding: "14px 32px",
                                                                  color: "#37D9BD",
                                                                  fontSize: "16px",
                                                                  marginRight:"30px"
                                                              }}
                                                          >
                                View
                                                          </Button>
                                                      </span>
                                                  </div>
                                              </ListItem>
                                          )
                                      })
                                  : ""}
                          </List>
                      </div>
                  </Box>
              </Grid>
          </Grid> */}
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%",height:'100%' }}>
      
        <Box className="displayFile__search" sx={{ textAlign: "right" }}>
          {/* <SearchIcon
            sx={{
              width: "50px",
              color: "black",
              marginBottom: "-10px",
              marginTop: "80px",
            }}
          /> */}
          <input
            type="search"
            placeholder="Search Here"
            onChange={(e) => {
              setSearchItem(e.target.value);
            }}
            style={{
              background: "#E2E8EA",
              borderRadius: "8px",
              border: "none",
              width: "324px",
              height: "36px",
              marginBottom: "40px",
              marginRight:'40px',
              marginTop: "80px",
              textIndent:'10px'
            }}
          />
          
        </Box>
        
        <TableContainer component={Paper}>
          <Table
            sx={{ width: "1200px", marginLeft: { md: "20rem", sm: "0rem" },overflow:"scroll" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "30%",color: "#37D9BD",fontSize:'14px',fontWeight:'700',maxWidth:'280px' }} align="left">
                  File Name
                </TableCell>
                <TableCell sx={{ width: "22%",color: "#37D9BD",fontSize:'14px',fontWeight:'700', }} align="left">
                  Upload Time
                </TableCell>
                <TableCell sx={{ width: "25%",color: "#37D9BD",fontSize:'14px',fontWeight:'700', }} align="left">
                  User Comments
                </TableCell>
               
                <TableCell sx={{ width: "25%",color: "#37D9BD", fontSize:'14px',fontWeight:'700',}} align="left">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allImages
                ? allImages
                    .filter((allimage: any) => {
                      if (searchItem == "") {
                        return allimage;
                      } else if (
                        allimage?.filename
                          .toLowerCase()
                          .includes(searchItem?.toLowerCase())
                      ) {
                        return allimage;
                      }
                    })
                    .map((allimage: any) => (
                      <TableRow
                        key={allimage?.uploaded_record_id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          sx={{ wordBreak: "break-all" }}
                          align="left"
                          component="th"
                          scope="row"
                          
                        >
                          {allimage?.filename}
                        </TableCell>
                        <TableCell align="left">
                         <p style={{padding:'0',margin:'0'}}>{new Date(allimage.created_date_time).toLocaleString().slice(0,10)}</p>
                         <p>{new Date(allimage.created_date_time).toLocaleString().substring(11)}</p>
                        </TableCell>
                        <TableCell  sx={{ wordBreak: "break-all" }}
                          align="left"
                          component="th"
                          scope="row">
                              {allimage?.user_comments ? allimage?.user_comments : "-----" }</TableCell>
                        <TableCell align="left">
                          <Button
                            className="file__view"
                            onClick={() =>
                              window.open(
                                allimage?.uploaded_record_url,
                                "_blank"
                              )
                            }
                            sx={{
                              background: "#FFFFFF",
                              border: "1px solid #37D9BD",
                              borderRadius: "32px",
                              width: "87px",
                              height: "38px",
                              padding: "14px 32px",
                              color: "#37D9BD",
                              fontSize: "16px",
                              // marginRight:'30px'
                            }}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
export default DisplayFileComponent;

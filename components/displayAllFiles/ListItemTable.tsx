import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Input, Box, Grid, Button } from "@mui/material";

function createData(
  name: any,
  calories: any,
  fat: any,
  carbs: any,
  protein: any
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable(props: any) {
  let { allimages, searchuser } = props;
  const [searchItem, setSearchItem] = React.useState<any>("")
 
    console.log(allimages)
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" ,width:'100%'}}>
        <Box className="admin_search"
          sx={{
            display: "flex",
            marginTop: "2rem",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{ color: "#37D9BD", marginLeft: "2rem",marginRight:'3rem' }}> Files</h1>

          <input
            style={{
              background: "#E2E8EA",
              borderRadius: "8px",
              border: "none",
              width: "324px",
              height: "36px",
              marginRight: "46px",
              marginTop:'30px',
              textIndent:'10px'
            }}
            type="text"
            className="searchTerm "
            placeholder="Search files"
            onChange={(e) => {
              setSearchItem(e.target.value)
             }}>
          </input>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ width: '1200px' ,marginLeft:{md:'20rem',sm:'0rem'}}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "20%" }} align="left">File Name</TableCell>
                <TableCell sx={{ width: "10%" }} align="left">
                  Email
                </TableCell>
                <TableCell sx={{ width: "10%" }} align="left">
                  Full Name
                </TableCell>
                <TableCell sx={{ width: "10%" }} align="left">
                  Created Date
                </TableCell>
                <TableCell sx={{ width: "10%" }} align="left">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                
               allimages
                ? allimages.filter((allimage: any) => {
                  if (searchItem == "") {
                      return allimage
                  } else if (
                      allimage?.filename.concat(allimage?.email).concat(allimage?.first_name).concat(allimage?.last_name)
                          .toLowerCase()
                          .includes(searchItem?.toLowerCase())
                  )
                  {
                      return allimage
                  }
              })
              .map((allimage: any) => (
                    <TableRow
                      key={allimage?.uploaded_record_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell sx={{wordBreak:'break-all'}}align="left" component="th" scope="row">
                        {allimage?.filename}
                      </TableCell>
                      <TableCell align="left">{allimage?.email}</TableCell>
                      <TableCell align="left">{`${allimage?.first_name}${allimage?.last_name}`}</TableCell>
                      <TableCell align="left">
                        {new Date(allimage?.created_date_time).toLocaleString()}{" "}
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          className="file__view"
                          onClick={() =>
                            window.open(allimage?.uploaded_record_url, "_blank")
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

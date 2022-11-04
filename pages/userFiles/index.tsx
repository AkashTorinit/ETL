import React,{useState,useEffect} from "react"
import axios from "axios"
import jwt from "jwt-decode"
import { useCookies } from "react-cookie"
import { Box, Grid} from "@mui/material"

 function DisplayUserFileComponent() {
    const [allimages, setAllimages] = useState<any>()
    const [cookie, setCookie, removeCookie] = useCookies(["tok"])
  
    useEffect(() => {
        fetchimages()
    }, [])
  
  
    const fetchimages = async () => {
        const getuserIdjwt: any = jwt(cookie.tok)
        if (getuserIdjwt.userId) {
            const response = await axios.get(`/api/getUsersImages?userId=${getuserIdjwt.userId}`)
        
            setAllimages(response?.data?.records)
  
        }
    }
  
    return (
        <Grid container justifyContent="center" wrap="wrap" sx={{ backgroundColor: "rgb(245, 248, 255)" }}>
            <Grid item xs={12} md={12} lg={12} xl={12} >
                <Box
                    sx={{

                        width: 500,
                        height: "auto",
                        backgroundColor: "rgb(255, 255, 255)",
                        border: "2px solid rgb(171, 202, 255)",
                        textAlign: "center",
                        borderRadius: "24px",
                        padding: "2rem 1.875rem 5rem 1.875rem",
                        margin: "0.625rem",
                        boxShadow: "0 10px 60px rgb(218, 229, 255)"
                    }}
                ><h1 style={{ color: "black" }}> Uploaded images</h1>
                    <div style={{ display: "flex" }}>
                        {allimages ? allimages.map((allimage: any) =>
                            <img key={allimage?.uploaded_record_url} src={allimage?.uploaded_record_url} style={{ margin: "0.625rem", width: "100px", height: "100px", display: allimages ? "block" : "none" }} alt="iamge" />
                        ) : "no images found"}
                    </div>

                </Box>
            </Grid>
        </Grid>
    )
}

export default DisplayUserFileComponent;
import React, { useEffect, useState } from "react"
import { Box, Grid, Button, Alert, Stack, TextField } from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"
import dynamic from "next/dynamic";
import jwt from "jwt-decode"
import { useCookies } from "react-cookie"
import CloseIcon from "@mui/icons-material/Close"
// const DrawerBar = dynamic(() => import("./DrawerBar"));
import DrawerBar from "./DrawerBar"
import { borderBottom } from "@mui/system"

function UploadFileComponent () {
    const [imagePath, setImagePath] = useState<string>("")
    const [loader, setloader] = useState<boolean>()
    const [userComment, setUserComment] = useState<string>("")
    const [userFile, setUserFile] = useState<string>("")
    const [error, setError] = useState<string>("");
    const [num,setNum] = useState<number>(0);

    // eslint-disable-next-line no-unused-vars
    const [cookie, setCookie, removeCookie] = useCookies(["tok"])

    const handleSubmit = async (e: any) => {
        setError("");
        setImagePath('');
        try {
            setloader(true)
            e.preventDefault()
            const jwtToken: any = jwt(cookie.tok)
            if (jwtToken.userId) {
                const form = new FormData(e.target)
                form.append("userComment", userComment)
                form.append("userId", jwtToken.userId.toString())
                const resp = await fetch("/api/fileUpload", {
                    method: "POST",
                    body: form,
                })
                const body = await resp.json()
                if (body.uploadedImageUrl) {
                    setImagePath(body.uploadedImageUrl)
                   
                }else{
                    console.log("body", body )
                    setError(body?.message);
                }
               if(body){

                handdleCancel()
               }
                
             

                


                
            }
        } catch (e) {
           
        }
    }

    const handdleCancel = () => {

        setloader(false)
        // document.getElementsByClassName('uploadFile__text')[0].value = null
        removeFunc()


    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileUploaded:any = event.target.files
        setUserFile(fileUploaded[0]?.name.replace(/ +/g, ""))
    }
    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) =>{
        
       if(e.target.value.length===500)
       {
           setNum(-1)
       }
    
       setNum(e.target.value.length)
       setUserComment(e.target.value)
    }

    const removeFunc = () => {
        setUserFile("")
    }

    return (
        <>
          {/* <DrawerBar />   */}
            <Grid
                container
                width="100%"
                height="100%"
                justifyContent="center"
                wrap="wrap"
                sx={{ backgroundColor: "rgb(245, 248, 255)" }}
            >
                <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        
                       
                    }}
                >
                    <Box
                        className="box_uploadFile"
                        sx={{
                            
                            height: "auto",
                            textAlign: "center",
                            padding: "2rem 1.875rem 5rem 1.875rem",
                            margin: "0.625rem",
                            width: '480px',
                            
                            
                           
                        }}
                    >
                        {" "}
                        <h1 style={{ color: "black" }}>User Dashboard</h1>
                        <form
                            method="POST"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        
                        >
                            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%' }}>
                                <label style={{ color: "black" }}>Your Text:</label>
                                {
                                (num<=100) ? <label style={{color:'black',fontSize:"12px"}}>{num}/100</label>:''
                                }
                               
                            </div>
                            <TextField
                                type="text"
                                className="uploadFile__text"
                                placeholder="Enter text here...."
                                onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{handleChangeInput(event)}}
                                variant="filled"
                                multiline rows={8}
                                inputProps={{ maxLength: 100 }}
                                style={{
                                   
                                    borderRadius: "6px",
                                    width: "432px",
                                    padding: "10px 0 10px",
                                    wordBreak:'break-word',
                                    borderBottom:'none'
                                }}
                            />

                           

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    sx={{
                                        color: "#FFFFFF",
                                        backgroundColor: " #35363E",
                                        height: "50px",
                                        borderRadius: "32px",
                                        marginTop: "64px",
                                        padding:"14px 32px 14px 32px",
                                        
                                       
                                        "&:hover": {
                                            backgroundColor: "#35363E",
                                            cursor: "pointer",
                                        },
                                        whiteSpace: "nowrap",
                                    }}
                                    variant="contained"
                                    component="label"
                                >
                  Upload
                                    <input
                                        name="file"
                                        className="input_file_choose"
                                        type="file"
                                        id="file-input"
                                        onChange={handleChange}
                                        hidden
                                    />
                                </Button>

                                <p className="inputforfile"
                                    style={{
                                        color: "black",
                                        fontSize: "16px",
                                        marginLeft: "15px",
                                        wordWrap: "break-word",
                                        maxWidth: "30%",
                                        marginTop: "64px",
                                    }}
                                >
                                 {
                                  userFile ?  `${userFile}` : ""
                                }   
                                </p>
                                {userFile && (
                                    <CloseIcon
                                        onClick={removeFunc}
                                        sx={{
                                            color: "black",
                                            marginLeft: "10px",
                                            marginTop: "32px",
                                            cursor: "pointer",
                                            "&:hover": {
                                                backgroundColor: "lightblue",
                                                borderRadius: "50%",
                                                padding: "2px",
                                            },
                                        }}
                                    />
                                )}
                            </div>

                          
                            <div className="uploadFile__buttons">
                                <Button
                                    size="small"
                                    sx={{
                                        color: "#FFFFFF",
                                        backgroundColor: " #95969F",
                                        width: "111px",
                                        height: "50px",
                                        borderRadius: "32px",
                                        margin: "50px 58px 0 20px",
                                        "&:hover": {
                                            backgroundColor: "#95969F",
                                            cursor: "pointer",
                                        },
                                    }}


                                    onClick={handdleCancel}
                                >
                  Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    size="small"
                                    sx={{
                                        color: "#FFFFFF",
                                        backgroundColor: " #35363E",
                                        width: "111px",
                                        height: "50px",
                                        borderRadius: "32px",
                                        margin: "50px 58px 0 20px",
                                        marginRight:'10px',
                                        "&:hover": {
                                            backgroundColor: "#35363E",
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                  Submit  {loader ? (
                                <Stack alignItems="center">
                                    <CircularProgress size="1.2rem" sx={{marginLeft:'0.5rem'}} />
                                </Stack>
                            ) : null}
                                </Button>
                            </div>
                        </form>
                        {imagePath ? (
                            <Alert
                                severity="success"
                                sx={{
                                    position: "absolute",
                                    right: "10px",
                                    bottom: "20px",
                                }}
                                        
                    onClose={() => { setImagePath('') }}
                    >
                    File Uploaded Successfully. 
                            </Alert>
                        ) : error ? (
                            <Alert
                              severity="error"
                              sx={{
                                position: "absolute",
                                right: "10px",
                                bottom: "20px",
                              }}
                              onClose={() => {
                                setError("");
                              }}
                            >
                              {error}
                            </Alert>
                          ) : null
                            }


                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default UploadFileComponent;

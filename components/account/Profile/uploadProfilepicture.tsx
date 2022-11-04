import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import {  Button, Avatar, Alert } from "@mui/material";
import axios from "axios";
function ProfilePictureComponent(info: any) {
  const [images, setImages] = React.useState([]);
  const [error, setError] = useState<string>("");
  const [profiledefault, Setprofiledefault] = useState<string>("");

  const maxNumber = 69;
  
  const { email, profilepicture, sucess, setSucess, fetchdata } = info;
  // Setprofiledefault(profilePicture)
  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    setSucess("")
    setError("")
   console.log(imageList)
    setImages(imageList);
  };
  const SubmitProfile = async (imageUrl: any) => {
    // if (
    //   data.firstName == formBody.firstName &&
    //   data.lastName == formBody.lastName &&
    //   data.contactNo == formBody.phoneNo
    // ) {
    //   setError("values are not updated");
    //   return "values are not updated";
    // }
    // Over here we have to handle the form submit
    setSucess("");
    const formBody: any = {
      base64: imageUrl,
      email,
    };
    
    let response = await axios.post("/api/uploadProfilePicture", formBody);

    if (response.data) {
      setError(response.data.message);
      console.log(response.data)
      fetchdata()
    
    }
  };
  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          onImageRemoveAll,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div style={{ display: "flex" }} className="upload__image-wrapper">
            
            {imageList[0] ? (
              <div className="image-item">
                <Avatar
                  sx={{
                    width: "120px",
                    height: "120px",
                    marginRight: "22px",
                    border: "0.5px solid rgba(73, 75, 85, 0.15)",
                    color: "black",
                  }}
                  src={(imageList.length===1)?imageList[0]["data_url"]:imageList[imageList.length-1]["data_url"]}
                />
                {/* <img src={image['data_url']} alt="" width="100" /> */}
                <div
                  className="image-item__btn-wrapper"
                  style={{
                    marginTop: "2rem",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    onClick={() => {
                      SubmitProfile((imageList.length===1)?imageList[0]["data_url"]:imageList[imageList.length-1]["data_url"]);
                    }}
                    sx={{
                      background: "rgba(73, 75, 85, 0.15)",
                      color: "#35363E",
                    }}
                  >
                    Update profile picture
                  </Button>
                  {/* <button onClick={() => onImageUpdate(0)}>Update</button>
               <button onClick={onImageRemoveAll}>Remove</button> */}
                  {/* <Button onClick={onImageRemoveAll} sx={{background: 'rgba(73, 75, 85, 0.15)',color: '#35363E'}}>remove profile picture</Button> */}
                </div>
              </div>
            ) : (
              <>
               
                <Avatar
                  sx={{
                    width: "120px",
                    height: "120px",
                    marginRight: "22px",
                    border: "0.5px solid rgba(73, 75, 85, 0.15)",
                    color: "black",
                  }}
                  src={profilepicture ? profilepicture : null}
                />{" "}
              </>
            )}
            <Button
              component="span"
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
              sx={{
                borderRadius: "32px",
                border: "1px solid rgba(73, 75, 85, 0.3)",
                width: "169px",
                height: "48px",
                color: "#35363E",
                marginTop: "2rem",
              }}
            >
              Upload Picture
            </Button>
            &nbsp;
          </div>
        )}
      </ImageUploading>
      {sucess ? (
        <Alert
          severity="success"
          sx={{
            position: "absolute",
            right: "10px",
            top: "20px",
          }}
          onClose={() => {
            setSucess("");
          }}
        >
          {sucess}
        </Alert>
      ) : error ? (
        <Alert
          severity="success"
          sx={{
            position: "absolute",
            right: "10px",
            top: "20px",
          }}
          onClose={() => {
            setError("");
          }}
        >
          {error}
        </Alert>
      ) : null}
    </div>
  );
}
export default ProfilePictureComponent;

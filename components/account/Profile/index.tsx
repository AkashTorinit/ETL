import React, { SyntheticEvent, useState, useEffect } from "react";
import { Input, Box, Grid, Button, Alert,TextField,Typography,List,ListItem, ListItemText, Divider, Avatar,Modal } from "@mui/material";

import axios from "axios";
import ProfilePictureComponent from "./uploadProfilepicture";
interface ProfileDataType {
  firstName: string;
  lastName: string;
  contactNo: string;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function ProfileComponent(user: any) {
  useEffect(() => {
    fetchdataUser();
  }, []);
  const [error, setError] = useState<string>("");
  const [success, Setsuccess] = useState<string>("");
  const [profilepicture, setprofilepicture] = useState<string>("");
  const [imagePath, setimagePath] = useState<string>("");
  const [emailUser, setEmailuser] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [changeEmail,setChangeEmail]=useState<string>("");
  const [phonenumber, setPhonenumber] = useState<string>("");
  const [showEmail,setShowEmail] = useState<boolean>(false);
  const [data, setData] = useState<ProfileDataType>({
    firstName: "",
    lastName: "",
  
    contactNo: "",
  });
  const [open, setOpen] = React.useState(false);
  const [opencontact, setOpencontact] = React.useState(false);
  const [cancel,setCancel] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => 
  {
    setOpen(false);
   
  }
  const handleOpencontact = () => setOpencontact(true);
  const handleClosecontact = () => setOpencontact(false);
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const fileUploaded:any = event.target.files
//     setimagePath(fileUploaded[0]?.name.replace(/ +/g, ""))
// }

   const PhonenumberPattern =  new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/);
  async function fetchdataUser() {
    let email = user?.user?.email;
    let response = await axios.get(`/api/getUserByEmail?email=${email}`);
    let { firstName, lastName, contactNo,profilePicture } = response?.data?.userbyemail;
    setEmailuser(response?.data?.userbyemail?.email);
    setFirstname(firstName);
    setLastname(lastName);
    setPhonenumber(contactNo);
    setprofilepicture(profilePicture)
    setData({ firstName, lastName, contactNo });
  }
  const validateInput = (name: string, value: string) => {
    setError("")
   
    const trimmedValue = value.trim();
    switch (name) {
      // case 'imagePath':
      //   if (!trimmedValue.length) return 'Please enter your current password'
      //   break
      case "firstName":
        setError("")
        if (!trimmedValue.length)
         {
           
          return "Please enter your firstname";
           
         }
         
         break;
       case "lastname":
        if (!trimmedValue.length) return "Please enter your lastname";
        
        break;
      case "email":
        setError("")
        if (!trimmedValue.length) return "Please enter your email";
      
        break;
      case "phoneNo":
        
      

        if(!trimmedValue.length)
        {
          setError("")
          return null
        }

        if(!PhonenumberPattern.test(trimmedValue))
        {
          setError("Please  enter valid contact no")
          return "Please  enter valid contact no";
        }
     
       
        
      
    }
    return null;
  };
  
  const validateForm = ( email: string,firstname:string,lastname:string,
    phonenumber: string) => {
   
    const errors = {
      // imagePath: validateInput('imagePath',imagePath),
      // firstName: validateInput("firstName", firstname),
      // lastName: validateInput("lastname", lastname),
      email: validateInput("email", emailUser),
      phoneNo: validateInput("phoneNo", phonenumber),
      
    };
    const valid = Object.values(errors).filter((v) => !!v).length === 0;
    console.log(valid,errors)
    return { valid, errors };
  };
  const handleSubmit = async (formBody: any) => {
    console.log("submitlog",emailUser)
    // if (
    //   data.firstName == formBody.firstName &&
    //   data.lastName == formBody.lastName &&
    //   data.contactNo == formBody.phoneNo
    // ) {
    //   setError("values are not updated");
    //   return "values are not updated";
    // }
    // Over here we have to handle the form submit
    console.log("formbodddy",formBody)
    let response = await axios.post("/api/updateUserProfile", formBody);
   
    if (response.data) {
      Setsuccess(response.data.message);
      let { firstName, lastName, contactNo } = formBody;
       
      setData({ firstName, lastName, contactNo });
      handleClose()
      handleClosecontact()
    }
   
  };
//   const handleProfilePic = async (e: any) => {
//     try {
//       console.log("startS")
       
//         e.preventDefault()
   
        
//             const form = new FormData(e.target)
//            console.log("profiledata", imagePath)
            
//             // const resp = await fetch("/api/fileUpload", {
//             //     method: "POST",
//             //     body: form,
//             // })
           
           
            
         
            
            
        
//     } catch (e) {
       
//     }
// }
 
  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    Setsuccess("");
    
    
    
    const res = validateForm(emailUser,firstname,lastname,phonenumber);
    if (!res.valid) {
      console.log('not valid')
    } else {
      console.log("startesd",emailUser)
      const formBody: any = {
        imagePath: imagePath,
        firstName: firstname,
        lastName: lastname,
        email: emailUser,
        phoneNo: phonenumber,
      };
      handleSubmit(formBody);
    }
  };
  const inputFieldStyle = {
    display: "block",
    width: "100%",
    margin: "30px auto",
  };
  const firstnameInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    
    setFirstname(e.target.value)
    // setChangeEmail(e.target.value)
  }
  const lastnameInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    
    setLastname(e.target.value)
    // setChangeEmail(e.target.value)
  }
  
  const contactNoInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    
    setPhonenumber(e.target.value)
    setError("")
    // setChangeEmail(e.target.value)
  }
    const onSave = () => {
  
      setShowEmail(true);
      setOpen(false)
    }
    const onCancel = () => {
      setError("")
      handleClose()
      handleClosecontact()
      fetchdataUser() 
      // setShowEmail(false)
    }
 
  
  return (
    // <Grid container justifyContent="center" wrap="wrap" sx={{}}>
    //   <Grid
    //     item
    //     xs={12}
    //     md={12}
    //     lg={12}
    //     xl={12}
    //     sx={{
    //       width: "100vw",
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         width: '400',
    //         height: "auto",
    //         // backgroundColor: 'rgb(255, 255, 255)',
    //         // border: '2px solid rgb(171, 202, 255)',
    //         // textAlign: 'center',
    //         // borderRadius: '24px',
    //         // padding: '2rem 1.875rem 5rem 1.875rem',
    //         // margin: '0.625rem',
    //         // boxShadow: '0 10px 60px rgb(218, 229, 255)'
    //       }}
    //     >
    //       {" "}
    //       <h1 style={{ fontWeight: "800px" }}>Profile</h1>
    //       <form
    //         method="POST"
    //         encType="multipart/form-data"
    //         style={{width: "85vw",maxWidth:'500px' }}
    //         onSubmit={handleFormSubmit}
    //       >
    //         <h1 style={{ color: "black", fontWeight: "300px" }}>
    //           Personal Info
    //         </h1>
    //         {/* <input type="file" name="file" id="file-input" onChange={(e) => setimagePath(e.target.value)} /> */}
    //         {/* {data.imagePath && <img src={data.imagePath} style={{ width: '100px', height: '100px', margin: ' 0 auto' }} alt="iamge" />} */}
    //         <div className="label_email" style={{ marginTop: "1.3rem" }}>
    //           <label style={{ marginTop: "24rem",color:'black' }}>first Name</label>
    //         </div>
    //         <input
    //           className="login__input"
    //           id="firstName"
    //           name="firstName"
    //           style={{width:'100%'}}
    //           required={true}
    //           value={firstname}
    //           type="text"
    //           placeholder="First Name"
    //           onChange={(e) => setFirstname(e.target.value)}
    //         />
    //         {/* <Input id='firstName' name='firstName' required={true} value={firstname} type="text" placeholder='First Name'  onChange={(e) => setFirstname(e.target.value)} /> */}
    //         <div className="label_email" style={{ marginTop: "1.3rem" }}>
    //           <label style={{ marginTop: "24rem",color:'black' }}>Last Name</label>
    //         </div>
    //         <input
    //           className="login__input"
    //           id="lastName"
    //           name="lastName"
    //           required={true}
    //           value={lastname}
    //           style={{width:'100%'}}
    //           type="text"
    //           placeholder="Last Name"
    //           onChange={(e) => setLastname(e.target.value)}
    //         />
    //         {/* <Input id='lastName' name='lastName' required={true} value={lastname} type="text" placeholder='Last Name'  onChange={(e) => setLastname(e.target.value)} /> */}
    //         <div className="label_email" style={{ marginTop: "1.3rem",color:'black' }}>
    //           <label style={{ marginTop: "24rem" }}>Email Address </label>
    //         </div>
    //         <input
    //           className="login__input"
    //           id="email"
    //           name="email"
    //           disabled={true}
    //           value={emailUser}
    //           style={{width:'100%'}}
    //           required={true}
    //           type="text"
    //           placeholder="Email"
    //         />
    //         {/* <Input id='email' name='email'  disabled = {true}  value={emailUser} required={true} type="text" placeholder='Email'  /> */}
    //         <div className="label_email" style={{ marginTop: "1.3rem",color:'black' }}>
    //           <label style={{ marginTop: "24rem" }}> Contact No</label>
    //         </div>
    //         <input
    //           className="login__input"
    //           id="contactNo"
    //           name="contactNo"
    //           value={phonenumber}
    //           style={{width:'100%'}}
    //           required={true}
    //           type="text"
    //           placeholder="Contact Number"
    //           onChange={(e) => setPhonenumber(e.target.value)}
    //         />
    //         {/* <Input id='contactNo' name='contactNo' value={phonenumber} required={true} type="text" placeholder='Contact Number'  onChange={(e) => setPhonenumber(e.target.value)} /> */}
    //         {/* {/* <Button type="submit" size="medium" sx={{ display: 'block', margin: 'auto', color: 'black' }} >Submit</Button> */}
    //         <button
    //           className="login__submit"
    //           type="submit"
    //           style={{
    //             fontFamily: "Steradian",
    //             width:'100%',
    //             display: "block",
    //             color: "#ffffff",
    //           }}
    //         >
    //           Save
    //         </button>
    //       </form>
    //       {error ? (
    //         <Alert
    //           severity="error"
    //           sx={{
    //             position: "absolute",
    //             right: "10px",
    //             bottom: "20px",
    //           }}
    //           onClose={() => {
    //             setError("");
    //           }}
    //         >
    //           {error}
    //         </Alert>
    //       ) : null}
    //       {success ? (
    //         <Alert
    //           severity="success"
    //           sx={{
    //             position: "absolute",
    //             right: "10px",
    //             bottom: "20px",
    //           }}
    //           onClose={() => {
    //             Setsuccess("");
    //           }}
    //         >
    //           {success}
    //         </Alert>
    //       ) : null}
    //     </Box>
    //   </Grid>
    // </Grid>
    <div className="Profile_Box" style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'10rem'}}>
    <Box sx={{width:{md:'848px'},height:{md:'auto'}}}>
    <Typography sx={{fontWeight: '300',fontSize:'40px',color: '#35363E',marginBottom:'30px',marginTop:'40px'}}>
      Profile
    </Typography>
    <Typography sx={{fontWeight: '500',fontSize:'32px',color: '#35363E'}}>
      Photo
    </Typography>
    <Box sx={{marginTop:'1rem',display:'flex',alignItems:'center'}}>
    {/* <Avatar sx={{width: '120px',height: '120px',marginRight:'22px',border:'0.5px solid rgba(73, 75, 85, 0.15)',color:'black'}} src="/Avatar.png"/>
    <form
                            method="POST"
                            encType="multipart/form-data"
                            onSubmit={handleProfilePic}
                        >
     <label htmlFor="upload-photo">
      <input
      style={{ display: 'none' }}
       id="upload-photo"
       name="upload-photo"
       onChange={handleChange}
       type="file"
     />
     
    <Button component="span" sx={{borderRadius:'32px',border:'1px solid rgba(73, 75, 85, 0.3)',width:'169px',height:'48px',color:"#35363E"}}>
      Upload button
     </Button>
    </label>
    </form> */}
     <ProfilePictureComponent email={emailUser} profilepicture= {profilepicture} sucess={success} setSucess={Setsuccess} error={error} setError={setError} fetchdata={fetchdataUser}/>
    </Box>
    <Box>
      <Typography sx={{color:'black',fontFamily:'Steradian',fontStyle:'normal',fontWeight: '500',fontSize: '32px',marginTop:'48px'}}>Personal info</Typography>
    </Box>
   
    <Box sx={{width:'100%',display:'flex'}}>
      <Box sx={{width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',}}>
        <List>
            <ListItem>
              <ListItemText sx={{fontFamily:'Steradian',fontWeight:'500',fontSize:'16px',color:' #35363E'}}>Email</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText sx={{fontFamily:'Steradian',fontWeight:'800',fontSize:'18px',color:' #35363E'}}>
                {(showEmail && changeEmail ? <strong>{changeEmail}</strong> : <strong>{emailUser}</strong>)}</ListItemText>
            </ListItem>
        </List>
        <Button  disabled  sx={{background: 'rgba(73, 75, 85, 0.15)',color: '#35363E'}}>Edit</Button>
      </Box>
    </Box>
    <Divider/>
    <Box sx={{width:'100%',display:'flex'}}>
      <Box sx={{width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',}}>
        <List>
            <ListItem>
              <ListItemText sx={{fontFamily:'Steradian',fontWeight:'500',fontSize:'16px',color:' #35363E'}}>Preferred Name</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText sx={{fontFamily:'Steradian',fontWeight:'700',fontSize:'18px',color:' #35363E'}}><strong>{firstname} {lastname}</strong></ListItemText>
            </ListItem>
        </List>
        {/* <Button sx={{background: 'rgba(73, 75, 85, 0.15)',color: '#35363E'}}>Edit</Button> */}
        <Box>
        <Button onClick={handleOpen} sx={{background: 'rgba(73, 75, 85, 0.15)',color: '#35363E'}}>Edit</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{color:'black'}}>
          firstname
          </Typography>
          <TextField id="outlined-basic" label={firstname} variant="outlined" sx={{color:'white',margin:'1rem'}}  onChange= {(e: React.ChangeEvent<HTMLInputElement>)=>firstnameInputChange(e)} />
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{color:'black'}}>
           last name
          </Typography>
          <TextField id="outlined-basic" label={lastname} variant="outlined" sx={{color:'white',margin:'1rem'}}  onChange= {(e: React.ChangeEvent<HTMLInputElement>)=>lastnameInputChange(e)} />
          <Box>
          <Button onClick={handleFormSubmit} sx={{margin:'1rem'}} variant="contained" color="success">
           Save
         </Button>
         <Button onClick={onCancel} sx={{margin:'1rem'}} variant="outlined" color="error">
         Cancel
         </Button>
         </Box>
        </Box>
      </Modal>
        </Box>
      </Box>
    </Box>
    <Divider/>
    <Box sx={{width:'100%',display:'flex'}}>
      <Box sx={{width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',}}>
        <List>
            <ListItem>
              <ListItemText sx={{fontFamily:'Steradian',fontWeight:'500',fontSize:'16px',color:' #35363E'}}>Contact Number</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText sx={{fontFamily:'Steradian',fontWeight:'700',fontSize:'18px',color:' #35363E'}}><strong>{phonenumber}</strong></ListItemText>
            </ListItem>
        </List>
        
        <Box>
        <Button onClick={handleOpencontact} sx={{background: 'rgba(73, 75, 85, 0.15)',color: '#35363E'}}>Edit</Button>
        <Modal
        open={opencontact}
        onClose={handleClosecontact}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{color:'black'}}>
          Contact no
          </Typography>
          <TextField id="outlined-basic" label={phonenumber} variant="outlined" sx={{color:'white',margin:'1rem'}}  onChange= {(e: React.ChangeEvent<HTMLInputElement>)=>contactNoInputChange(e)}  inputProps={{ maxLength: 10 }} />
          <p style={{color:'red'}}>{error ? error : ''}</p>
          
          <Box>
          <Button onClick={handleFormSubmit} sx={{margin:'1rem'}} variant="contained" color="success">
           Save
         </Button>
         <Button onClick={onCancel} sx={{margin:'1rem'}} variant="outlined" color="error">
         Cancel
         </Button>
         </Box>
        </Box>
      </Modal>
        </Box>
      </Box>
    </Box>
    <Divider/>
  
    </Box>
    </div>
  );
}
export default ProfileComponent;
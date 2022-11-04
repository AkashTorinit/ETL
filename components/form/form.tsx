import React, { SyntheticEvent, useState } from "react";
import { Input, Box, Grid, Button, TextField } from "@mui/material";
import { FormBody } from "../../common/types";
import Router from "next/router";
import ErrorIcon from '@mui/icons-material/Error';

interface Props{ 
  handleSubmit:(formBody: FormBody) => Promise<void>, 
  headerText:string,
  setAlert:React.Dispatch<any>
} 

export const Form = (props:Props) => {
  const { handleSubmit, headerText,setAlert } = props;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [phonenumber, setPhonenumber] = useState<string>("");
  const [emailError,setEmailError] = useState<any>();
  const [passError,setPassError]=useState<any>();
  const [phoneError,setPhoneError]=useState<any>();
  

  const inputFieldStyle = {
    display: "block",
    width: "50%",
    margin: "30px auto",
  };

  // eslint-disable-next-line no-useless-escape, prefer-regex-literals
  const emailPattern = new RegExp(/^([A-Za-z0-9_\-\.])+\@(?!(?:[A-Za-z0-9_\-\.]+\.)?com\.com)([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);
  const passPattern = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  const PhonenumberPattern =  new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/);
  const validateInput = (name: string, value: string) => {
    const trimmedValue = value.trim();

    if (name === "email") {
      if (!trimmedValue.length) {
        return "Please enter your email";
      }
      if (!emailPattern.test(trimmedValue)) {
        setEmailError("Invalid Email")
        return "This isn't an email";
      }
      setEmailError('')
      return null;
    }

    if (name === "password") {
      if (!trimmedValue.length) {
        setPassError("Please Choose a Strong Password")
        return "Please Choose a Strong Password";
      }
      else if(!passPattern.test(trimmedValue))
      {
        setPassError("password must contain at least eight characters, including at least one number and includes both lower and uppercase letters and special characters")
        return "Password is too small"
      }
      else{
        setPassError("")
      }
    }

    if (name === "firstname") {
      if (!trimmedValue.length) {
        return "Please enter firstname";
      }
    }
    if (name === "lastname") {
      if (!trimmedValue.length) {
        setPassError("Please Choose a Strong Password")
        return "Please Choose a Strong Password";
      }
    }
    if (name === "phonenumber") {
      if (!trimmedValue.length) {
        return "";
      }
      else if (!PhonenumberPattern.test(trimmedValue)) {
        setPhoneError('Please enter 10 digit Number')
        return 'Please enter 10 digit Number'
      }
    }

    return null;
  };

  const validateForm = (
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    phonenumber: string
  ) => {
    const errors = {
      email: validateInput("email", email),
      password: validateInput("password", password),
      firstname: validateInput("firstname", firstname),
      lastname: validateInput("lastname", lastname),
      phonenumber: validateInput("phonenumber", phonenumber),
    };
    const valid = Object.values(errors).filter((v) => !!v).length === 0;

    return { valid, errors };
  };

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const res = validateForm(email, password, firstname, lastname, phonenumber);
    if (!res.valid) {
    } else {
      const formBody: FormBody = {
        email,
        password,
        firstname,
        lastname,
        phonenumber,
      };
    
      handleSubmit(formBody);
    }
  };

  return (
    <>
      <Grid
        container
        wrap="wrap"
        sx={{ margin: 3, backgroundColor: "#FFFFFF" }}
      >
        {/* <PermanentDrawerLeft /> */}
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          xl={12}
          sx={{
            backgroundColor: "#FFFFFF",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              marginLeft:{md:'450px',sm:'0px'},
              width:{md:'50vw',sm:'100vw'}

              // width: 500,
              // height: "54rem",
              // backgroundColor: "rgb(255, 255, 255)",
              // border: "2px solid rgb(171, 202, 255)",
              // textAlign: "center",
              // borderRadius: "24px",
              // padding: "2rem 1.875rem 5rem 1.875rem",
              // margin: "1.625rem",
              // boxShadow: "0 10px 60px rgb(218, 229, 255)",
            }}
          >
            {" "}
            {/* <h1 style={{ color: "black" }}>{headerText}</h1> */}
            <form
              method="POST"
              encType="multipart/form-data"
              onSubmit={handleFormSubmit}
              style={{width:'100vw'}}
            >
              <h1 style={{ color: "black", fontWeight: "300px" }}>
                User Signup
              </h1>
              <div className="label_email" style={{ marginTop: "2.3rem",color:'black' }}>
                <label>First Name</label>
              </div>
              {/* <TextField fullWidth  id="fullWidth" sx={{ backgroundColor:'#E2E8EA',borderRadius: '6px',fontFamily: 'Steradian', color:'rgba(43, 44, 51, 0.5)',fontWeight: '400px'}} /> */}
              <input
                className="login__input"
                id="firstname"
                name="firstname"
                placeholder="Firstname"
                required={true}
                onChange={(e) => setFirstname(e.target.value)}
                style={{fontSize:'16px'}}
              />

              <div className="label_email" style={{ marginTop: "1.3rem",color:'black' }}>
                <label style={{ marginTop: "24rem" }}>Last Name</label>
              </div>
              <input
                className="login__input"
                id="lastname"
                name="lastname"
                required={true}
                type="lastname"
                placeholder="Lastname"
                style={{fontSize:'16px'}}
                onChange={(e) => setLastname(e.target.value)}
              />

              <div className="label_email" style={{ marginTop: "1.3rem",color:'black' }}>
                <label>Phone Number</label>
              </div>

              <input
                className="login__input"
                id="phonenumber"
                name="phonenumber"
                type="phonenumber"
                placeholder="PhoneNumber(Optional)"
                style={{fontSize:'16px'}}
                maxLength={10}
                onChange={(e) => {
                  setPhonenumber(e.target.value)
                  setPhoneError('')
                
                }}
              />
               <div style={{
              color:'red',
              display:'flex',
              fontSize:'14px',
              width: '60%',
              wordWrap:'break-word',
              visibility: phoneError ? "visible" : "hidden"
            }}>
              <ErrorIcon/>{phoneError}
              </div>

              <div className="label_email" style={{ marginTop: "1.3rem",color:'black' }}>
                <label>Email address</label>
              </div>
              <input
                className="login__input"
                id="email"
                name="email"
                required={true}
                type="text"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value)
                  setEmailError('')
                  setAlert('')
                
                }}
                style={{paddingLeft:'10px',fontSize:'16px'}}
              />
                  <div style={{
              color:'red',
              display:'flex',
              fontSize:'14px',
              visibility: emailError ? "visible" : "hidden"
            }}>
              <ErrorIcon/>{emailError}
​
              </div>
              <div className="label_email" style={{color:'black' }}>
                <label>Password</label>
              </div>
              <input
                className="login__input"
                id="password"
                name="password"
                required={true}
                maxLength={20}
                type="password"
                placeholder="Password"
                onChange={
                  (e) => {
                    setPassword(e.target.value)
                    setPassError('')
                    setAlert('')}
                    }
                style={{paddingLeft:'10px',fontSize:'16px'}}
              />
               <div style={{
              color:'red',
              display:'flex',
              fontSize:'14px',
              width: '60%',
              wordWrap:'break-word',
              visibility: passError ? "visible" : "hidden"
            }}>
              <ErrorIcon/>{passError}
​
              </div>
              <button
                className="login__submit"
                type="submit"
                style={{
                  fontFamily: "Steradian",
                  display: "block",
                  margin: "auto",
                  marginLeft:'0px',
                  color: "#ffffff",
                }}
              >
                Create User
              </button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

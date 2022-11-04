import React, { SyntheticEvent, useState } from "react";
import { Box, Grid } from "@mui/material";
import { FormBodyLogin } from "../../common/types";

export const FormLogin = (props: any) => {
  const { handleSubmit, headerText } = props;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError,setEmailError] = useState<any>();
  const [passError,setPassError]=useState<any>();

  const inputFieldStyle = {
    // display: 'block',
    // width: '50%',
    margin: "0 0 44px 0",
  };

  // eslint-disable-next-line no-useless-escape, prefer-regex-literals
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const validateInput = (name: string, value: string) => {
    const trimmedValue = value.trim();

    if (name === "email") {
      if (!trimmedValue.length) {
        setEmailError('Email cannot be Empty')
        return "Please enter your email";
      }
      else if (!EMAIL_REGEX.test(trimmedValue)) {

        setEmailError('Invalid email')
        return "This isn’t an email";
      }
      else
      {
       setEmailError('')
       return null;
      }
    }

    if (name === "password") {
      if (!trimmedValue.length) {
        setPassError('Password cannot be Empty')
        return "Please enter your password";
      }
    }

    return null;
  };

  const validateForm = (email: string, password: string) => {
    const emailobj = validateInput("email", email)
    const passobj = validateInput("password", password)
    const errors = {
      email: emailobj,
      password: passobj,
    };
    const valid = Object.values(errors).filter((v) => !!v).length === 0;
    return { valid, errors };
  };

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setEmailError('');
    setPassError('');
    const res = validateForm(email, password);
    if (!res.valid) {
    } else {
      const formBody: FormBodyLogin = {
        email,
        password,
      };
      handleSubmit(formBody);
    }
  };

  return (
    <Grid
      container
      width="100%"
      height="100%"
      justifyContent="center"
      display="flex"
      textAlign="center"
      sx={{ backgroundColor: "#C6C6C6" }}
    >
      <Grid
        item
        xs={12}
        md={12}
        lg={4}
        xl={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          sx={{
            width: {md:'432px',sm:'100%'},
            height: "auto",
            backgroundColor: "#C6C6C6",
            textAlign: "center",
            padding: "2rem 1.875rem 5rem 1.875rem",
            margin: "0.625rem",
          }}
        >
          <h1
            className="Header__login"
            style={{ color: "black", marginBottom: "60px" }}
          >
            {headerText}
          </h1>
          <form
            method="POST"
            noValidate
            encType="multipart/form-data"
            onSubmit={handleFormSubmit}
          >
            <div className="label_email">
              <label>Email address</label>
            </div>
            <input
              className="login__input"
              id="email"
              name="email"
              formNoValidate
              required={true}
              type="text"
              style={{ width: "100%",marginBottom:'10px',paddingLeft:'10px'}}
              placeholder="abc@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div style={{
               color: '#dc3545',
               textAlign: 'left',
              display:'flex',
              fontSize:'14px',
              letterSpacing:'1px',
              wordSpacing:'2px',
              marginBottom:'8px',
              marginTop:'0',
              visibility: emailError ? "visible" : "hidden"
            }}>
              {emailError}
            </div>
            <div className="label_password">
              <label>Password</label>
            </div>
            <input
              className="login__password"
              id="password"
              name="password"
              required={true}
              type="password"
              style={{ width: "100%",marginBottom:'10px' }}
              placeholder="Password"
              // style={inputFieldStyle}
              onChange={(e) => setPassword(e.target.value)}
            />
             <div style={{color: '#dc3545',display:'flex',
              fontSize:'14px',
              letterSpacing:'1px',
              wordSpacing:'2px',
              marginBottom:'8px',
              marginTop:'0',
              visibility: passError? 'visible' : 'hidden'}}>
               {passError}
            </div>
            <button
              className="login__submit"
              type="submit"
              style={{
                display: "block",
                margin: "auto",
                color: "#ffffff",
                fontSize: "16px",
                width: "100%",
              }}
            >
              Login
            </button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

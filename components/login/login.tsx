import React, { useEffect, useState,memo } from 'react'
import { Alert,Stack,CircularProgress,Backdrop } from '@mui/material'

import Router from 'next/router'
import { FormLogin } from '../loginForm/index'
import { FormBodyLogin } from '../../common/types'
import { useCookies } from 'react-cookie'

import axios from "axios";

export const Login = memo(() => {
  const [loginStatus, setLoginStatus] = useState<string>('')
  const [loader, setloader] = useState<boolean>()
  const [open, setopen] = useState<boolean>(true)
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie] = useCookies(['tok'])

  useEffect(() => {

   
    // Need to write logic for auto login
  }, [])

  

  const handleSubmit = async (formBody:FormBodyLogin) => {
    setLoginStatus('')
    try {
      setopen(true)
      setloader(true)
      console.log("true")
      const resp = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify(formBody)
      })
      const body = await resp.json()
      if (resp.status === 200) {
        // const authTokenCookieOptions = { httpOnly: true, secure: true, sameSite: 'Strict' }
        setCookie('tok', body.jwtToken, { path: '/' })
        if (body.user.role === 'ADMIN') {
          Router.push('/dashboard')
        } else {
          Router.push('/uploadFile')
        }
      } else {
   
      
        setLoginStatus(body?.message)
      }
      setloader(false)
      console.log("false")
    } catch (e) {
     
    }
  }

  return <>
       <FormLogin
       handleSubmit = {handleSubmit}
       isSignup={false}
       headerText={'Log into Datapipeline'}
       
        />


{loader ? (
                                 <Backdrop
                                 sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                 open={open}
                               >
                                 <CircularProgress color="inherit" />
                               </Backdrop>
                            ) : null}
        {
         loginStatus?.length > 0
          ? <Alert severity="error" sx={{
          
            position: 'absolute',
            top: '36%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          onClose={() => { setLoginStatus('') }}>{loginStatus}</Alert>
          : null
    }


    
    </>
})
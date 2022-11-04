import React, { useState } from 'react'
import { Alert, AlertColor } from '@mui/material'
import { Form } from '../form/form'
import { FormBody } from '../../common/types'
import { useCookies } from 'react-cookie'
import useUser from '../application/hooks/useUser'

interface SignUpStatus {
  message: string
  severity: AlertColor
}

export const SignUp = () => {
  const [signUpStatus, setSignUpStatus] = useState<SignUpStatus | undefined>(undefined)
  const [alert,setAlert]=useState<any>('')
  const user = useUser()

  const handleSubmit = async (formBody:FormBody) => {
    setAlert('no')
    const resp = await fetch('/api/signUp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: JSON.stringify(formBody)
    })
    const body = await resp.json()
    setSignUpStatus({ message: body.message, severity: 'info' })
    if (resp.status === 200) {
      setSignUpStatus({ message: 'User Added', severity: 'success' })
    } else {
     
      setSignUpStatus({ message: body.message, severity: 'error' })
    }
  }

  return <>
      <Form
       handleSubmit = {handleSubmit}
       headerText={'Create a new user account'}
        setAlert={setAlert}
       
       
       />


      {
        signUpStatus?.message && alert ? <Alert severity={signUpStatus.severity} sx={{
          position: 'absolute',
          right: '20px',
          bottom: '20px'
        }}>{signUpStatus.message}</Alert> :  null
      }
    </>
}

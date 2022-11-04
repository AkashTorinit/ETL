import { createUser } from '../user/db'
import jwt from 'jsonwebtoken'
import { ValidateLoginCredential } from '../user/service'
import { hasPass } from '../user/passwordHash'

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEApONCq45/9MXTAedOf3k0/leFExGaOAa3BmtWctcNSO1FbybO
HnQIBE8yC/Ocu6MY2bm4MiJgGnJIpyNTqIZZVH9rasNzt5B1WKwij1viy9jWkgYS
nQHxBF3o75wlvWab1NTeyPH83QBtaMLrfgFnOLxzBcTNkWSNrv3ETbCvCBavSDDS
XiJ/ZNxuyKnw4fjglYbepWCXW6OZvNjKmuvqClLp1RAbRtMzMUXyQUefOeqrcIN8
AxNHPfFtyK00zYpCfyMArT9+yDbfRnIMtLUTz9cUyCJlhuxBtsHFaDRp7ITEVUyI
zsk/wIaUjzQEHPGDe4TT89Q3gtwgSo3pR7vWzwIDAQABAoIBABTds5KtQlER9b1w
bZUhHA0xuyPqHteHNgMoczSuNT6s1BQYV44wBdGxyfYMOqHeJmdrIr2pbvr5ymro
RA54Dfbs9wV4PX0V2VvC0M7OhHlic+jfvtxCoiL41WD5JCd/RCofVCAey26WPsI6
pH16JPtfkbjBqngDPxDNiVmBiezeaTuMIjDY+BjnAVvjBx5OGTf3a/vkFWDMzEE/
HREvZumixKg/GeoMOU5+vmddTePRHsxYlfLLkv5v5wxtdDdxMorhgU8O/3S+oSIh
D13Hogs3sjnCRPgfdHb7g9inCdqbh3UINyVQps9BsP6isKgauglLbeWXZ7xJGd51
LqlTGokCgYEA9OAll97/RE+pbazf4hLivhpOKaMVALlNz+qbyOf0zPtPpbOmkLSp
d2Hpq/XqKZFyJsdL2QWbt+4W4GqfXkKOUPvf7LG9w1i+gGSYOG5+p+UcVjbjZcpE
gYUpltZqw6sLDRYWIXDQVOCItoQxVsONtaC1xznJfcBniGFNwMpwk9cCgYEArGDf
DLh8DcnlCk93Dgra0myh2+CCNzXwM5pbTxMmRq6vW+3PJvzWRbQ58AQpo/yNvHCQ
Q4U8u5dQtrBYy6JqT5BRSWWS2Qeo9b1IRf7I/HGBVSAOER5iX4yjj9foKWxC8Hk1
Eiv1Lbyl9tm1k5DQ7pbPA0+9fCRfUiYO39ud9ckCgYEAnJCLuLR9ZYHBhDwZ0QPe
MUnEW97HWPUhiSQpgqS74it0Wy+n+bFpAMl7i9TpaLZz09Ns7U8mpsz1l3rUdoH7
WFASddWWzMV618B5iusq09Iq8fyaG8TdVCp90tE45e4AXNeYQr1MllgRURDoMt9J
Ra2BS+XorBxOleYQvokwvXUCgYAz47VBDwfI3s2jnOgpwfq8/RZ8KckI9aOo5P43
f3w2Kr9+3MdO5S1bLjWCmr4uLwg7gWbr7F+r2JDjbZJNOkbmTHsrrPfXfQbPcnsf
FuNJmqFkDpItdQgH2z4hPs0UKxK7cMEZB0J20iLjfAW8tgsuxxbp2Ech55EKGYrA
uEuEgQKBgQCu1Kbko3BTIyKPhTANMELrbWH+Ii6y01HV0Py0i0w1qZhqyfzDo02p
NMXvlp5MmQdNNG3wWqARf+zgcAnbtAwwUFjU/sAjRI8VfwhG8gJ9Ssnop07cuIwS
NNPSLFSlQ/PnK3rqy6lJVhukGwwr1e7rzzN/b6iLIHEa2T8cec7NsA==
-----END RSA PRIVATE KEY-----`

// Sign In backend logic
export const login = async (email: string, password: any) => {
  const user:any = await ValidateLoginCredential(email,password)
  
   
  if (user) {

    if(user?.status == 0){

      return "You are blocked. Contact admin."
  
    }
    const jwtToken = jwt.sign(user, privateKey, { algorithm: 'RS256', expiresIn: '1h' })
    return { jwtToken, user }
  }

  return false
}

// Sign Up backend Logic
     
export const signUp = async (email: string, password: string,firstname:string,lastname:string,phonenumber:any) => {

  let haspassword = await hasPass(password)
  
  if(haspassword) {
    console.log('hash', haspassword)
    
  const user = await createUser(email,haspassword,firstname,lastname,phonenumber)
  if (user) {
    return user
  }

  return false
}
return false
}

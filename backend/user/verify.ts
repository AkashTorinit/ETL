import jwt, { Algorithm } from 'jsonwebtoken'

const JWT_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApONCq45/9MXTAedOf3k0
/leFExGaOAa3BmtWctcNSO1FbybOHnQIBE8yC/Ocu6MY2bm4MiJgGnJIpyNTqIZZ
VH9rasNzt5B1WKwij1viy9jWkgYSnQHxBF3o75wlvWab1NTeyPH83QBtaMLrfgFn
OLxzBcTNkWSNrv3ETbCvCBavSDDSXiJ/ZNxuyKnw4fjglYbepWCXW6OZvNjKmuvq
ClLp1RAbRtMzMUXyQUefOeqrcIN8AxNHPfFtyK00zYpCfyMArT9+yDbfRnIMtLUT
z9cUyCJlhuxBtsHFaDRp7ITEVUyIzsk/wIaUjzQEHPGDe4TT89Q3gtwgSo3pR7vW
zwIDAQAB
-----END PUBLIC KEY-----`

export const verifyAccessToken = (token: string) => {
  let access:any
  try {
    const options = {
      algorithms: ['RS256' as Algorithm]
    }
    const envKey = JWT_PUBLIC_KEY as string
    access = jwt.verify(token, envKey, options)
    if (access === undefined) {
      return false
    }
    if (access.email) {
      return access
    }
  } catch (err) {
    return false
  }
}

export interface FormBody {
    email: string,
    password: string,
    firstname:string,
    lastname:string,
    phonenumber:string,
    roleType?: string
}
export interface FormBodyLogin {
    email: string,
    password: string,
    roleType?: string
}

export interface User {
    email:string,
    password:string,
    userId:number,
    roleType:string,
    iat:number
 }

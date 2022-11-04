export interface User {
  userId: Number,
  email: string,
  createdDateTime: string,
  role: string,
  firstName:string,
  lastName:string,
  contactNo:any,
  status:any,
  profilePicture:any,
  password:any
  
  
}

export interface UserTableRow {
  // userId: Number,
  email: any,
  createdDateTime: string,
  // role: string,
  status: Boolean
}

export interface GetAllUsersApiResponse {
  finalResp: User,
  totalRecords: number,
  page:number
}

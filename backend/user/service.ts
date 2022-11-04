import {updateUserProfilePictureDb, getUserRecordByEmail, getUsers,getImgByUserId,updatePasswordbyEmail ,updateUserProfileDB,blockuserbyEmail,getImgByAdmin,ValidateEmailPassword} from './db'
import { GetAllUsersApiResponse, User } from './user'
import { isSamePass,hasPass } from './passwordHash'

export const getUserByEmail = async (email: string) : Promise<User | false> => {
  const user:any = await getUserRecordByEmail(email) 
  if (user) {
    return {
      userId: user?.user_id,
      email: user?.email,
      createdDateTime: user?.created_date_time,
      role: user?.role_type,
      firstName:user?.first_name,
      lastName:user?.last_name,
      contactNo:user?.phone_no,
      status:user?.Active,
      profilePicture: user?.profile_picture,
      password: user?.password
     
    }
  }

  return false
}


export const ValidateLoginCredential = async (email: string,password:any) : Promise<User | false> => {
  const user:any = await ValidateEmailPassword(email)
  if (user) {

    let PasswordCompare =  await isSamePass(password,user?.password)

   
if(PasswordCompare){
  
    return {
      userId: user?.user_id,
      email: user?.email,
      createdDateTime: user?.created_date_time,
      role: user?.role_type,
      firstName:user?.first_name,
      lastName:user?.last_name,
      contactNo:user?.phone_no,
      status:user?.Active,
      profilePicture: user?.profile_picture,
      password:user?.password
    }
}
  }

  return false
}



export const userblock = async (email: any,status:any) : Promise<User | false> => {
  const user = await blockuserbyEmail(email,status)
  if (user) {
    return user
    
  }

  return false
}

export const updatePassword = async (email: any, password:any) : Promise<User | false> => {
  

  let EncryptedPassword = await hasPass(password)
  
  if(EncryptedPassword) {
  const user = await updatePasswordbyEmail(email,EncryptedPassword)
  if (user) {
    return user
    
  }
}

  return false
}


export const updateUserProfile= async (firstName:any,lastName:any,email:any, phoneNo:any) : Promise<User | false> => {
  const user = await updateUserProfileDB(firstName,lastName,email, phoneNo)
  if (user) {
    return user
    
  }

  return false
}
export const updateUserProfilePicture= async (imagepath:any,email:any) : Promise<User | false> => {
  const user = await updateUserProfilePictureDb(imagepath,email)
  if (user) {
    return user
    
  }

  return false
}



export const getImagesById = async (userId: any) : Promise<User | false> => {
  const user = await getImgByUserId(userId)
  if (user) {
    return user
    
  }

  return false
}


export const getallImages = async () : Promise<User | false> => {
  const user = await getImgByAdmin()
  if (user) {
    return user
    
  }

  return false
}




// Get all users with pagination
export const getAllUsers = async (limit: any, skip: any, sortBy: any, sort: any,search:any) : Promise<GetAllUsersApiResponse | false> => {
  const users: any = await getUsers(limit, skip, sortBy, sort,search)
  if (users) {

    let finalResp:any = []
    users.forEach((x:any) => {
      const obj = {
        // userId: x.user_id,
        email: `${x.email},${x.first_name} ${x.last_name}`,
        createdDateTime: x.created_date_time,
       status: x.Active
        
      
        // createdDateTime: x.created_date_time,
        // role: x.role_type,
       
      }
      finalResp = [...finalResp, obj]
    })
   
    return { finalResp, totalRecords: users[0]?.TotalCount, page:users?.page }
  }

  return false
}

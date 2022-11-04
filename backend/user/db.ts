import { query } from "../db/db";
import format from 'pg-format'
import { Password } from "@mui/icons-material";

// Get users by email query
export const getUserRecordByEmail = async (email: string) => {
  const text = `SELECT * FROM users WHERE email = '${email}'`;
  try {
    const result: any = await query(text, []);
    return result[0];
  } catch (error) {
  
  }
};

//login query
export const ValidateEmailPassword = async (email: string) => {
  const text = `SELECT * FROM users WHERE email = '${email}' LIMIT 1`;
  // const text = `SELECT * FROM users WHERE email = '${email}' and password = '${password}' LIMIT 1`;
  try {
    const result: any = await query(text, []);
   
    return result[0];
  } catch (error) {
 
  }
};

//get images by user_id query

export const getImgByUserId = async (userid: any) => {
  const text = `SELECT * FROM uploaded_record WHERE user_id = '${userid}'`;
  try {
    const result: any = await query(text, []);
    return result;
  } catch (error) {
   
  }
};

 // get all Images query


export const getImgByAdmin = async () => {
  const text = `SELECT * FROM uploaded_record LEFT JOIN users
  ON users.user_id = uploaded_record.user_id`;


  try {
    const result: any = await query(text, []);
    return result;
  } catch (error) {
    
  }
};


// update user profile


export const updateUserProfileDB = async (firstName:any,lastName:any,email:any, phoneNo:any) => {
  const text = `UPDATE users SET first_name = '${firstName}', last_name =  '${lastName}', phone_no = '${phoneNo}' WHERE email = '${email}'`
  try {
    const result: any = await query(text, [])
    return result
  } catch (error) {
    
  }
}

export const updateUserProfilePictureDb = async (imagepath:any, email:any) => {
  const text = `UPDATE users SET profile_picture = '${imagepath}' WHERE email = '${email}'`
  try {
    const result: any = await query(text, [])
    return result
  } catch (error) {
    
  }
}


//block user Query

export const  blockuserbyEmail= async (email:any,status:any) => {


 
  let updateStatus = status == 1 ? 0 : 1;
  const text = `UPDATE users SET Active = '${updateStatus}' WHERE email = '${email}'`
  try {
    const result: any = await query(text, [])
    return result
  } catch (error) {
   
  }
}


//update password query

export const updatePasswordbyEmail = async (email: any,password:any) => {
  
  const text = `UPDATE users SET password = '${password}' WHERE email = '${email}'`
  try {
    const result: any = await query(text, [])
    
    return result
  } catch (error) {
    
  }
}



// SignUp db query
export const createUser = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  phonenumber: any
) => {
  const currentDateTime = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  const text = `INSERT INTO users (email, password,first_name,last_name,phone_no,created_date_time, role_type) VALUES ('${email}', '${password}', '${firstname}','${lastname}', '${phonenumber}', '${currentDateTime}', '${"USER"}')`;
  try {
    const result = await query(text, []);
    return result;
  } catch (error) {
   
  }
};

// Get User with pagination query

export const getUsers = async (
  limit: any,
  skip: any,
  sortBy: any,
  sort: any,
  search: any
) => {
  
  const sortValue = "user_id";
  const sortType = sort === "descending" ? "DESC" : "ASC";
  const searchLower = search.toLowerCase();
  // eslint-disable-next-line quotes
  // const text = `select * from users WHERE role_type IN ('USER') limit ${limit} OFFSET ${skip}`

  const queryText = `Select *, Count(*) Over () AS TotalCount From users Where role_type IN ('USER')   `;
 
  const searchText =
  search !== ""
    ? `AND LOWER(email) LIKE %L ORDER BY ${sortValue} ${sortType} limit ${limit} OFFSET ${skip}`
    : `ORDER BY ${sortValue} ${sortType}  limit ${limit} OFFSET ${skip}`

const parameterArray = [] as unknown[];

if (search !== "") {
  parameterArray.push(
    `%${searchLower}%`
  );
}

const text = format.withArray(`
    ${queryText}${searchText}
  `, parameterArray)

  try {
let page = skip/limit + 1

    
    const result:any = await query(text, []);

    result.page = page
    return result;
  } catch (error) {
    
  }
};

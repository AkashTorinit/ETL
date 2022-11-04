const { createPool } = require('mysql')

const pool = createPool({
  connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
  host: process.env.MY_SQL_DB_HOST,
  user: process.env.MY_SQL_DB_USER,
  password: process.env.MY_SQL_DB_PASSWORD,
  port: process.env.MY_SQL_DB_PORT,
  database: process.env.MY_SQL_DB_DATABASE
})

const createTable = () => {
  pool.query(`CREATE TABLE IF NOT EXISTS users (
      user_id int NOT NULL AUTO_INCREMENT,
      email varchar(100) DEFAULT NULL,
      password varchar(200) DEFAULT NULL,
      first_name varchar(100) DEFAULT NULL,
      last_name varchar(100) DEFAULT NULL,
      phone_no  varchar(100) DEFAULT NULL,
      created_date_time datetime DEFAULT NULL,
      role_type varchar(45) NOT NULL,
      PRIMARY KEY (user_id),
      UNIQUE KEY email_UNIQUE (email)
    );`
  )

  pool.query(`CREATE TABLE IF NOT EXISTS uploaded_record (
      uploaded_record_id int NOT NULL AUTO_INCREMENT,
      filename varchar(2083) DEFAULT NULL,
      uploaded_record_url varchar(2083) DEFAULT NULL,
      created_date_time datetime DEFAULT NULL,
      user_comments varchar(100) DEFAULT NULL,
      Active BOOLEAN DEFAULT (1),
      user_id int NOT NULL,
      PRIMARY KEY (uploaded_record_id),
      KEY USER_ID_FK_idx (user_id),
      CONSTRAINT USER_ID_FK FOREIGN KEY (user_id) REFERENCES users (user_id)
    ); `
  )


  pool.query(`ALTER TABLE users ADD Active BOOLEAN DEFAULT (1);`)
 



}

pool.getConnection((err: any,connection:any) => {
  if (err) {
  }else{
  createTable()
  }
  
  if(connection) connection.release();
  
})

export const query = (text: string, params: never[]) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(text, params, (err: any, data: any) => {
        if (err) {
          console.log('err',err)
          reject(err)
        }
        resolve(JSON.parse(JSON.stringify(data)))
      })
    } catch (e) {
      reject(e)
    }
  })
}

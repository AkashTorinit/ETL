import { query } from '../db/db'

// Update uploaded Records db query
export const updateUploadedRecords = async (req: any, res: any, s3FileLocation: string) => {
  const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
  const text = `INSERT INTO uploaded_record (filename, uploaded_record_url, created_date_time, user_comments, user_id) VALUES ('${req.file.filename}', '${s3FileLocation}', '${currentDateTime}', '${req.body.userComment}', ${req.body.userId})`
  try {
    const result: any = await query(text, [])
    return result
  } catch (error) {
    
  }
}

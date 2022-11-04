const AWS = require('aws-sdk')
const fs = require('fs')

const constants = {
  ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  BUCKET_NAME: process.env.BUCKET_NAME
}

const s3 = new AWS.S3({
  accessKeyId: constants.ACCESS_KEY_ID,
  secretAccessKey: constants.SECRET_ACCESS_KEY
})

export const uploadFileToS3 = async (file: any) => {
  return new Promise((resolve, reject) => {
    const fileContent = fs.readFileSync(file.path)
    const params = {
      Bucket: constants.BUCKET_NAME,
      Key: file.path,
      Body: fileContent,
      ContentType: file.mimetype,
    }

    s3.upload(params, function (err: any, data: unknown) {
      if (err) {
        return reject(err)
      }
      return resolve(data)
    })
  })
}

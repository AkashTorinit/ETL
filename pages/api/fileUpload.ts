import nc from 'next-connect'
import multer from 'multer'
const fs = require("fs");
import { uploadFileToS3 } from '../../backend/utils/uploadFileToS3'
import { saveUploadedRecordDetails } from '../../backend/uploadedRecords/service'
import { getImagesById } from "../../backend/user/service"
import type { NextApiRequest, NextApiResponse } from 'next'

interface MulterRequest extends NextApiRequest {
  file: any;
}

export const config = {
  api: {
    bodyParser: false
  }
}

const handler = nc({
  onError: (err, req: NextApiRequest, res: NextApiResponse, next) => {
    console.error(err.stack)
    res.status(500).end('Something broke!')
  }
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let pathimages = '/tmp'

    fs.mkdirSync(pathimages, { recursive: true })
    cb(null, pathimages)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage
})

const uploadFile = upload.single('file')

handler.use(uploadFile)
handler.post(async (req: MulterRequest, res: NextApiResponse) => {



  try {




    if (req.file.mimetype != 'text/vtt') {
      res.status(401).json({ message: 'please enter .vtt format' })
      return
    }
    let { userId } = req.body
    const users: any = await getImagesById(userId)



    if (users.length) {
      let CheckFileExist = false

      users.forEach((user: any) => {

        if (user.filename == req?.file?.filename) {

          CheckFileExist = true
        }






      })

      if (CheckFileExist) {
        res.status(401).json({ message: 'File already exist' })
        return

      }

    }

    const uploadedImageToS3: any = await uploadFileToS3(req.file)
    const response = {
      uploadedImageUrl: uploadedImageToS3.Location
    }

    saveUploadedRecordDetails(req, res, uploadedImageToS3.Location)
    res.send(JSON.stringify(response))


  } catch (error) {

  }
})

export default handler
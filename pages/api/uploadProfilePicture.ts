import type { NextApiRequest, NextApiResponse } from "next";
import { updateUserProfilePicture } from "../../backend/user/service";
const AWS = require("aws-sdk");
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  if (req.method === "POST") {
    console.log("base64", )
    const { base64, ...emailinfo } = req.body;
    let email = emailinfo.email;
    // console.log("stttartrd", emailinfo.email);
    try {
      /**
       * This gist was inspired from https://gist.github.com/homam/8646090 which I wanted to work when uploading an image from
       * a base64 string.
       * Updated to use Promise (bluebird)
       * Web: https://mayneweb.com
       *
       * @param  {string}  base64 Data
       * @return {string}  Image url
       */
      // You can either "yarn add aws-sdk" or "npm i aws-sdk"

      // Configure AWS with your access and secret key.
      const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_REGION, BUCKET_NAME } =
        process.env;

      // Configure AWS to use promise
      // AWS.config.setPromisesDependency(require('bluebird'));
      AWS.config.update({
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
      });

      // Create an s3 instance
      const s3 = new AWS.S3();

      // Ensure that you POST a base64 data to your server.
      // Let's assume the variable "base64" is one.
      // console.log("base64old", base64);
      const base64Data: any = Buffer.from(
        base64.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      // console.log("base64old", base64Data);
      // Getting the file type, ie: jpeg, png or gif
      const type = base64.split(";")[0].split("/")[1];

      // Generally we'd have an userId associated with the image
      // For this example, we'll simulate one

      // With this setup, each time your user uploads an image, will be overwritten.
      // To prevent this, use a different Key each time.
      // This won't be needed if they're uploading their avatar, hence the filename, userAvatar.js.
      const params = {
        Bucket: BUCKET_NAME,
        Key: `${email} profilePicture ${new Date()}.${type}`, // type is not required
        Body: base64Data,
        //   ACL: 'public-read',
        ContentEncoding: "base64", // required
        ContentType: `image/${type}`, // required. Notice the back ticks
      };

      // The upload() is used instead of putObject() as we'd need the location url and assign that to our user profile/database
      // see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
      let location = "";
      let key = "";
      try {
        const { Location, Key } = await s3.upload(params).promise();
        location = Location;
        key = Key;
      } catch (error) {
        console.log(error);
      }

      // Save the Location (url) to your database and Key if needs be.
      // As good developers, we should return the url and let other function do the saving to database etc
       console.log(location);
      const data = await updateUserProfilePicture(location, email);
      data !== false
        ? res
            .status(200)
            .json({ message: "Profile Picture updated successfully!" })
        : res
            .status(401)
            .json({ message: "Error while updating user account" });

      return;

      // To delete, see: https://gist.github.com/SylarRuby/b3b1430ca633bc5ffec29bbcdac2bd52
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;

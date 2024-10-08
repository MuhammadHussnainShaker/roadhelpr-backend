import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    })
    console.log(`${response.original_filename} is successfully uploaded to Cloudinary`)
    // remove (unlink) file from local server
    fs.unlinkSync(localFilePath)
    return response
  } catch (error) {
    fs.unlinkSync(localFilePath) // remove (unlink) file from local server since upload failed
    console.error('Error while uploading file to Cloudinary', error)
    return null
  }
}

export { uploadOnCloudinary }

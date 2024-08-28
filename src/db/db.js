import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'
import util from 'util'

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    )
    console.log(
      `\nMongoDB connected !! host: ${connectionInstance.connection.host}`
    )
  } catch (error) {
    console.log('Following error occured while connecting to MongoDB: ', error)
    process.exit(1)
  }
}

export default connectDB

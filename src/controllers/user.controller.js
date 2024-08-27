import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/videotube/user.model.js'

const registerUser = asyncHandler((req, res) => {
  // take user data from frontend
  // validate the data
  // check if user already exists
  // check for images, avatar
  // upload images to cloudinary
  // create user object and enter into db
  // check for user creation
  // delete password and refresh token from reponse from db
  // return response to frontend

  const { username, email, fullName, password } = req.body

  if (
    [username, email, fullName, password].some((field) => field?.trim() === '')
  ) {
    throw new ApiError(400, 'All fields are required')
  }

  const userExist = User.findOne({
    $or: [{ username }, { email }],
  })

  if (userExist) {
    throw new ApiError(409, 'User with username or email already exists')
  }
})

export { registerUser }

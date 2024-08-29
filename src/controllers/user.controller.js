import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/videotube/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req, res) => {
  // take user data from frontend
  // validate the data
  // check if user already exists
  // check for images, specifically avatar
  // upload images to cloudinary, check if uploaded
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

  const userExist = await User.findOne({
    $or: [{ username }, { email }],
  })

  if (userExist) {
    throw new ApiError(409, 'User with this username or email already exists')
  }

  const avatarLocalPath = req.files?.avatar[0]?.path

  let coverImageLocalPath
  if (req.files?.coverImage) {
    coverImageLocalPath = req.files?.coverImage[0]?.path
  }

  if (!avatarLocalPath) throw new ApiError(400, 'Avatar is required')

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if (!avatar) throw new ApiError(500, 'Failed to upload avatar to cloudinary')

  const user = await User.create({
    username,
    email,
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || '',
    password,
  })

  if (!user) throw new ApiError(500, 'Failed to create user in database')

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  )

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, 'User created successfully'))
})

export { registerUser }

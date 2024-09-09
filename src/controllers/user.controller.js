import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/roadhelpr/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req, res) => {
  // take user data from frontend
  // validate the data
  // check if user already exists
  // check for images,
  // upload images to cloudinary, check if uploaded
  // create user object and enter into db
  // check for user creation
  // delete password and refresh token from reponse from db
  // return response to frontend

  // register user logic for roadhelpr
  // take user data from req.body
  // check if required fields are present, btw, all field are required
  // then check if user already exists using email and phone number
  // if user exists, throw error
  // then check for profile image in req.files
  // if profile image is present, upload it to cloudinary
  // create user object with appropriate fields and save it to db
  // check for user creation and retry if failed else set response varibale
  // delete password and refresh token from response from db
  // return response to frontend

  // console.log('I am req',req)
  // console.log('I am body',req.body)
  // console.log('I am files', req.files)

  const { fullName, phoneNumber, email, password, role } = req.body


  if (
    [fullName, phoneNumber, email, password, role].some(
      (field) => field?.trim() === ''
    )
  ) {
    throw new ApiError(400, 'All fields are required')
  }

  const userExist = await User.findOne({
    $or: [{ phoneNumber }, { email }],
  })

  if (userExist) {
    throw new ApiError(409, 'User with this phone number or email already exists')
  }

  let profileImageLocalPath
  if (req.files?.profileImageUrl) {
    profileImageLocalPath = req.files?.profileImageUrl[0]?.path
  }

  // changing the logic to avatar not required
  // if (!avatarLocalPath) throw new ApiError(400, 'Avatar is required')

  // trying to upload to cloudinary only when local path variables are set
  let profileImage
  if (profileImageLocalPath) {
    profileImage = await uploadOnCloudinary(profileImageLocalPath)
  }

  // if (!avatar) throw new ApiError(500, 'Failed to upload avatar to cloudinary')

  const user = await User.create({
    fullName,
    phoneNumber,
    email,
    password,
    role,
    profileImageUrl: profileImage?.url || '',
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

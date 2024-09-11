import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/roadhelpr/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import jwt from 'jsonwebtoken'

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })
    return { accessToken, refreshToken }
  } catch (error) {
    throw new ApiError(500, 'Failed to generate access and refresh tokens')
  }
}

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

const loginUser = asyncHandler(async (req, res) => {
  // take user data from req.body
  // validate user data
  // throw error if username or email is empty
  // check if user exists
  // throw error if user does not exist
  // check if password is correct
  // throw error if password is incorrect
  //create refresh and access token by making separate function
  // delete password and refresh token from user mongoose object
  // send new user document, access token and refresh token to via secure cookies and json to frontend

  const { phoneNumber, email, password } = req.body

  if (!phoneNumber) {
    throw new ApiError(400, 'Phone number is required')
  }

  if (!email) {
    throw new ApiError(400, 'Email is required')
  }
  
  const user =await User.findOne({
    $and: [{ phoneNumber }, { email }]
  })
  
  if (!user) {
    throw new ApiError(404, 'User with this phone number or email does not exist')
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new ApiError(
      401,
      'Incorrect password, please try again or reset your password'
    )
  }

  const userObject = user.toObject()

  delete userObject.password
  delete userObject.refreshToken

  const {accessToken, refreshToken} =  await generateAccessAndRefreshTokens(user._id)

  // const loggedInUser = await User.findById(user._id)
  // console.log(loggedInUser.refreshToken)

  const options = {
    httpOnly: true,
    secure: true,
  }

  res
  .status(200)
  .cookie('accessToken', accessToken, options)
  .cookie('refreshToken', refreshToken, options)
  .json(
    new ApiResponse(
      200,
      {
        user: userObject, accessToken, refreshToken
      },
      'User logged in successfully',
    )
  )

})

const logoutUser = asyncHandler(async (req, res) => {
  // console.log('logoutUser controller ran.')
  const updatedUserDocument = await User.findByIdAndUpdate(
      req?.user?._id,
      {
          $unset: {
              refreshToken: '',
          },
      },
      {
          new: true,
      }
  )

  // console.log(updatedUserDocument)

  const options = {
      httpOnly: true,
      secure: true,
  }

  return res
      .status(200)
      .clearCookie('accessToken', options)
      .clearCookie('refreshToken', options)
      .json(new ApiResponse(200, {}, 'User logged out successfully'))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req?.cookies?.refreshToken ||
        req?.body?.refreshToken ||
        req?.headers?.authorization?.replace('Bearer ', '')

    if (!incomingRefreshToken) {
      throw new ApiError(401, 'Unauthorized request, refresh token is not sent with the request')
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id).select(
            '-password -refreshToken'
        )

        if (!user) {
            throw new ApiError(401, 'Incorrect refresh token')
        }

        if (decodedToken?.refreshToken !== user?.refreshToken) {
            throw new ApiError(401, 'Refresh token is expired or used')
        }

        const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
            user.refreshToken
        )

        const options = {
            httpOnly: true,
            secure: true,
        }

        return res
            .status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken },
                    'Access token refreshed successfully'
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || 'Invalid refresh token')
    }
})

export { registerUser, loginUser, logoutUser, refreshAccessToken }

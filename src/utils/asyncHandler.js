const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error) // TODO: understand
    )
  }
}

export { asyncHandler }

// const asyncHandler = (requestHandler) => {
//   return async (req, res, next) => {
//     try {
//       requestHandler(req, res, next)
//     } catch (error) {
//       next(error)
//     }
//   }
// }

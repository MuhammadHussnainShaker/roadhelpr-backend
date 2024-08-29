import mongoose from 'mongoose'

const subTodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // remove leading and trailing whitespaces
      minlength: 1,
      maxlength: 100,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
)

export const SubTodo = mongoose.model('SubTodo', subTodoSchema)

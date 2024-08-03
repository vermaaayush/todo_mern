import mongoose, {Schema} from "mongoose";
// import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const todoSchema = new Schema (
    {
          title: {
            type: String,
            required: true,
            trim: true
          },
          description: {
            type: String,
            trim: true
          },
          status: {
            type: String,
            default: 'true'
          },
          userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
          },
    },
    {
        timestamps:true
    }
)

export const Todo = mongoose.model("Todo",todoSchema)
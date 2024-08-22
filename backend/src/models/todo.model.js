import mongoose, {Schema} from "mongoose";
// import jwt from "jsonwebtoken"


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
          ownerId: {
            type: String,
            required: true
          },
    },
    {
        timestamps:true
    }
)

export const Todo = mongoose.model("Todo",todoSchema)



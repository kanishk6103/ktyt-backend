import mongoose from "mongoose"
import commentItem from "./commentModel";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },

        id: {
            type: String,
        },

        comments: {
            type: Array,
            default: []
        }
    }
)

// module.exports = mongoose.model("commentItem", commentSchema)
const user = mongoose.model("user", userSchema);
export default user;
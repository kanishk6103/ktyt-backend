import mongoose from "mongoose"

const commentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        text: {
            type: String,
        },
        replies: {
            type: Array,
            default: []
        },
        id: {
            type: String,
        },
        parentTime: {
            type: String,
        },
        dateCreated: {
            type: Date,
        },
        dateEdited: {
            type: Date,
            default: null,
        },
        videoID: {
            type: String,
            required: [true]
        },
        edited: {
            type: Boolean,
            default: false,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        votes: {
            type: Number,
            default: 0,
        }
    }
)

// module.exports = mongoose.model("commentItem", commentSchema)
const commentItem = mongoose.model("commentItem", commentSchema);
export default commentItem;
// const commentItem = require("../models/commentModel");
import commentItem from "../models/commentModel.js";
import expressAsyncHandler from "express-async-handler";

const dateConverter = (para) => {
    const commentId = new Date(parseInt(para)).getTime();
    // console.log(commentId)
    const timestamp = commentId;
    const dateObject = new Date(timestamp);
    // console.log(dateObject);
    const formattedDate = dateObject.toISOString()
    // console.log(formattedDate);
    return formattedDate;
}

const deleteComment = expressAsyncHandler(
    async (req, res) => {
        try {
            const uid = dateConverter(req.params.id)
            console.log(uid);
            const existingComment = await commentItem.findOneAndUpdate(
                { dateCreated: uid },
                {
                    $set: {
                        name: "[deleted]",
                        text: "[deleted]",
                        deleted: true,
                    }
                },
            );
            if (!existingComment) {
                return res.status(404).json({
                    success: false,
                    data: null,
                    message: "Comment not found",
                });
            }
            // await existingComment.deleteOne();
            const response = "The comment with the ID " + uid + " is deleted."
            res.status(200).json(
                {
                    success: true,
                    data: response,
                    message: "Entry Deleted"
                }
            )
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                data: "Internal Server Error",
                message: error.message,
            })
        }
    }
)

export default deleteComment;
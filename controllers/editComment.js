import expressAsyncHandler from "express-async-handler";
import commentItem from "../models/commentModel.js";

const editComment = expressAsyncHandler(async (req, res) => {
    try {
        const commentID = req.params.id;
        // const commentId = new Date(parseInt(req.params.id)).getTime();
        console.log(commentID)
        // const timestamp = commentId;
        // const dateObject = new Date(timestamp);
        // const formattedDate = dateObject.toISOString()
        const newText = req.body.editedComment;
        const filter = { id: commentID }
        const update = { text: newText, edited: true, dateEdited: Date.now() }
        const editedComment = await commentItem.findOneAndUpdate(filter, update, { new: true })
        console.log(editedComment);
        res.status(200).json({
            data: editedComment,
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            data: "Internal Server Error",
            message: error.message,
        })
    }
})

export default editComment;

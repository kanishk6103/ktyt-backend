// const commentItem = require("../models/commentModel");
import commentItem from "../models/commentModel.js";
import expressAsyncHandler from "express-async-handler";

const createComment = expressAsyncHandler(
    async (req, res) => {
        try {
            const { name, text, replies, id, parentTime, dateCreated, dateEdited, videoID, edited, deleted, votes } = req.body;
            const response = await commentItem.create({ name, text, replies, id, parentTime, dateCreated, dateEdited, videoID, edited, deleted, votes });
            console.log(response)
            console.log("Comment reached backend")
            res.status(200).json(
                {
                    success: true,
                    data: response,
                    message: "Entry Created"
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

export default createComment;
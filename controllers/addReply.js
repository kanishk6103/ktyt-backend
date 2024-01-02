// const commentItem = require("../models/commentModel");
import commentItem from "../models/commentModel.js";
import expressAsyncHandler from "express-async-handler";

const addReply = expressAsyncHandler(
    async (req, res) => {
        try {
            const { name, text, replies, id, parentTime, dateCreated, dateEdited, videoID, edited, deleted, votes } = req.body;
            const response = await commentItem.create({ name, text, replies, id, parentTime, dateCreated, dateEdited, videoID, edited, deleted, votes });
            console.log(response);
            // console.log("Reply reached backend")
            console.log(parentTime)
            let parentComment;
            // find parent comment and push
            const getParentComment = async () => {
                parentComment = await commentItem.findOneAndUpdate(
                    {
                        $and: [
                            { id: parentTime },
                            { videoID: videoID }
                        ]
                    },
                    {
                        $push: { replies: response }
                    },
                    { new: true }
                );
                if (parentComment) {
                    // parentComment.replies.push(response);
                    // console.log(parentComment.text);
                    // console.log("Parent was base comment")
                    await parentComment.save();
                }
            };

            await getParentComment();


            // Bad Idea I guess //GTA 6 reference lol
            // const findReplies = async () => {
            //     //find inside replies
            //     console.log("It was not a base comment so searching recursively")
            //     parentComment = await commentItem.findOneAndUpdate(
            //         {
            //             replies: {
            //                 $elemMatch: { id: parentTime }
            //             }
            //         },
            //         {
            //             $push: { replies: response.id }
            //         },
            //         { new: true }
            //     )
            //     if (parentComment) {
            //         console.log("Found parent comment: " + parentComment.text);
            //     }
            //     else {
            //         console.log("Calling again")
            //         findReplies();
            //     }
            // }
            // if (!parentComment && parentTime != null) { findReplies(); }

            res.status(200).json(
                {
                    success: true,
                    data: response,
                    message: "Reply Added"
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

export default addReply;
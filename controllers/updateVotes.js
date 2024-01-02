import expressAsyncHandler from "express-async-handler";
import commentItem from "../models/commentModel.js";
const votedIPs = new Set()
const updateVotes = expressAsyncHandler(async (req, res) => {
    try {
        //To prevent user to vote after refreshing
        // const userIP = req.ip;
        // if (votedIPs.has(userIP)) {
        //     return res.status(403).json({ error: "Already Voted" })
        // }
        // votedIPs.add(userIP);
        const commentID = req.params.id;
        console.log(commentID)
        const newVotes = req.body.updatedVotes;
        const filter = { id: commentID }
        const update = { votes: newVotes, }
        const votedComment = await commentItem.findOneAndUpdate(filter, update, { new: true })
        console.log(votedComment);
        res.status(200).json({
            data: votedComment,
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

export default updateVotes;

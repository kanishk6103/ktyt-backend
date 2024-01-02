import commentItem from "../models/commentModel.js";
import expressAsyncHandler from "express-async-handler";

const fetchComments = expressAsyncHandler(async (req, res) => {
    try {
        const videoID = req.params.videoID;
        const comments = await getComments(videoID, null);
        // console.log(comments);

        res.status(200).json({
            success: true,
            data: comments,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            data: "Internal Server Error",
            message: error.message,
        });
    }
});

/*

    IMPORTANT:
    (What mongo returns if nothing matches the find filter)
    If it is a find, then results == []. If it is a findOne, then results == null. No errors if everything else is ok.

 */


const getComments = async (videoID, pID) => {
    const comments = await commentItem.find({
        $and: [
            { parentTime: pID },
            { videoID: videoID },
        ],
    });

    const result = [];

    for (const comment of comments) {
        const replies = await getComments(videoID, comment.id);
        // console.log(comment.toObject(), " - This is the comment - These are the replies: ", replies, " - thats it")
        result.push({ ...comment.toObject(), replies });    // pushes 
    }

    return result;
};

export default fetchComments;





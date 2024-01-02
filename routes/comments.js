import express from "express";
import createComment from "../controllers/createComment.js"
import deleteComment from "../controllers/removeComment.js";
import fetchComments from "../controllers/fetchComments.js";
import editComment from "../controllers/editComment.js";
import addReply from "../controllers/addReply.js";
import updateVotes from "../controllers/updateVotes.js";
const Router = express.Router();
// const { createComment } = require("../controllers/createComment");
Router.post("/createComment", createComment);
Router.put("/deleteComment/:id", deleteComment);
Router.get("/api/comments/:videoID", fetchComments);
Router.put("/api/editComment/:id", editComment);
Router.post("/addReply", addReply);
Router.put("/api/updateVotes/:id", updateVotes);
// module.exports = router;
export default Router
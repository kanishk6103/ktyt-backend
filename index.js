import express from "express";
import cors from "cors";
import 'dotenv/config'
import mongodb from "mongodb";
import mongoose from "mongoose";
import Router from "./routes/comments.js"
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());
// const commentRoute = require("./routes/comments.js")
app.use(Router);
// import * from "./routes/comments.js"
// const { MongoClient } = mongodb;
// import main from "./config/database.js";
// main();
import { config } from "dotenv";
// main().catch(err => console.log(err));
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/newDB', { useNewUrlParser: true });
    // await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }).then(() => { console.log("Successfully connected") }).catch((err) => { console.log(err); process.exit(1); });
    await mongoose.connect("mongodb://127.0.0.1:27017/anotherDB69", { useNewUrlParser: true }).then(() => { console.log("Successfully connected") }).catch((err) => { console.log(err); process.exit(1); });
}

main();

app.get('/api/youtube-search/:query', async (req, res) => {
    try {
        const query = req.params.query;
        const data = await fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" + query + "&key=" + YOUTUBE_API_KEY);
        const json = await data.json();
        res.json(json?.items);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



app.get('/api/suggestions/:text', async (req, res) => {
    try {
        const text = req.params.text;
        const data = await fetch("http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&q=" + text);
        const json = await data.json();
        res.json(json[1]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/channelInfo/:text', async (req, res) => {
    try {
        const text = req.params.text;
        const data = await fetch("https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=" + text + "&key=" + YOUTUBE_API_KEY);
        const json = await data.json();
        res.json(json?.items[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/channelVideoInfo/:text', async (req, res) => {
    try {
        const text = req.params.text;
        const videoData = await fetch("https://www.googleapis.com/youtube/v3/search?key=" + YOUTUBE_API_KEY + "&channelId=" + text + "&part=snippet,id&order=date&maxResults=25")
        const videoJson = await videoData.json();
        res.json(videoJson?.items);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/getPopularVideos', async (req, res) => {
    try {
        const data = await fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" + YOUTUBE_API_KEY)
        const json = await data.json();
        res.json(json?.items);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/videoInfoCall/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await fetch("https://www.googleapis.com/youtube/v3/videos?key=" + YOUTUBE_API_KEY + "&part=statistics&part=snippet&id=" + id);
        const json = await data.json();
        res.json(json?.items[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
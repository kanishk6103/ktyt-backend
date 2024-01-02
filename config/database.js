import mongodb from "mongodb";
import mongoose from "mongoose";
// require("dotenv").config();
import { config } from "dotenv";
// main().catch(err => console.log(err));
async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/newDB', { useNewUrlParser: true });
    await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }).then(() => { console.log("Successfully connected") }).catch((err) => { console.log(err); process.exit(1); });
}

export default main;
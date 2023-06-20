import mongoose from "mongoose";
const schema = mongoose.Schema(
  {
    topic: String,
    userName: String,
    title: String,
    time: String,
    image: String,
    replies: Number,
    retuits: Number,
    tuit: String,
    likes: Number,
    handle: String,
    liked: Boolean,
  },
  { collection: "tuits" }
);
export default schema;

const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog must have a title!"],
    },
    summary: String,
    content: String,
    imageCover: String,
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      //required: [true, "Blog must have an author!"],
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;

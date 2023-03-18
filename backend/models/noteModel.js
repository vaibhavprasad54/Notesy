const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(         //Creating New Schema
  {
    title: {                                //Note should have a title
      type: String,
      required: true,
    },      
    content: {                              //Note should have content
      type: String, 
      required: true,
    },
    category: {                             //Note should have a category
      type: String,
      required: true,
    },
    user: {                                 //Note should have a user that created it.
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,                       //We also require timestamps to see when the note was created or when it was updated.
  }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;


//Models basically contains what structure a note will carry, ex: title, category etc.
const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");


// Function to get/fetch Notes

const getNotes = asyncHandler(async (req, res) => {              //Function to find notes on the basis of particular user
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
});

// Function to Create Notes
const createNote =asyncHandler(async (req, res) => {            //Function to Create Notes
    const { title, content, category } = req.body;

    if(!title || !content || !category){                        //Error in case user does'nt fill required fields.
        res.status(400);
        throw new Error("Please fill all the fields!");
    } else {
        const note = new Note({ user: req.user._id, title, content, category });    // Creating new note from the "Notes" model.

        const createdNote = await note.save();

        res.status(201).json(createdNote);
    }

})

// Function to fetch note by ID
const getNoteByID = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);                        //Finding note by ID. ( Database Query line )

    //If note exists
    if(note) {                                  
        res.json(note);        // Send it in json format
    } else {
        res.status(400).json({ message: "Note not found" });          // If not, display error message
    }
 
})

// Function to update note
const UpdateNote = asyncHandler(async (req,res) => {
    const { title, content, category } = req.body;
    const note = await Note.findById(req.params.id);                // Fetching note by ID.

    if(req.user._id){
        if(note.user.toString() !== req.user._id.toString()){           // Verifying if the user ID of the note matches with the logged in user ID.
            res.status(401);
            throw new Error("You can't perform this action");
        }
        if(note){   
            note.title = title;                                        // Updating the Note
            note.content = content;
            note.category = category;
            
            const updatedNote = await note.save();                     // Saving the updated Note   
            res.json(updatedNote);
        } else {
            res.status(404);
            throw new Error("Note not Found");                         // Throwing Error
        }
    }
});


// Function to Delete Notes
const DeleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);                 //Fetching Notes using ID

    if(note.user.toString() !== req.user._id.toString()){           // Verifying if the user ID of the note matches with the logged in user ID.
        res.status(401);
        throw new Error("You can't perform this action");
    }
    if(note){
        await note.remove();                                        // Removing the note from the Database
        res.json({ message: "Note Removed" });
    } else {
        res.status(404);
        throw new Error("Note not Found"); 
    }
})


module.exports = { getNotes, createNote, getNoteByID, UpdateNote, DeleteNote };           // Exporting all functions
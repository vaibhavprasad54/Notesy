//Importing Express and Router
const express = require('express');
const { getNotes, createNote, getNoteByID, UpdateNote, DeleteNote } = require('../controllers/noteControllers');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Creating an API Endpoint to get Notes
router.route('/').get( protect, getNotes );                     // Creating API to Fetch Notes

router.route('/create').post(protect, createNote );             // Protect is used to protect the route so that only an authorized user can access it.  

router.route('/:id').get(protect, getNoteByID);                     // Creating API to get Note by ID.

router.route('/:id').get(protect, getNoteByID).put(protect, UpdateNote).delete(protect, DeleteNote);

module.exports = router;

        // "protect" middleware has been removed from update and delete API's ( line 13 and 15 ) for now because it was giving 401 Unauthorized error!




// To make a new route we:
// 1 - Create Model ( Schema ) which contains structure of the notes
// 2 - Create a controller which contains async function to fetch the notes
// 3 - Create a route and use the newly made controller in the route's argument. ( You've successfully created your API ).
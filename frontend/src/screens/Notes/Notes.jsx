import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from 'react-redux';
// import notes from '../../data/notes'
// import axios from "axios";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from 'react-router-dom';
import "./Notes.css";

const Notes = ({ search }) => {

  const dispatch = useDispatch();

  const notesList = useSelector(state => state.notesList);
  const { loading, notes, error } = notesList;

  const userLogin = useSelector((state) => state.userLogin);
  debugger;
  const { userInfo } = userLogin;
  console.log(userInfo);

  console.log(notes);                   // Checking the notes variable from useState

  let navigate = useNavigate();

  const notesCreate = useSelector((state) => state.notesCreate);
  const { success: successCreate } = notesCreate;

  const notesUpdate = useSelector((state) => state.notesUpdate);
  const { success: successUpdate } = notesUpdate;                       // Doing this to update our notes page as well after updating a note.

  const notesDelete = useSelector((state) => state.notesDelete);
  const { loading: loadingDelete , error: errorDelete , success: successDelete } = notesDelete;


  //This is used to fire the function every time the screen renders
  useEffect(() => {
    dispatch(listNotes());
    if(!userInfo){
      navigate("/");                // Redirecting the user to Landing page if the user has logged out!
    }
  }, [dispatch, navigate, userInfo, successCreate, successUpdate, successDelete]);

  // Deleting a Note
  const deleteNote = (id) => {
    if(window.confirm("Are you sure?")){
      dispatch(deleteNoteAction(id));
    }
  }


  return (
    <>
      <MainScreen title={`Welcome back ${userInfo && userInfo.name} `}>
        <Link to="createnote">
          <button className="rounded-lg bg-purple-600 py-2 px-4 text-white my-5 hover:bg-purple-700">
            {" "}
            Create New Note{" "}
          </button>
        </Link>
        <div className="notes-section flex flex-wrap">
          {errorDelete && <ErrorMessage> {error} </ErrorMessage> }
          { loadingDelete && <Loading /> }
          { error && <ErrorMessage> {error} </ErrorMessage> }
          { loading && <Loading /> }
        {
          notes?.reverse().filter((filteredNote) => filteredNote.title.toLowerCase().includes(search.toLowerCase())).map((note) => (
            <div className="max-w-sm rounded m-5 p-2 overflow-hidden w-96 shadow-md bg-slate-200" key={note._id}>
              <div className="px-6 py-4 h-48 overflow-y-auto "> 
                    <p className=" text-white max-w-max px-2 py-1 rounded text-sm mb-2" style={{backgroundColor: "#04153f"}} >{note.category}</p>
                    <div className="font-bold text-xl mb-2"> {note.title} </div>
                    <p className="text-gray-700 text-base h-16">
                        {note.content}
                    </p>
              </div>
              <div className="px-6 pt-4 pb-2 flex items-center justify-between actionContainer ">
                <div className="actionBtn">
                  <Link to={`/note/${note._id}`}>
                      <button className="rounded-md text-sm bg-[#a2ccff] py-2 px-3 mr-2 hover:bg-[#79aeed]"> Edit <FontAwesomeIcon icon={faPen} size="sm" className="pl-1" /> </button>
                  </Link>
                  <Link>
                      <button onClick={() => deleteNote(note._id)} className="rounded-md text-sm text-white bg-[#163485] py-2 px-3 mr-2 hover:bg-[#0b256b]" style={{backgroundColor: "#920909"}}> Delete <FontAwesomeIcon icon={faTrashCan} size="sm" className="pl-1" /> </button>
                  </Link>
                </div>
                <div className="date">
                   {note.createdAt.substring(0, 10)}            
                </div>
              </div>
            </div>
          ))
        }
        </div>
      </MainScreen>
    </>
  );
};

export default Notes;

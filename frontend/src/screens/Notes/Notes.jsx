import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import React from "react";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import notes from '../../data/notes'

const Notes = () => {

  // Deleting a Note
  const deleteNote = (id) => {
    if(window.confirm("Are you sure?")){

    }
  }

  return (
    <>
      <MainScreen title="Welcome back Vaibhav">
        <Link to="createnote">
          <button className="rounded-lg bg-purple-600 py-2 px-4 text-white my-5 hover:bg-purple-700">
            {" "}
            Create New Note{" "}
          </button>
        </Link>
        <div className="notes-section flex flex-wrap">
        {
          notes?.map((note) => (
            <div className="max-w-sm rounded m-5 p-2 overflow-hidden shadow-md bg-slate-200">
              <div className="px-6 py-4"> 
                    <p className="bg-green-700 text-white w-min px-2 py-1 rounded text-sm mb-2">{note.category}</p>
                    <div className="font-bold text-xl mb-2"> {note.title} </div>
                    <p className="text-gray-700 text-base h-16">
                        {note.content}
                    </p>
              </div>
              <div className="px-6 pt-4 pb-2 flex items-center justify-between">
                <div className="actionBtn">
                  <Link to={`/note/${note._id}`}>
                      <button className="rounded-md text-sm bg-[#a2ccff] py-2 px-3 mr-2 hover:bg-[#79aeed]"> Edit <FontAwesomeIcon icon={faPen} size="sm" className="pl-1" /> </button>
                  </Link>
                  <Link>
                      <button onClick={() => deleteNote(note._id)} className="rounded-md text-sm text-white bg-[#163485] py-2 px-3 mr-2 hover:bg-[#0b256b]"> Delete <FontAwesomeIcon icon={faTrashCan} size="sm" className="pl-1" /> </button>
                  </Link>
                </div>
                <div className="date">
                  2nd June 2022
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

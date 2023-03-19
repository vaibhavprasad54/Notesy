import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { deleteNoteAction, updateNoteAction } from '../../actions/notesActions';
import { useParams } from 'react-router-dom';

const UpdateNote = () => {

  let navigate = useNavigate();

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [category, setCategory] = useState();
    const [date, setDate] = useState("");

    const dispatch = useDispatch();
    const { id } = useParams();                           // Fetching id from useParams hook byu desctructuring method.
    console.log(id);

    const notesUpdate = useSelector((state) => state.notesUpdate);
    const { loading, error } = notesUpdate;

    const notesDelete = useSelector((state) => state.notesDelete);
    const { loading: loadingDelete, error: errorDelete } = notesDelete;

    const deleteHandler = (id) => {
      if(window.confirm("Are you sure?")){
        dispatch(deleteNoteAction(id));
      }
      navigate("/notes");                           // Deletes the note and redirects to notes page!
    };


    
    const userInfo = localStorage.getItem('userInfo');  

    useEffect(() => {
        const fetching = async () => {

          const config = {
            headers: {
                 Authorization: `Bearer ${userInfo.token}`,       
            },
          };

          const { data } = await axios.get(`/api/notes/${id}`, config);        // Fetching data( Title, Content etc. ) of a specific note using ID
          console.log(data);

          setTitle(data.title);                 // Fetching title, content etc. from the backend the moment the page is loaded.
          setContent(data.content);
          setCategory(data.category);
          setDate(data.updatedAt);
        };
    
        fetching();
      }, [id, date, userInfo]);            // useEffect is going to fire off whenever these depencies in the array change!
    


    const resetFields = () => {
        setTitle("");
        setCategory("");
        setContent("");
      };
    
      const updateHandler = (e) => {
        e.preventDefault();
        dispatch(updateNoteAction(id, title, content, category));
        if (!title || !content || !category) return;
    
        resetFields();
        navigate("/notes");
        
      };


  return (
    <>
    <MainScreen title="Update Note" > <svg className="w-8 mt-3 " fill="#CF9FFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
      <div className="formContainer -z-50 flex max-w-full justify-center items-center min-h-full " style={{height: '65vh', paddingTop: '0', paddingBottom: '0'}}>
      <form className="w-2/4" onSubmit={updateHandler} >
        {loadingDelete && <Loading />}
        {errorDelete && <ErrorMessage> {error} </ErrorMessage> }
        {error && <ErrorMessage> {error} </ErrorMessage>}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Notes Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-6">
           <label htmlFor="message" className="block mb-2 text-lg font-medium text-gray-900">Content</label>
           <textarea id="message" value={content} onChange={(e) => setContent(e.target.value)} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Add note..."></textarea>
        </div>
          
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter Category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
       
        <div className="bottomSection flex items-center justify-between">
        <div className="actionButtons flex items-center justify-start">
        {loading && <Loading /> }
        <button
          type="submit"
          className="text-white mr-3 flex items-center justify-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-base w-full sm:w-auto px-5 py-2 text-center"
        >
          <p>Update</p> 
          <svg className="w-3 ml-2 " fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z"/></svg>
        </button>
        <button
          type="submit"
          onClick={() => deleteHandler(id)}
          style={{backgroundColor: "#920909"}}
          className="text-white flex items-center justify-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-base w-full sm:w-auto px-5 py-2 text-center"
        >
          <p>Delete</p> 
          <svg className='w-3 ml-2' fill='#fff' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
        </button>
        </div>

        {/* <div className="creationDate">
          <p className="text-gray-500"> {date.substring(0, 10)} </p>
        </div> */}
        </div>

      </form>
      </div>
    </MainScreen>
    </>
  )
}

export default UpdateNote
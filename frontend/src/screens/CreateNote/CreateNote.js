import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";
import { useNavigate } from 'react-router-dom';


const CreateNote = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const notesCreate = useSelector((state) => state.notesCreate);
  const { loading, error, note } = notesCreate;

  console.log(note);

  const resetFields = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if(!title || !content || !category) return;

    dispatch(createNoteAction(title, content, category));             // Using Redux to create Note by sending title, content and category to backend
    resetFields();
    navigate("/notes");                                               // Redirecting to notes page
  }

  return (
    <>
    <MainScreen title="Create Note" > <svg className="w-8 mt-3 " fill="#CF9FFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
      <div className="formContainer -z-50 flex max-w-full justify-center items-center min-h-full " style={{height: '65vh', paddingTop: '0', paddingBottom: '0'}}>
      <form className="w-2/4" onSubmit={submitHandler} >
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
       {loading && <Loading /> }
        <div className="bottomSection flex items-center justify-between">
        <div className="actionButtons flex items-center justify-start">
        <button
          type="submit"
          className="text-white mr-3 flex items-center justify-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-base w-full sm:w-auto px-5 py-2 text-center"
        >
          <p>Create</p> 
          <svg className="w-3 ml-2 " fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z"/></svg>
        </button>
        <button
          type="submit"
          onClick={resetFields}
          className="text-white flex items-center justify-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-base w-full sm:w-auto px-5 py-2 text-center"
        >
          <p>Reset</p> 
          <svg className="w-3 ml-2 " fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M32.5 224H24c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L82.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L169 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H32.5z"/></svg>
        </button>
        </div>

        <div className="creationDate">
          <p className="text-gray-500"> {new Date().toLocaleDateString()} </p>
        </div>
        </div>

      </form>
      </div>
    </MainScreen>
    </>
  );
};

export default CreateNote;

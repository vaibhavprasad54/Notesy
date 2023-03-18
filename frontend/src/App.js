import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './screens/Landing Page/LandingPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Notes from './screens/Notes/Notes';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import CreateNote from './screens/CreateNote/CreateNote';
import UpdateNote from './screens/UpdateNote/UpdateNote';
import React, { useState } from 'react';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

const App = () => {

  const [search, setSearch] = useState("");

  return (
    <Router>
    <Header setSearch={setSearch} />
    <div className='main'>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/notes/createnote" element={<CreateNote />} />
        <Route path="/note/:id" element={<UpdateNote />} />
        <Route path="/notes" element={ <Notes search={search} />} />
        <Route path="/footer" element={ <Footer />} />
      </Routes>
    </div>

    <Footer />
    </Router>
  );
}
   

export default App;

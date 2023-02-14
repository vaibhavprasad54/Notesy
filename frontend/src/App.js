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

const App = () => 
   (
    <Router>
    <Header />
    <div className='main'>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/notes" element={ <Notes />} />
      </Routes>
    </div>

    <Footer />
    </Router>
  );

export default App;

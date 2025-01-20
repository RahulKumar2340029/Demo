import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import EditPage from './pages/EditPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Compose from './pages/Compose';
import Posts from './pages/Posts';
import ReadMore from './pages/ReadMore';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Define your routes here */}
        <Route path='/' element={<Home />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditPage />} />
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/compose" element={<Compose />}/>
        <Route path="/myposts" element={<Posts />} />
        <Route path="/read-more/:postId" element={<ReadMore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

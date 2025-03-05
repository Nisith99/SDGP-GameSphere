import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Landing from './pages/Landing/Landing';
import Message from './pages/Message/Message';
import Notification from './Components/Notifications'
import Home from "./pages/Home/Home";
import { Profile } from './pages/Profile/Profile';
import PlayerProfile from "./pages/Profile/PlayerProfile";


function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path = '/' element = {<Signup/>}></Route>
    <Route path='/login' element = {<Login/>}></Route>
    <Route path='/landing' element = {<Landing/>}/>
    <Route path = '/Notification' element = {<Notification/>}></Route>
    <Route path='/message' element={<Message/>}> </Route>
    <Route path="/home" element= {<Home/>}></Route>
    <Route path="/profile" element={<Profile />}></Route>
    <Route path="/playerProfile" element={<PlayerProfile />}></Route>
   </Routes>
   </BrowserRouter>
  )

}

export default App;


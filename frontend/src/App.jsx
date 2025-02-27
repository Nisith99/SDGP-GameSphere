


import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Notification from './components/Notifications'


function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path = '/' element = {<Signup/>}></Route>
    <Route path='/login' element = {<Login/>}></Route>
    <Route path='/landing' element = {<Landing/>}/>
    <Route path = '/Notification' element = {<Notification/>}></Route>
   </Routes>
   </BrowserRouter>
  )

}

export default App;
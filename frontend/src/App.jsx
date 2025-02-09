import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'


function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path = '/' element = {<Signup/>}></Route>
    <Route path='/login' element = {<Login/>}></Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App

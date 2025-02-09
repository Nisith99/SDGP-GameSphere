import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup/Signup'


function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path = '/' element = {<Signup/>}></Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App

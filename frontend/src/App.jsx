import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Message from './pages/Message/Message';

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/message' element={<Message/>}> </Route>
    </Routes>
    </BrowserRouter>
  )
 
}

export default App;
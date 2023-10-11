import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Chatpage from './pages/Chatpage';

function App() {

  return (
    <div className="app" >
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/chatpage' element={<Chatpage/>}/>
        </Routes>
      </BrowserRouter>
   
    </div>
  )
}

export default App

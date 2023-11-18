import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatProvider from "./Context/ChatProvider";
function App() {
  return (
    <div className="app">
      
        <ToastContainer
          position="top-right"
          autoClose={500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
       
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/chatpage" element={<Chatpage />} />
          </Routes>
     
    </div>
  );
}

export default App;

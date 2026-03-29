
import { useContext, useState } from "react"
import MediaContext from "./context/MediaContext"
import Navbar from "./components/Navbar.js"
import { FiUpload } from "react-icons/fi";
import WorkFlowImage from "./components/WorkflowImage.js"
import WorkflowText from "./components/WorkflowText"
import { ToastContainer, toast } from 'react-toastify';
import './App.css';




function App() {

  const { activeTabId } = useContext(MediaContext)






  return (
    <div className="bg-gray-100 min-h-screen">
      <ToastContainer />
      <Navbar />
      <div className="px-4 py-5 sm:flex justify-center items-center">

        {
          activeTabId === "CREATIVE_STUDIO" ? <WorkflowText /> : <WorkFlowImage />
        }

      </div>
    </div>
  );
}

export default App;



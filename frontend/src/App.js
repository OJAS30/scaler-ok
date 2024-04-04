import React, { useState } from "react";
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Allstudents from "./components/Allstudents";
import Assignedstudents from "./components/Assignedstudents";

export const MentorDetails =React.createContext();
function App(){
  const [mentorData, setMentorData] = useState({
    "mentorid":"",
    "ismentorSet":false
  })
  const handleChange = (field, value) =>{
    setMentorData({...mentorData, [field]:value})
  }
  return(
    <Router>
      <MentorDetails.Provider value={{mentorData, handleChange}}>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Allstudents/>}/>
          <Route path="/assignedstudents" element={<Assignedstudents/>}/>
        </Routes>
      </div>
      </MentorDetails.Provider>
    </Router>
  );
}

export default App;
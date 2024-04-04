import React, { useState, useEffect, useContext } from "react";
import "../css/allStudents.css"; // Import your CSS file
import { MentorDetails } from "../App";

function AllStudents() {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState([]);
  const { mentorData } = useContext(MentorDetails);
  const [selectedOption, setSelectedOption] = useState("unassigned");

  // Fetch data from your backend API when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://scalar-backend.onrender.com/student"); // Replace with your backend API route
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleChecklistClick = (student) => {
    if (!student.mentorName) {
      const isSelected = selected.includes(student._id);
      if (isSelected) {
        setSelected(selected.filter((id) => id !== student._id));
      } else {
        if (selected.length < 4) {
          setSelected([...selected, student._id]);
        }
      }
    }
  };

  const handleAddMentor = async () => {
    const res = await fetch("https://scalar-backend.onrender.com/student/assignStudent", {
      method: "POST",
      mode: "cors",
      headers: new Headers({ "Content-type": "application/json" }),
      body: JSON.stringify({
        studentArr: selected,
        mentorName: mentorData.mentorid,
      }),
    });
    if (res.status === 200) {
      const updatedStudents = students.map((student) => {
        if (selected.includes(student._id)) {
          return { ...student, mentorName: mentorData.mentorid };
        }
        return student;
      });
      setStudents(updatedStudents);
    }
  };

  return (
    <div className="all-students-container">
      <h2>Welcome to the Mentor's Dashboard</h2>

      <select
        id="assignmentStatus"
        name="assignmentStatus"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="assigned">Assigned</option>
        <option value="unassigned">Unassigned</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mentor Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students
            .filter((student) => {
              if (selectedOption === "unassigned") {
                return !student.mentorName; // Filter students with no mentorName
              }
              return selectedOption === "assigned" && student.mentorName;
            })
            .map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.mentorName || (selected.includes(student._id) ? mentorData.mentorid : "")}</td>
                <td>
                  <button
                    disabled={student.mentorName === ""}
                    onClick={() => handleChecklistClick(student)}
                  >
                    {selected.includes(student._id) || student.mentorName ? "Selected" : "Select"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {selected.length > 0 && (
        <button className="add-mentor-btn" onClick={handleAddMentor}>Add Mentor</button>
      )}
    </div>
  );
}

export default AllStudents;

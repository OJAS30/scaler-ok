import React, { useContext, useEffect, useState } from "react";
import { MentorDetails } from "../App";

function Assignedstudents() {
  const [students, setStudents] = useState([]);
  const { mentorData } = useContext(MentorDetails);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://scalar-backend.onrender.com/student/mentor/${mentorData.mentorid}`
        );
        if (response.status === 200) {
          const data = await response.json();
          setStudents(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [mentorData]);

  const [editableStudent, setEditableStudent] = useState({});

  const onEdit = (student) => {
    setEditableStudent(student);
  };

  const handleUpdateMarks = (e) => {
      let clampedValue = e.target.value;
      if (clampedValue !== '') {
        clampedValue = Math.min(10, Math.max(0, parseInt(e.target.value)));
      }
  
      const updatedStudent = {
        ...editableStudent,
        [e.target.name]: clampedValue,
      };
      setEditableStudent(updatedStudent);
  }
  const onSave = async () => {
    if (editableStudent._id !== null) {
      try {
        console.log("editableStudent", editableStudent);
        const response = await fetch(
          `https://scalar-backend.onrender.com/student/${editableStudent._id}`,
          {
            method: "PUT", // Use PUT method to update the data
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editableStudent),
          }
        );

        if (response.status === 200) {
          const updatedStudents = students.map((student) =>
            student._id === editableStudent._id ? editableStudent : student
          );

          setStudents(updatedStudents);

          setEditableStudent({}); 
        } else {
          console.error("Failed to save data:", response);
        }
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }
  };

  return (
    <div>
      <h2>Your Students</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Ideation Marks</th>
            <th>Execution Marks</th>
            <th>Pitch Marks</th>
            <th>Total Marks</th>
            <th>Is Locked?</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const totalMarks =
              parseInt(student.ideationMarks) +
              parseInt(student.executionMarks) +
              parseInt(student.pitchMarks);

            return (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  {editableStudent._id === student._id ? (
                    <input
                    type="number"
                    name="ideationMarks"
                    value={editableStudent.ideationMarks}
                    min={0}
                    max={10}
                    onChange={handleUpdateMarks}
                  />
                  ) : (
                    student.ideationMarks
                  )}
                </td>
                <td>
                  {editableStudent._id === student._id ? (
                    <input
                      type="number"
                      name="executionMarks"
                      min={0}
                      max={10}
                      value={editableStudent.executionMarks}
                      onChange={handleUpdateMarks}
                    />
                  ) : (
                    student.executionMarks
                  )}
                </td>
                <td>
                  {editableStudent._id === student._id ? (
                    <input
                      type="number"
                      name="pitchMarks"
                      value={editableStudent.pitchMarks}
                      min={0}
                      max={10}
                      onChange={handleUpdateMarks}
                    />
                  ) : (
                    student.pitchMarks
                  )}
                </td>
                <td>{totalMarks}</td>
                <td>
                  {editableStudent._id === student._id ? (
                    <select
                    // value={editableStudent.isLocked} 
                    onChange={(e) => {
                      const updatedStudent = {
                        ...editableStudent,
                        isLocked: e.target.value === "lock" ? true : false,
                      };
                      setEditableStudent(updatedStudent);
                    }}
                  >
                    <option value="not locked">Not Locked</option>
                    <option value="lock">Lock</option>
                  </select>
                  ) : (
                    student.isLocked? "Locked":"Not Locked"
                  )}
                </td>
                <td>
                  {editableStudent._id === student._id ? (
                    <button onClick={onSave}>Save</button>
                  ) : (
                    <button 
                    onClick={() => onEdit(student)} 
                    disabled={student.isLocked?"disable":""}>{student.isLocked?"Can't Edit":"Edit"}</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Assignedstudents;

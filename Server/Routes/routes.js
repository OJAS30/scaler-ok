const express=require('express');
const mongoose=require('mongoose');
const router= express.Router();
const Student=require('../Model/studentSchema');
const { sendMail, defaultMailOptions } = require('../nodemailerSetup');


router.get('/',async(req,res)=>{
    try{
        const users=await Student.find();
        res.json(users);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.get('/:id',async(req,res)=>{
    try{
        const newStudent=await Student.findById(req.params.id);
        if(!newStudent){
            res.status(500).json("Student not found");
        }
        res.status(200).json(newStudent);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

router.get('/mentor/:mentorName', async (req, res) => {
    try {
      const mentorName = req.params.mentorName;
      const students = await Student.find({ mentorName });
  
      if (students.length === 0) {
        return res.status(500).json("No students found for this mentor.");
      }
  
      res.status(200).json(students);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

router.post('/',async(req,res)=>{
    try{
        const newStudent = new Student(req.body);
        const saveStudent=await newStudent.save();
        res.status(200).json(saveStudent); 
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.put('/:id',async(req,res)=>{
    try{
        const newUser=await Student.findByIdAndUpdate(req.params.id,req.body);
        if(!newUser){
            return res.status(500).json({error:"Student not found"});
        }
        console.log(req.body)
        if(req.body.isLocked===true){
            const customMailOptions = {
                ...defaultMailOptions,
                to: req.body.email,
              };
              
              sendMail(customMailOptions).catch(console.error);
        }
        res.status(200).json(newUser);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const newUser=await Student.findByIdAndDelete(req.params.id);
        if(!newUser){
            return res.status(500).json({error: "Student not found"});
        }
        res.json("Student deleted");
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

router.post('/assignStudent',async(req,res)=>{
    try {
        const { studentArr, mentorName } = req.body;
        console.log(req.body)
        // Update the mentorName for each student in studentArr
        for (const studentId of studentArr) {
          await Student.findByIdAndUpdate(studentId, { mentorName });
        }
    
        res.status(200).json({ message: 'Mentor assigned successfully' });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while assigning a mentor' });
      }
});
module.exports=router;
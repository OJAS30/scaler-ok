const mongoose=require('mongoose');

const studentData=new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    ideationMarks: {
        type: Number,
        min: 0,
        max: 10,
    },
    executionMarks: {
        type: Number,
        min: 0,
        max: 10,
    },
    pitchMarks: {
        type: Number,
        min: 0,
        max: 10,
    },
    mentorName:{
        type: String,
    },
    mentorId: {
        type: String,
    },
    isLocked:{
        type:Boolean,
        default:false,
    }
});

const Student=mongoose.model("Student",studentData);
module.exports=Student;
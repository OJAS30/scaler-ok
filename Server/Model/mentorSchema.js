const mongoose=require('mongoose');

const mentorSchema=new mongoose.Schema({
    email: {
        type: String,
        require:true
    },
    
})
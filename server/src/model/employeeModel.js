const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        trim: true,
    },
    LastName: {
        type: String,
        trim: true,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    Age: {
        type: Number,
        required: true,
        trim: true
    },
    Address: {
        type: String,
        required: true,
        trim: true
    },  
}, { timestamps: true })
module.exports = mongoose.model('Employee', employeeSchema);
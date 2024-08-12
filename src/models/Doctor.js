// models/Doctor.js

const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    specialty: {
        type: String,
        required: true,
    },
    availableHours: {
        type: [String], // ['09:00-12:00', '14:00-18:00']
        required: true,
    },
});

module.exports = mongoose.model('Doctor', DoctorSchema);
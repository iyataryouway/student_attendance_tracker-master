const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
    date:{
        type: Date,
        required: true,
    },
    status:{
        type: String,
        enum: ['present', 'absent'],
        required: true,
    }
});

const studentRecordSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    attendance:{
        type: [attendanceSchema],
        default: [],
    }
});

const StudentRecord = mongoose.model('StudentRecord', studentRecordSchema);

module.exports = StudentRecord;
const StudentRecord = require('../models/studentRecord.js');
const AttendanceManager = require('../models/attendanceManager.js');

exports.getHome = async (req, res) =>{
    try {
        const students = await StudentRecord.find({});

        const maxAttendanceCount = students ? students.length : 0;

        console.log(maxAttendanceCount);

        res.render('attendance.ejs', {students, maxAttendanceCount});

    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }

}
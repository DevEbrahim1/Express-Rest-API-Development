const StudentsModel = require('../models/StudentsModel');

exports.InsertStudents = async (req, res) => {
    try {
        let reqBody = req.body;

        // Async/await ব্যবহার করে ডেটা তৈরি করা হচ্ছে
        let data = await StudentsModel.create(reqBody);
        res.status(201).json({ status: "success", data: data });

    } catch (error) {
        res.status(400).json({ status: "fail", data: error });
    }
};


//Data Creation
const { Query } = require('mongoose');
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

//Data Read
exports.ReadStudents = async (req, res) => {
    try {
        let Query = {};
        let Projection = "Name Roll Class Remarks"; 

        // Async/await দিয়ে ডেটা রিড করা
        let data = await StudentsModel.find(Query).select(Projection).exec();
        res.status(200).json({ status: "success", data: data });

    } catch (error) {
        res.status(400).json({ status: "fail", data: error });
    }
};
//DataUpdate
exports.UpdateStudents = async (req, res) => {
    try {
        let id = req.params.id.trim();  // ID থেকে অপ্রয়োজনীয় স্পেস বা অপ্রত্যাশিত চিহ্ন সরানোর জন্য trim() ব্যবহার করুন
        let Query = { _id: id };
        let reqBody = req.body;

        // Async/await দিয়ে ডেটা আপডেট করা
        let data = await StudentsModel.updateOne(Query, reqBody).exec();

        if (data.nModified === 0) {
            res.status(404).json({ status: "fail", message: "Student not found or data is same." });
        } else {
            res.status(202).json({ status: "Accepted", data: data });
        }

    } catch (error) {
        res.status(400).json({ status: "fail", data: error });
    }
};
//Data Delate
exports.DeleteStudents = async (req, res) => {
    try {
        let id = req.params.id.trim();  // ID থেকে অপ্রয়োজনীয় স্পেস বা অপ্রত্যাশিত চিহ্ন সরানোর জন্য trim() ব্যবহার করুন
        let Query = { _id: id };

        // Async/await দিয়ে ডেটা ডিলিট করা
        let data = await StudentsModel.deleteOne(Query).exec();

        if (data.deletedCount === 0) {
            res.status(404).json({ status: "fail", message: "Student not found." });
        } else {
            res.status(200).json({ status: "success", message: "Student deleted successfully." });
        }

    } catch (error) {
        res.status(400).json({ status: "fail", data: error });
    }
};



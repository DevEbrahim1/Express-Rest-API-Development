const ToDoListModel = require('../models/ToDoListModel');

// User Registration
exports.CreateToDo = async (req, res) => {
    try {
        // Request থেকে ডেটা রিড করা হচ্ছে
        let reqBody = req.body;
        let UserName = req.headers['username'];  // প্রথমে UserName ডিফাইন করা হচ্ছে
        if (!UserName) {
            return res.status(401).json({ status: "Unauthorized", message: "UserName not found in headers" });
        }
        
        let TodoSubject = reqBody['TodoSubject'];
        let TodoDescription = reqBody['TodoDescription'];
        let TodoStatus = "New";
        let TodoCreateDate = Date.now();
        let TodoUpdateDate = Date.now();

        // PostBody তৈরির সময় UserName ব্যবহার করা হচ্ছে
        let PostBody = {
            UserName: UserName,
            TodoSubject: TodoSubject,
            TodoDescription: TodoDescription,
            TodoStatus: TodoStatus,
            TodoCreateDate: TodoCreateDate,
            TodoUpdateDate: TodoUpdateDate
        };

        // MongoDB তে ডেটা সংরক্ষণ করা হচ্ছে
        let data = await ToDoListModel.create(PostBody);
        res.status(200).json({ status: "success", data: data });
    } catch (err) {
        res.status(400).json({ status: "Fail", data: err.message });
    }
};
//read

// ToDo Read
exports.SelectToDo = async (req, res) => {
    try {
        let UserName = req.headers['username'];
        
        if (!UserName) {
            return res.status(401).json({ status: "Unauthorized", message: "UserName not found in headers" });
        }

        // MongoDB থেকে নির্দিষ্ট UserName এর সব ToDo আইটেম রিড করা
        let data = await ToDoListModel.find({ UserName: UserName });

        res.status(200).json({ status: "success", data: data });
    } catch (err) {
        res.status(400).json({ status: "Fail", data: err.message });
    }
};

// ToDo Update

const mongoose = require('mongoose'); // mongoose ইনপোর্ট করা

exports.UpdateToDo = async (req, res) => {
    try {
        const { TodoSubject, TodoDescription, _id } = req.body;
        const TodoUpdateDate = Date.now();

        // Check if the provided _id is valid
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ status: "fail", message: "Invalid ID format" });
        }

        // Prepare update data
        const PostBody = {
            TodoSubject:TodoSubject,
            TodoDescription:TodoDescription,
            TodoUpdateDate:TodoUpdateDate,
        }

        // Update the ToDo item in MongoDB
        const data = await ToDoListModel.updateOne(
            { _id: _id },      // Condition to find the specific document
            { $set: PostBody }, // Update the provided fields
            { upsert: true }   // Do not insert new document if not found
        );

        // Check if any document was matched
        if (data.matchedCount === 0) {
            return res.status(404).json({ status: "fail", message: "ToDo item not found" });
        }

        // Success response
        res.status(200).json({ status: "success", data });
    } catch (error) {
        // Handle errors
        res.status(500).json({ status: "fail", message: error.message });
    }
};



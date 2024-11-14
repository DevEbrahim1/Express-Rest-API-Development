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

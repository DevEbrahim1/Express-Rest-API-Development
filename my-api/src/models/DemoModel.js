const mongoose = require('mongoose');

// সঠিকভাবে Schema তৈরি করা হচ্ছে
const DataSchema = mongoose.Schema({
    Name: { type: String, required: true },
    Roll: { type: Number, required: true },
    Class: { type: String, required: true },
    Remarks: { type: String },
    Adult: { type: Boolean },
    Comment: { type: [String] },   // Array টাইপের Comment এর জন্য
    details: { type: Object },     // Object টাইপের details এর জন্য
    DateOfBirth: { type: Date }    // "DateOfBirth" - স্পেস ছাড়া নামে পরিবর্তন করা হয়েছে
});

module.exports = mongoose.model('student', DataSchema);

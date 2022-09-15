const { Schema, model } = require("mongoose");

const jobSchema = new Schema({
    jobTitle: { type: String, required: true },
    employerName: { type: String, required: true },
    locationName: { type: String, required: true },
    salaryType: { type: String, required: true },
    minimunSalary: { type: String, required: true },
    maximunSalary: { type: String, required: true },
    currency: { type: String, enum: ['EUR', 'USD', 'GBP'], required: true },
    fullTime: { type: Boolean, default: false },
    partTime: { type: Boolean, default: false },
    contractType: { type: String, required: true },
    jobDescription: { type: String, required: true },
    jobUrl: { type: String, required: true },
},
    {
        timestamps: true,
        versionKey: false
    });


const JobModel = model("Job", jobSchema);

module.exports = JobModel;

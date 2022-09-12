const { Schema, model } = require("mongoose");

const jobSchema = new Schema({
    jobTitle: { type: String, required: true },
    employedName: { type: Schema.Types.ObjectId, ref: 'User' },
    locationName: { type: String, required: true },
    salryType: { type: String, required: true },
    minimunSalary: { type: String, required: true },
    maximunSalary: { type: String, required: true },
    currency: { type: String, enum: ['EUR', 'USD', 'GBP'], required: true },
    fullTime: { type: Boolean, required: true, default: false },
    partTime: { type: Boolean, required: true, default: false },
    contractType: { type: String, required: true },
    jobDescription: { type: String, required: true },
    jobUrl: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false
});


const JobModel = model("Job", jobSchema);

module.exports = JobModel;

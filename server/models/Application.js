const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    company: { type: String, required: true },
    position: { type: String, required: true },
    status: {
        type: String,
        enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
        default: 'Applied',
    },
    appliedDate: { type: String, required: true },
    notes: String
}, { timestamps: true })

module.exports = mongoose.model('Application', applicationSchema);